import { Card, CardContent } from "@/components/ui/card"
import { Wallet, PiggyBank, TrendingUp } from "lucide-react"

interface ResultCardsProps {
  totalAcumulado: number
  totalInvestido: number
  totalJuros: number
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value)
}

export function ResultCards({ totalAcumulado, totalInvestido, totalJuros }: ResultCardsProps) {
  const cards = [
    {
      label: "Valor Total Acumulado",
      value: totalAcumulado,
      icon: Wallet,
      highlight: true,
    },
    {
      label: "Total Investido",
      value: totalInvestido,
      icon: PiggyBank,
      highlight: false,
    },
    {
      label: "Total Ganho em Juros",
      value: totalJuros,
      icon: TrendingUp,
      highlight: false,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <Card
          key={card.label}
          className={
            card.highlight
              ? "border-accent/30 bg-accent/5"
              : ""
          }
        >
          <CardContent className="flex flex-col gap-3 py-5">
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center justify-center rounded-md p-1.5 ${
                  card.highlight
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                <card.icon className="size-4" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {card.label}
              </span>
            </div>
            <p
              className={`text-2xl font-bold tracking-tight ${
                card.highlight ? "text-accent" : "text-foreground"
              }`}
            >
              {formatCurrency(card.value)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
