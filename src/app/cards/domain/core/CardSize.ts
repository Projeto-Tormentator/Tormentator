export type CardSize =
  "NORMAL"
  | "TAROT";


export const CARD_SIZES: Record<CardSize, CardSize> = {
  NORMAL: "NORMAL",
  TAROT: "TAROT"
};

export interface CardSizeData {
  uiLabel: string;
  uiDescription: string;
  printDimensions: { width: number; height: number };
  displayDimensions: { width: number; height: number };
}

export const CARD_SIZE_DATA: Record<CardSize, CardSizeData> = {
  NORMAL: {
    uiLabel: "Normal",
    uiDescription: "Carta padrão de baralho.",
    printDimensions: { width: 63, height: 88 },
    displayDimensions: { width: 275, height: 405 }
  },
  TAROT: {
    uiLabel: "Tarot",
    uiDescription: "Carta de tamanho Tarot. Utilizada nas cartas de Magia de T20.",
    printDimensions: { width: 70, height: 120 },
    displayDimensions: { width: 300, height: 500 }
  }
};