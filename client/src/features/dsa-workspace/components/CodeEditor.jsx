import Editor from "@monaco-editor/react";

// Maps PrepPilot's language identifiers to Monaco's language ids.
// ASSUMPTION FLAGGED: assumes supportedLanguages values are "javascript" / "python".
// Adjust this map if the actual values differ (e.g. "python3", "js").
const MONACO_LANGUAGE_MAP = {
  javascript: "javascript",
  python: "python",
};

export function CodeEditor({ value, onChange, language }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <Editor
        height="480px"
        language={MONACO_LANGUAGE_MAP[language] || "javascript"}
        value={value}
        onChange={(newValue) => onChange(newValue ?? "")}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
}