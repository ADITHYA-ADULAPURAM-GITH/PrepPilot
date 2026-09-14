import { useState } from "react";
import { Wand2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBulletImprove } from "@/features/resume/hooks/useBulletImprove";

const MAX_LENGTH = 500;

export function BulletImprover() {
  const [bullet, setBullet] = useState("");
  const [suggestion, setSuggestion] =
    useState(null);

  const improveMutation = useBulletImprove();

  const trimmed = bullet.trim();
  const overLimit =
    bullet.length > MAX_LENGTH;

  const canSubmit =
    trimmed.length > 0 &&
    !overLimit &&
    !improveMutation.isPending;

  function handleSubmit(e) {
    e.preventDefault();

    if (!canSubmit) return;

    improveMutation.mutate(trimmed, {
      onSuccess: ({ data }) =>
        setSuggestion(data.data.suggestion),
    });
  }

  return (
    <Card className="p-5">
      <h3 className="flex items-center gap-1.5 font-display text-[15px] font-semibold text-text">
        <Wand2 className="size-4 text-primary" />
        Bullet improver
      </h3>

      <p className="mt-1 text-[13px] text-text-muted">
        Paste a single resume bullet and get a
        stronger, more specific rewrite. Works even
        without an uploaded resume.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-4"
      >
        <textarea
          value={bullet}
          onChange={(e) =>
            setBullet(e.target.value)
          }
          rows={3}
          placeholder="e.g. Worked on the backend team to improve API performance"
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 p-3 text-[13.5px] text-text placeholder:text-text-muted focus:border-primary focus:outline-none"
        />

        <div className="mt-1.5 flex items-center justify-between">
          <span
            className={`text-[11.5px] ${
              overLimit
                ? "text-red-400"
                : "text-text-muted"
            }`}
          >
            {bullet.length} / {MAX_LENGTH}
          </span>

          <Button
            type="submit"
            size="sm"
            isLoading={improveMutation.isPending}
            disabled={!canSubmit}
          >
            Improve bullet
          </Button>
        </div>
      </form>

      {suggestion && (
        <div className="mt-4 space-y-3 rounded-xl bg-white/5 p-4">
          <div>
            <p className="text-[11.5px] font-medium text-text-muted">
              Improved
            </p>

            <p className="mt-1 text-[13.5px] text-text">
              {suggestion.improved}
            </p>
          </div>

          <div>
            <p className="text-[11.5px] font-medium text-text-muted">
              Why
            </p>

            <p className="mt-1 text-[13px] text-text-muted">
              {suggestion.why}
            </p>
          </div>

          {suggestion.missingInfo?.length >
            0 && (
            <div>
              <p className="text-[11.5px] font-medium text-text-muted">
                Consider adding
              </p>

              <ul className="mt-1 list-inside list-disc text-[13px] text-text-muted">
                {suggestion.missingInfo.map(
                  (item, i) => (
                    <li key={i}>{item}</li>
                  )
                )}
              </ul>
            </div>
          )}

          {suggestion.keywords?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {suggestion.keywords.map(
                (kw, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-primary-muted px-2.5 py-1 text-[11.5px] text-primary-strong"
                  >
                    {kw}
                  </span>
                )
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}