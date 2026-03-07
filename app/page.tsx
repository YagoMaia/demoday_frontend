"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/header";
import { SimulationForm } from "@/components/simulation-form";
import { ResultCards } from "@/components/result-cards";
import { GrowthChart } from "@/components/growth-chart";
import { SimularRequest, SimularResponse } from "@/types/api";

// Mantemos a interface para garantir a tipagem dos dados do gráfico
interface DataPoint {
  mes: number;
  valor: number;
  investido: number;
}

// 1. Função de chamada da API (Melhorada)
export const simularInvestimento = async (
  payload: SimularRequest,
): Promise<SimularResponse> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const response = await fetch(`${API_URL}/api/simular`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Erro na simulação");
  }

  return await response.json();
};

export default function Page() {
  // Estados do formulário (mantidos como strings para os inputs)
  const [valorInicial, setValorInicial] = useState("10000");
  const [aporteMensal, setAporteMensal] = useState("500");
  const [taxaAnual, setTaxaAnual] = useState("12");
  const [periodo, setPeriodo] = useState("10"); // Anos

  // Estados de controle da UI
  const [loading, setLoading] = useState(false);
  const [hasSimulated, setHasSimulated] = useState(false);
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [healthStatus, setHealthStatus] = useState<
    "idle" | "loading" | "ok" | "error"
  >("idle");

  // Cálculos derivados para os ResultCards
  const totalAcumulado =
    chartData.length > 0 ? chartData[chartData.length - 1].valor : 0;
  const totalInvestido =
    chartData.length > 0 ? chartData[chartData.length - 1].investido : 0;
  const totalJuros = totalAcumulado - totalInvestido;

  // 2. Verificação de Saúde da API (Ajustado para a rota /ping que criamos)
  const handleHealthCheck = useCallback(async () => {
    setHealthStatus("loading");
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    try {
      const res = await fetch(`${API_URL}/health`);
      setHealthStatus(res.ok ? "ok" : "error");
    } catch {
      setHealthStatus("error");
    }
  }, []);

  // 3. Ação Principal de Simulação
  const handleSimular = async () => {
    setLoading(true);
    try {
      // Convertemos as strings do estado para o formato numérico da API
      const payload: SimularRequest = {
        valorInicial: parseFloat(valorInicial),
        aporteMensal: parseFloat(aporteMensal),
        taxaAnual: parseFloat(taxaAnual),
        periodo: parseInt(periodo), // O backend deve tratar se é meses ou anos
      };

      const resultado = await simularInvestimento(payload);

      // Atualizamos os dados do gráfico com o retorno da API
      setChartData(resultado.data);
      setHasSimulated(true);
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com a API. Verifique se o backend está rodando.");
    } finally {
      setLoading(false);
    }
  };

  // Configurações visuais do botão de Health Check
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
          <div className="flex flex-col gap-4">
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
                      : "bg-muted-foreground"
                }`}
              />
              {healthLabel}
            </button>
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
              <EmptyState />
            )}
          </div>
        </div>
      </main>
      {/* Footer omitido para brevidade */}
    </div>
  );
}

// Componente auxiliar para o estado vazio
function EmptyState() {
  return (
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
        Preencha os dados ao lado e clique em "Simular Investimento" para
        visualizar a projeção de crescimento.
      </p>
    </div>
  );
}
