import { createAdminClient } from "@/lib/supabase/admin";

type Transaction = {
  id: number;
  date: string;
  amount: number;
  currency: string;
  counterparty: string | null;
  description: string | null;
  category: { name: string } | null;
  project: { name: string } | null;
};

const dateFormat = new Intl.DateTimeFormat("cs-CZ");

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency,
  }).format(amount);
}

export default async function Home() {
  const supabase = createAdminClient();
  const { data: transactions, error } = await supabase
    .from("transactions")
    .select(
      "id, date, amount, currency, counterparty, description, category:categories(name), project:projects(name)",
    )
    .order("date", { ascending: false })
    .returns<Transaction[]>();

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 px-6 py-16 dark:bg-black">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Kapsa
        </h1>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          Přehled transakcí
        </p>

        {error && (
          <p className="mt-6 text-red-600 dark:text-red-400">
            Chyba při načítání transakcí: {error.message}
          </p>
        )}

        {!error && transactions?.length === 0 && (
          <p className="mt-6 text-zinc-500 dark:text-zinc-500">
            Zatím žádné transakce.
          </p>
        )}

        {!error && transactions && transactions.length > 0 && (
          <table className="mt-6 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                <th className="py-2 font-medium">Datum</th>
                <th className="py-2 font-medium">Protistrana</th>
                <th className="py-2 font-medium">Kategorie</th>
                <th className="py-2 font-medium">Projekt</th>
                <th className="py-2 text-right font-medium">Částka</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-zinc-100 dark:border-zinc-900"
                >
                  <td className="py-2 text-zinc-600 dark:text-zinc-400">
                    {dateFormat.format(new Date(transaction.date))}
                  </td>
                  <td className="py-2 text-zinc-900 dark:text-zinc-50">
                    {transaction.counterparty ?? transaction.description ?? "—"}
                  </td>
                  <td className="py-2 text-zinc-600 dark:text-zinc-400">
                    {transaction.category?.name ?? "—"}
                  </td>
                  <td className="py-2 text-zinc-600 dark:text-zinc-400">
                    {transaction.project?.name ?? "—"}
                  </td>
                  <td
                    className={`py-2 text-right tabular-nums ${
                      transaction.amount < 0
                        ? "text-red-600 dark:text-red-400"
                        : "text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    {formatAmount(transaction.amount, transaction.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
