import Papa from "papaparse";

export type ImportedTransaction = {
  date: string;
  amount: number;
  currency: string;
  counterparty: string | null;
  description: string | null;
  externalId: string | null;
};

export type KbParseResult = {
  transactions: ImportedTransaction[];
  errors: string[];
};

type KbCsvRow = Record<string, string>;

const transactionHeader = "Datum zauctovani;Datum provedeni;";

function getValue(row: KbCsvRow, field: string) {
  return row[field]?.trim() || null;
}

function parseKbDate(value: string | null) {
  if (!value || !/^\d{2}\.\d{2}\.\d{4}$/.test(value)) {
    return null;
  }

  const [day, month, year] = value.split(".");

  return `${year}-${month}-${day}`;
}

function parseKbAmount(value: string | null) {
  if (!value) {
    return null;
  }

  const amount = Number(value.replace(/\s/g, "").replace(",", "."));

  return Number.isFinite(amount) ? amount : null;
}

export async function parseKbCsv(file: File): Promise<KbParseResult> {
  const fileBytes = await file.arrayBuffer();
  const content = new TextDecoder("windows-1250").decode(fileBytes);
  const lines = content.split(/\r?\n/);

  const headerIndex = lines.findIndex((line) =>
    line.startsWith(transactionHeader),
  );

  if (headerIndex === -1) {
    return {
      transactions: [],
      errors: ["V souboru se nepodařilo najít hlavičku transakcí KB."],
    };
  }

  const transactionCsv = lines.slice(headerIndex).join("\n");

  const result = Papa.parse<KbCsvRow>(transactionCsv, {
    header: true,
    delimiter: ";",
    skipEmptyLines: true,
  });

  const errors = result.errors.map(
    (error) => `Chyba v CSV: ${error.message}`,
  );

  const transactions: ImportedTransaction[] = [];

  result.data.forEach((row, index) => {
    const date = parseKbDate(getValue(row, "Datum zauctovani"));
    const amount = parseKbAmount(getValue(row, "Castka"));
    const currency = getValue(row, "Mena");

    if (!date || amount === null || !currency) {
      errors.push(`Transakce ${index + 1} nemá platné datum, částku nebo měnu.`);
      return;
    }

    transactions.push({
      date,
      amount,
      currency,
      counterparty:
        getValue(row, "Nazev protiuctu") || getValue(row, "Protistrana"),
      description:
        getValue(row, "Popis pro me") ||
        getValue(row, "Zprava pro prijemce"),
      externalId: getValue(row, "Identifikace transakce"),
    });
  });

  return { transactions, errors };
}