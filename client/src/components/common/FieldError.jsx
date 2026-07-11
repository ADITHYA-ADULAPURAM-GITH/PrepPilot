export function FieldError({ message }) {
  if (!message) return null;
  return <p className="mt-1.5 text-[12px] text-danger">{message}</p>;
}
