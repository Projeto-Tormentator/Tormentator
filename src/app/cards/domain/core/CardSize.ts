export type CardSize =
  "NORMAL"
  | "TAROT";


export const CARD_SIZES: Record<CardSize, CardSize> = {
  NORMAL: "NORMAL",
  TAROT: "TAROT"
};

export interface CardSizeData {
  uiLabel: string;
  uiDescriptio: string;
  dimensions: { width: number; height: number };
}

export const CARD_SIZE_DATA: Record<CardSize, CardSizeData> = {
  NORMAL: {
    uiLabel: "Normal",
    uiDescriptio: "Carta padrão de baralho.",
    dimensions: { width: 63, height: 88 }
  },
  TAROT: {
    uiLabel: "Tarot",
    uiDescriptio: "Carta de tamanho Tarot. Utilizada nas cartas de Magia de T20.",
    dimensions: { width: 70, height: 120 }
  }
};