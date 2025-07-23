export interface CardFontWeightData {
  name: string; // Name of the font weight
  cssValue: string; // CSS value for the font-weight property
}

export type CardFontWeight =
  'NORMAL'
  | 'BOLD';

export const CardFontWeights: Record<CardFontWeight, CardFontWeight> = {
  NORMAL: 'NORMAL',
  BOLD: 'BOLD'
};

export const CardFontWeightsConfig: Record<CardFontWeight, CardFontWeightData> = {
  NORMAL: {
    name: 'Normal',
    cssValue: 'normal',
  },
  BOLD: {
    name: 'Negrito',
    cssValue: 'bold',
  }
};