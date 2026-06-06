"use client";
import { useState } from "react";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps { className?: string; }

export function FileUpload({ className }: FileUploadProps) {
  const [files, setFiles] = useState<string[]>([]);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-[var(--color-surface-border)] rounded-[var(--radius-lg)] hover:border-[var(--color-primary)] cursor-pointer transition-colors">
        <div className="text-center">
          <Upload className="h-8 w-8 mx-auto text-[var(--color-outline)]" />
          <p className="mt-1 text-sm text-[var(--color-on-surface-variant)]">Click to upload or drag and drop</p>
          <p className="text-xs text-[var(--color-outline)]">PDF, DOCX, XLSX (max 10MB)</p>
        </div>
      </div>
      {files.length > 0 && (
        <div className="space-y-1">
          {files.map((f, i) => (
            <div key={i} className="flex items-center justify-between px-3 py-1.5 rounded-[var(--radius-default)] bg-[var(--color-surface-container-low)]">
              <span className="text-sm">{f}</span>
              <button onClick={() => setFiles(files.filter((_, j) => j !== i))}><X className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
