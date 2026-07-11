import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type = "text", error, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-lg border bg-white/[0.03] px-3 text-sm text-text placeholder:text-text-faint",
        "border-border transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
        "disabled:cursor-not-allowed disabled:opacity-50",
        error && "border-danger focus:border-danger focus:ring-danger",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
