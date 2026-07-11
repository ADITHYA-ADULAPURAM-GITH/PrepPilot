export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16 text-center">
      {Icon && (
        <div className="flex size-11 items-center justify-center rounded-xl bg-white/[0.04]">
          <Icon className="size-5 text-text-faint" />
        </div>
      )}
      <h3 className="mt-4 font-display text-[15px] font-semibold text-text">{title}</h3>
      {description && <p className="mt-1.5 max-w-xs text-[13px] text-text-muted">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}