import { useRef, useState } from "react";
import { FileText, Download, RefreshCw, Trash2 } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/api/axiosInstance";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUploadResume } from "@/features/resume/hooks/useUploadResume";
import { useDeleteResume } from "@/features/resume/hooks/useDeleteResume";

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function ResumeCard({ resume }) {
  const fileInputRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const uploadMutation = useUploadResume();
  const deleteMutation = useDeleteResume();

  function handleReplaceClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (file) uploadMutation.mutate(file);
    e.target.value = "";
  }

  function handleDelete() {
    if (window.confirm("Delete your resume? This can't be undone.")) {
      deleteMutation.mutate();
    }
  }

  // Plain <a href> won't carry the Bearer token this route requires, so the
  // file is fetched as a blob through axiosInstance and downloaded manually.
  async function handleDownload() {
    setIsDownloading(true);
    try {
      const response = await axiosInstance.get("/resume/download", { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = resume.fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      toast.error("Couldn't download the resume. Try again.");
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <Card className="p-5">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-muted text-primary">
          <FileText className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-[14.5px] font-semibold text-text">{resume.fileName}</p>
          <p className="text-[12.5px] text-text-muted">
            {formatFileSize(resume.fileSize)} · Uploaded {formatDate(resume.createdAt)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="button" variant="secondary" size="sm" onClick={handleDownload} isLoading={isDownloading}>
          <Download className="size-3.5" />
          Download
        </Button>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={handleReplaceClick}
          isLoading={uploadMutation.isPending}
        >
          <RefreshCw className="size-3.5" />
          Replace
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          isLoading={deleteMutation.isPending}
          className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
        >
          <Trash2 className="size-3.5" />
          Delete
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </Card>
  );
}