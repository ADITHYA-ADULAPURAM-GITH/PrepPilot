export function LanguageSelector({ languages, value, onChange, disabled }) {
  if (!Array.isArray(languages) || languages.length === 0) return null;

  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-border bg-white/[0.02] px-3 py-1.5 text-[13px] text-text disabled:opacity-50"
    >
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
}