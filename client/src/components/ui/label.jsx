import * as React from "react";
import { cn } from "@/lib/utils";

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("text-[13px] font-medium text-text-muted mb-1.5 block", className)}
    {...props}
  />
));
Label.displayName = "Label";

export { Label };
