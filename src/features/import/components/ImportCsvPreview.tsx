"use client"
import {useState} from "react";
import {parseKbCsv, type ImportedTransaction} from "@/features/import/lib/KbParser";

import FileUpload from "@/features/import/components/FileUpload";


export default function ImportCsvPreview() {

  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [transactions, setTransactions] = useState<ImportedTransaction[]>([]);

  async function handleFileUpload(file: File) {
    setFile(file);

    const result = await parseKbCsv(file);

    setTransactions(result.transactions);
    setErrors(result.errors);
  }

  return (
    <div>
      <label className="group mt-8 flex min-h-64 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-zinc-300 bg-white px-6 py-10 text-center transition hover:border-zinc-500 hover:bg-zinc-100 focus-within:border-zinc-900 focus-within:ring-2 focus-within:ring-zinc-900 focus-within:ring-offset-4 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:border-zinc-500 dark:hover:bg-zinc-900 dark:focus-within:border-zinc-100 dark:focus-within:ring-zinc-100 dark:focus-within:ring-offset-black [&_input]:sr-only">
          <span className="mt-5 border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition group-hover:bg-zinc-700 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:group-hover:bg-zinc-300">
            Vybrat CSV soubor
          </span>
        <FileUpload onFileUpload={handleFileUpload} />
      </label>

      {file && (
        <div>
          <p className="mt-8">{file.name}</p>

          <pre>
            {JSON.stringify(transactions, null, 2)}
          </pre>

        </div>
      )}

      {errors.length > 0 && (
        <ul className="mt-4 list-disc pl-5 text-sm text-red-600 dark:text-red-400">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
