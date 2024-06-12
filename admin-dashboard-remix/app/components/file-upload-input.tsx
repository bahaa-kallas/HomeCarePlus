import React, { useRef } from "react";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function FileUploadInput({ onChange, imageUrl }: {
  imageUrl?: string,
  onChange: (fileUrl: string) => void
}) {
  const [src, setSrc] = React.useState<string>(imageUrl || "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("uploadedMedia", file);
    fetch("/uploads", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json() as Promise<{ fileUrl: string }>)
      .then((data) => {
        onChange(data.fileUrl);
        setSrc(data.fileUrl);
      });
  };

  return (
    <button type="button"
            onClick={() => fileInputRef.current?.click()}
            className="relative flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
    >
      {src && <img className="rounded" src={src} alt="selected-image" />}
      <Upload
        className="h-4 w-4 text-muted-foreground absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      <span className="sr-only">Upload</span>
      <Input accept="image/*" ref={fileInputRef} name="uploadedMedia" type="file" className="hidden"
             onChange={onInputFileChange}></Input>
    </button>
  );
}