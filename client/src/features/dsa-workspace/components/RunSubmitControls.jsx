import { Button } from "@/components/ui/button";

export function RunSubmitControls({ onRun, onSubmit, isRunning, isSubmitting }) {
  const disabled = isRunning || isSubmitting;

  return (
    <div className="flex items-center gap-3">
      <Button type="button" variant="secondary" disabled={disabled} onClick={onRun}>
        {isRunning ? "Running..." : "Run"}
      </Button>
      <Button type="button" disabled={disabled} onClick={onSubmit}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
}