// 카드 컴포넌트
import { forwardRef } from "react"
import * as React from "react"

export const Card = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props} />
))

Card.displayName = "Card"
