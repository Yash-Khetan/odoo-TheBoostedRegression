import * as React from "react"
import { cn } from "@/lib/utils"

const Select = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-lg px-3 py-2 text-sm transition-all focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      style={{
        border: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-white)',
        color: 'var(--text-primary)'
      }}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  )
})
Select.displayName = "Select"

export { Select }
