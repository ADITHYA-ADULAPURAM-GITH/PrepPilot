import { useState } from "react";
import { Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useJdMatch } from "@/features/resume/hooks/useJdMatch";

export function JdMatch() {
  const [jdText, setJdText] = useState("");
  const [result, setResult] = useState(null);
  const jdMatchMutation = useJdMatch();

  const trimmed = jdText.trim();
  const canSubmit = trimmed.length > 0 && !jdMatchMutation.isPending;

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    jdMatchMutation.mutate(trimmed, {
      onSuccess: ({ data }) => setResult(data.data.jdMatch),
    });
  }

  return (
    <Card className="p-5">
      <h3 className="flex items-center gap-1.5 font-display text-[15px] font-semibold text-text">
        <Target className="size-4 text-primary" />
        JD match
      </h3>
      <p className="mt-1 text-[13px] text-text-muted">
        Paste a job description to see how your current resume matches it. This doesn't run a full
        re-analysis and isn't saved.
      </p>

      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          rows={5}
          placeholder="Paste the job description here..."
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 p-3 text-[13.5px] text-text placeholder:text-text-muted focus:border-primary focus:outline-none"
        />
        <div className="mt-2 flex justify-end">
          <Button type="submit" size="sm" isLoading={jdMatchMutation.isPending} disabled={!canSubmit}>
            Check match
          </Button>
        </div>
      </form>

      {result && !result.available && (
        <p className="mt-4 text-[13px] text-text-muted">
          Couldn't match against that job description. Try pasting the full listing.
        </p>
      )}

      {result?.available && (
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-2xl font-semibold text-text">{result.percentage}%</span>
            <span className="text-[12.5px] text-text-muted">match</span>
          </div>

          {result.matchedSkills?.length > 0 && (
            <div>
              <p className="text-[11.5px] font-medium text-text-muted">Matched skills</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {result.matchedSkills.map((skill, i) => (
                  <span key={i} className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11.5px] text-emerald-400">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {result.missingSkills?.length > 0 && (
            <div>
              <p className="text-[11.5px] font-medium text-text-muted">Missing skills</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {result.missingSkills.map((skill, i) => (
                  <span key={i} className="rounded-full bg-red-500/10 px-2.5 py-1 text-[11.5px] text-red-400">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {result.missingKeywords?.length > 0 && (
            <div>
              <p className="text-[11.5px] font-medium text-text-muted">Missing keywords</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {result.missingKeywords.map((kw, i) => (
                  <span key={i} className="rounded-full bg-white/5 px-2.5 py-1 text-[11.5px] text-text-muted">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {result.notes?.length > 0 && (
            <div>
              <p className="text-[11.5px] font-medium text-text-muted">Notes</p>
              <ul className="mt-1 list-inside list-disc text-[13px] text-text-muted">
                {result.notes.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}