import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-lg px-3 py-2 text-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:opacity-60 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      style={{
        border: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-white)',
        color: 'var(--text-primary)'
      }}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
