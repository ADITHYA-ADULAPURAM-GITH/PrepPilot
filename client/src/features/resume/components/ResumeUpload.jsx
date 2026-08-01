import { useRef } from "react";
import { UploadCloud } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUploadResume } from "@/features/resume/hooks/useUploadResume";

export function ResumeUpload() {
  const fileInputRef = useRef(null);
  const uploadMutation = useUploadResume();

  function handleBrowseClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (file) uploadMutation.mutate(file);
    e.target.value = "";
  }

  return (
    <Card className="flex flex-col items-center justify-center gap-3 border-dashed p-10 text-center">
      <div className="flex size-12 items-center justify-center rounded-xl bg-primary-muted text-primary">
        <UploadCloud className="size-6" />
      </div>
      <div>
        <p className="font-display text-[15px] font-semibold text-text">No resume uploaded yet</p>
        <p className="mt-1 text-[13px] text-text-muted">PDF or Word document, up to 5MB.</p>
      </div>
      <Button type="button" onClick={handleBrowseClick} isLoading={uploadMutation.isPending}>
        Upload Resume
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={handleFileChange}
      />
    </Card>
  );
}