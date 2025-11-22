import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl p-6 transition-shadow",
      className
    )}
    style={{
      backgroundColor: 'var(--bg-white)',
      boxShadow: 'var(--shadow-card)'
    }}
    onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-hover)'}
    onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-card)'}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex justify-between items-center mb-6 -mt-6 -mx-6 px-6 pt-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-lg font-semibold m-0',
      className
    )}
    style={{ color: 'var(--text-primary)' }}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm mt-1", className)}
    style={{ color: 'var(--text-secondary)' }}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("-mx-6 -mb-6 px-6 pb-6", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
