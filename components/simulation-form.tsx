"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Calculator } from "lucide-react"

interface SimulationFormProps {
  valorInicial: string
  aporteMensal: string
  taxaAnual: string
  periodo: string
  loading: boolean
  onValorInicialChange: (value: string) => void
  onAporteMensalChange: (value: string) => void
  onTaxaAnualChange: (value: string) => void
  onPeriodoChange: (value: string) => void
  onSimular: () => void
}

export function SimulationForm({
  valorInicial,
  aporteMensal,
  taxaAnual,
  periodo,
  loading,
  onValorInicialChange,
  onAporteMensalChange,
  onTaxaAnualChange,
  onPeriodoChange,
  onSimular,
}: SimulationFormProps) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calculator className="size-5 text-accent" />
          Dados do Investimento
        </CardTitle>
        <CardDescription>
          Preencha os campos abaixo para simular o crescimento do seu investimento.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault()
            onSimular()
          }}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="valorInicial">Valor Inicial (R$)</Label>
            <Input
              id="valorInicial"
              type="number"
              placeholder="10.000,00"
              min="0"
              step="100"
              value={valorInicial}
              onChange={(e) => onValorInicialChange(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="aporteMensal">Aporte Mensal (R$)</Label>
            <Input
              id="aporteMensal"
              type="number"
              placeholder="500,00"
              min="0"
              step="50"
              value={aporteMensal}
              onChange={(e) => onAporteMensalChange(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="taxaAnual">Taxa de Juros Anual (%)</Label>
            <Input
              id="taxaAnual"
              type="number"
              placeholder="12,00"
              min="0"
              step="0.5"
              value={taxaAnual}
              onChange={(e) => onTaxaAnualChange(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="periodo">{"Período (Anos)"}</Label>
            <Input
              id="periodo"
              type="number"
              placeholder="10"
              min="1"
              max="50"
              step="1"
              value={periodo}
              onChange={(e) => onPeriodoChange(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="mt-2 w-full bg-accent text-accent-foreground hover:bg-accent/90"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner className="size-4" />
                Calculando...
              </>
            ) : (
              "Simular Investimento"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
