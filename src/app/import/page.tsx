import ImportCsvPreview from "@/features/import/components/ImportCsvPreview";

export default function ImportPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16 dark:bg-black">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Import transakcí
        </h1>
        <p className="mt-2 max-w-xl text-zinc-600 dark:text-zinc-400">
          Vyberte výpis ve formátu CSV.
        </p>

        <ImportCsvPreview />

      </div>
    </main>
  );
}
