import * as React from "react";
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-button text-white hover:bg-primary-button-hover shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",

        secondary:
          "bg-white/[0.04] text-text border border-border hover:bg-white/[0.07]",

        ghost:
          "text-text-muted hover:text-text hover:bg-white/[0.04]",

        link:
          "text-primary-strong underline-offset-4 hover:underline p-0 h-auto",
      },

      size: {
        default: "h-10 px-4",
        sm: "h-8 px-3 text-[13px]",
        lg: "h-11 px-6 text-[15px]",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  (
    {
      className,
      variant,
      size,
      isLoading,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileTap={
          disabled || isLoading
            ? undefined
            : { scale: 0.97 }
        }
        transition={{
          duration: 0.15,
        }}
        className={cn(
          buttonVariants({
            variant,
            size,
          }),
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <Loader2 className="size-4 animate-spin" />
        )}

        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export {
  Button,
  buttonVariants,
};