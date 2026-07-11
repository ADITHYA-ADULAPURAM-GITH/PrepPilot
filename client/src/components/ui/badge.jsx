import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11.5px] font-medium", {
  variants: {
    variant: {
      default: "bg-white/[0.06] text-text-muted",
      primary: "bg-primary-muted text-[#b3a9ff]",
      accent: "bg-accent-muted text-accent",
      success: "bg-success/10 text-success",
      danger: "bg-danger/10 text-danger",
    },
  },
  defaultVariants: { variant: "default" },
});

export function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
