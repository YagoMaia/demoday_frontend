"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/header";
import { SimulationForm } from "@/components/simulation-form";
import { ResultCards } from "@/components/result-cards";
import { GrowthChart } from "@/components/growth-chart";

interface DataPoint {
  mes: number;
  valor: number;
  investido: number;
}

function generateMockData(
  valorInicial: number,
  aporteMensal: number,
  taxaAnual: number,
  anos: number,
): DataPoint[] {
  const totalMeses = anos * 12;
  const taxaMensal = taxaAnual / 100 / 12;
  const data: DataPoint[] = [];

  let acumulado = valorInicial;
  let investido = valorInicial;

  data.push({ mes: 0, valor: valorInicial, investido: valorInicial });

  for (let mes = 1; mes <= totalMeses; mes++) {
    acumulado = acumulado * (1 + taxaMensal) + aporteMensal;
    investido += aporteMensal;
    data.push({
      mes,
      valor: Math.round(acumulado * 100) / 100,
      investido: Math.round(investido * 100) / 100,
    });
  }

  return data;
}

export default function Page() {
  const [valorInicial, setValorInicial] = useState("10000");
  const [aporteMensal, setAporteMensal] = useState("500");
  const [taxaAnual, setTaxaAnual] = useState("12");
  const [periodo, setPeriodo] = useState("10");
  const [loading, setLoading] = useState(false);
  const [hasSimulated, setHasSimulated] = useState(false);
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [healthStatus, setHealthStatus] = useState<
    "idle" | "loading" | "ok" | "error"
  >("idle");

  const totalAcumulado =
    chartData.length > 0 ? chartData[chartData.length - 1].valor : 0;
  const totalInvestido =
    chartData.length > 0 ? chartData[chartData.length - 1].investido : 0;
  const totalJuros = totalAcumulado - totalInvestido;

  const handleHealthCheck = useCallback(async () => {
    setHealthStatus("loading");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`);
      setHealthStatus(res.ok ? "ok" : "error");
    } catch {
      setHealthStatus("error");
    }
  }, []);

  const handleSimular = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      const data = generateMockData(
        Number(valorInicial) || 0,
        Number(aporteMensal) || 0,
        Number(taxaAnual) || 0,
        Number(periodo) || 1,
      );
      setChartData(data);
      setHasSimulated(true);
      setLoading(false);
    }, 1000);
  }, [valorInicial, aporteMensal, taxaAnual, periodo]);

  const healthLabel = {
    idle: "Verificar API",
    loading: "Verificando...",
    ok: "API Online ✓",
    error: "API Offline ✗",
  }[healthStatus];

  const healthColor = {
    idle: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    loading: "bg-secondary text-muted-foreground cursor-not-allowed",
    ok: "bg-green-100 text-green-700 border border-green-300",
    error: "bg-red-100 text-red-700 border border-red-300",
  }[healthStatus];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[380px_1fr]">
          {/* Coluna Esquerda - Formulário */}
          <div>
            <SimulationForm
              valorInicial={valorInicial}
              aporteMensal={aporteMensal}
              taxaAnual={taxaAnual}
              periodo={periodo}
              loading={loading}
              onValorInicialChange={setValorInicial}
              onAporteMensalChange={setAporteMensal}
              onTaxaAnualChange={setTaxaAnual}
              onPeriodoChange={setPeriodo}
              onSimular={handleSimular}
            />

            {/* Health Check Button */}
            <div className="mt-4">
              <button
                onClick={handleHealthCheck}
                disabled={healthStatus === "loading"}
                className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${healthColor}`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    healthStatus === "ok"
                      ? "bg-green-500"
                      : healthStatus === "error"
                        ? "bg-red-500"
                        : healthStatus === "loading"
                          ? "animate-pulse bg-muted-foreground"
                          : "bg-muted-foreground"
                  }`}
                />
                {healthLabel}
              </button>
            </div>
          </div>

          {/* Coluna Direita - Resultados */}
          <div className="flex flex-col gap-6">
            {hasSimulated ? (
              <>
                <ResultCards
                  totalAcumulado={totalAcumulado}
                  totalInvestido={totalInvestido}
                  totalJuros={totalJuros}
                />
                <GrowthChart data={chartData} />
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card px-6 py-20">
                <div className="flex items-center justify-center rounded-full bg-secondary p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground"
                  >
                    <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  Simule seu investimento
                </h3>
                <p className="mt-1 max-w-sm text-center text-sm text-muted-foreground">
                  Preencha os dados ao lado e clique em &quot;Simular
                  Investimento&quot; para visualizar a projeção de crescimento.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-card px-6 py-4">
        <p className="mx-auto max-w-7xl text-center text-xs text-muted-foreground">
          Simulação com fins educativos. Os valores apresentados não garantem
          resultados reais de investimentos.
        </p>
      </footer>
    </div>
  );
}
