"use client"


type FileUploadProps = {
  onFileUpload: (file: File) => void;
};

export default function FileUpload({onFileUpload}: FileUploadProps) {
  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    onFileUpload(file);

  }

    return (
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    )
}
