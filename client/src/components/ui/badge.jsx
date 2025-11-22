import * as React from "react"
import { cn } from "@/lib/utils"

const Badge = React.forwardRef(({ className, variant, ...props }, ref) => {
  const getStyle = () => {
    if (variant === 'success' || variant === 'complete' || variant === 'shipped') {
      return {
        backgroundColor: 'rgba(115, 169, 127, 0.15)',
        color: 'var(--accent-green)'
      };
    } else if (variant === 'warning' || variant === 'processing') {
      return {
        backgroundColor: 'rgba(238, 220, 130, 0.15)',
        color: 'var(--accent-yellow)'
      };
    } else if (variant === 'danger') {
      return {
        backgroundColor: 'rgba(217, 115, 115, 0.15)',
        color: 'var(--accent-red)'
      };
    } else if (variant === 'info') {
      return {
        backgroundColor: 'rgba(107, 155, 209, 0.15)',
        color: 'var(--accent-blue)'
      };
    } else if (variant === 'draft') {
      return {
        backgroundColor: 'rgba(153, 153, 153, 0.15)',
        color: 'var(--text-muted)'
      };
    }
    return {};
  }

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap",
        className
      )}
      style={getStyle()}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

export { Badge }
