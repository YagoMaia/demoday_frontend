"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface DataPoint {
  mes: number
  valor: number
  investido: number
}

interface GrowthChartProps {
  data: DataPoint[]
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function formatYAxis(value: number) {
  if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `R$ ${(value / 1_000).toFixed(0)}k`
  return `R$ ${value}`
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number; dataKey: string }>
  label?: number
}) {
  if (!active || !payload || payload.length === 0) return null

  const valorTotal = payload.find((p) => p.dataKey === "valor")?.value ?? 0
  const investido = payload.find((p) => p.dataKey === "investido")?.value ?? 0

  return (
    <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
      <p className="mb-2 text-xs font-medium text-muted-foreground">
        {"Mês "}{label}
      </p>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full" style={{ backgroundColor: "oklch(0.62 0.17 155)" }} />
          <span className="text-sm text-foreground">
            {"Total: "}{formatCurrency(valorTotal)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full" style={{ backgroundColor: "oklch(0.62 0.17 155 / 0.3)" }} />
          <span className="text-sm text-foreground">
            {"Investido: "}{formatCurrency(investido)}
          </span>
        </div>
      </div>
    </div>
  )
}

export function GrowthChart({ data }: GrowthChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Crescimento ao Longo do Tempo</CardTitle>
        <CardDescription>
          Curva de crescimento patrimonial com juros compostos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: 10, bottom: 5 }}>
              <defs>
                <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.62 0.17 155)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.62 0.17 155)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorInvestido" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.62 0.17 155)" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="oklch(0.62 0.17 155)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.91 0.005 80)"
                vertical={false}
              />
              <XAxis
                dataKey="mes"
                tick={{ fill: "oklch(0.5 0.01 60)", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => {
                  if (data.length <= 24) return `${val}`
                  if (val % 12 === 0) return `${val / 12}a`
                  return ""
                }}
                interval={data.length <= 24 ? 2 : 11}
                label={{
                  value: data.length <= 24 ? "Meses" : "Anos",
                  position: "insideBottomRight",
                  offset: -5,
                  fill: "oklch(0.5 0.01 60)",
                  fontSize: 12,
                }}
              />
              <YAxis
                tick={{ fill: "oklch(0.5 0.01 60)", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatYAxis}
                width={70}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="investido"
                stroke="oklch(0.62 0.17 155 / 0.4)"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                fillOpacity={1}
                fill="url(#colorInvestido)"
              />
              <Area
                type="monotone"
                dataKey="valor"
                stroke="oklch(0.62 0.17 155)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValor)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full" style={{ backgroundColor: "oklch(0.62 0.17 155)" }} />
            <span className="text-xs text-muted-foreground">Valor Total</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full border-2 border-dashed" style={{ borderColor: "oklch(0.62 0.17 155 / 0.5)" }} />
            <span className="text-xs text-muted-foreground">Total Investido</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
