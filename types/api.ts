// O que você envia para a API
export interface SimularRequest {
  valorInicial: number;
  aporteMensal: number;
  taxaAnual: number;
  periodo: number;
}

// O que você recebe da API
export interface SimularResponse {
  data: Array<{
    mes: number;
    valor: number;
    investido: number;
  }>;
}
