import { DifficultyBadge } from "@/features/dsa-tracker/components/DifficultyBadge";

function getConstraintLines(constraints) {
  if (!constraints) return [];
  if (Array.isArray(constraints)) {
    return constraints.filter((line) => typeof line === "string" && line.trim().length > 0);
  }
  if (typeof constraints === "string") {
    return constraints
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }
  return [];
}

export function ProblemStatementPanel({ problem }) {
  if (!problem) return null;

  const { title, statement, examples, constraints, topics, patterns, difficulty } = problem;

  const hasExamples = Array.isArray(examples) && examples.length > 0;
  const constraintLines = getConstraintLines(constraints);
  const hasConstraints = constraintLines.length > 0;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <h1 className="font-display text-xl font-semibold text-text">{title}</h1>
        <DifficultyBadge difficulty={difficulty} />
      </div>

      {Array.isArray(topics) && topics.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <span
              key={topic}
              className="rounded-full border border-border px-2.5 py-1 text-[12px] text-text-muted"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {Array.isArray(patterns) && patterns.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {patterns.map((pattern) => (
            <span
              key={pattern}
              className="rounded-full border border-border px-2.5 py-1 text-[12px] text-text-faint"
            >
              {pattern}
            </span>
          ))}
        </div>
      )}

      <div className="whitespace-pre-wrap text-[13.5px] leading-relaxed text-text-muted">
        {statement}
      </div>

      {hasExamples && (
        <div className="space-y-3">
          <h2 className="text-[13px] font-medium text-text">Examples</h2>
          {examples.map((example, index) => (
            <div
              key={index}
              className="space-y-2 rounded-xl border border-border bg-white/[0.02] p-3 text-[12.5px]"
            >
              <p className="font-medium text-text">Example {index + 1}</p>

              {example?.input !== undefined && example?.input !== null && (
                <div>
                  <p className="text-[11.5px] font-medium uppercase tracking-wide text-text-faint">
                    Input
                  </p>
                  <p className="whitespace-pre-wrap text-text-muted">{String(example.input)}</p>
                </div>
              )}

              {example?.output !== undefined && example?.output !== null && (
                <div>
                  <p className="text-[11.5px] font-medium uppercase tracking-wide text-text-faint">
                    Output
                  </p>
                  <p className="whitespace-pre-wrap text-text-muted">{String(example.output)}</p>
                </div>
              )}

              {example?.explanation !== undefined && example?.explanation !== null && (
                <div>
                  <p className="text-[11.5px] font-medium uppercase tracking-wide text-text-faint">
                    Explanation
                  </p>
                  <p className="whitespace-pre-wrap text-text-muted">
                    {String(example.explanation)}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {hasConstraints && (
        <div className="space-y-2">
          <h2 className="text-[13px] font-medium text-text">Constraints</h2>
          <ul className="list-disc space-y-1 pl-5 text-[12.5px] text-text-muted">
            {constraintLines.map((line, index) => (
              <li key={index} className="whitespace-pre-wrap">
                {line}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}