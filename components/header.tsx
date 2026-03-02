import { TrendingUp } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-4">
        <div className="flex items-center justify-center rounded-lg bg-accent p-2">
          <TrendingUp className="size-5 text-accent-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">
            Simulador de Investimentos
          </h1>
          <p className="text-sm text-muted-foreground">
            Juros compostos e crescimento patrimonial
          </p>
        </div>
      </div>
    </header>
  )
}
