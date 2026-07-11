import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, error, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[80px] w-full rounded-lg border bg-white/[0.03] px-3 py-2 text-sm text-text placeholder:text-text-faint",
      "border-border transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
      "disabled:cursor-not-allowed disabled:opacity-50 resize-none",
      error && "border-danger focus:border-danger focus:ring-danger",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };