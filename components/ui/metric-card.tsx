// src/components/ui/metric-card.tsx
import { Card, CardContent } from "./card"

interface MetricCardProps {
  title: string
  value: string
  description: string
}

export function MetricCard({ title, value, description }: MetricCardProps) {
  return (
    <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{value}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
      </CardContent>
    </Card>
  )
}