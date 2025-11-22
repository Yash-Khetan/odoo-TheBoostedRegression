import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium border transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-white border-[var(--accent-green)]" ,
        destructive: "text-white border-[var(--accent-red)]",
        outline: "bg-transparent border-[var(--border-color)]",
        secondary: "text-white border-[var(--accent-orange)]",
        ghost: "bg-transparent border-[var(--border-color)]",
        link: "border-none underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  const getStyle = () => {
    const base = {};
    if (variant === 'default') {
      base.backgroundColor = 'var(--accent-green)';
      base.borderColor = 'var(--accent-green)';
    } else if (variant === 'secondary') {
      base.backgroundColor = 'var(--accent-orange)';
      base.borderColor = 'var(--accent-orange)';
    } else if (variant === 'destructive') {
      base.backgroundColor = 'var(--accent-red)';
      base.borderColor = 'var(--accent-red)';
    } else if (variant === 'outline') {
      base.color = 'var(--text-secondary)';
      base.borderColor = 'var(--border-color)';
    } else if (variant === 'link') {
      base.color = 'var(--accent-blue)';
    }
    return base;
  };

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      style={getStyle()}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }
