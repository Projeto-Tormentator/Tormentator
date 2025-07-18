export interface CardFontWeightData {
  name: string; // Name of the font weight
  cssValue: string; // CSS value for the font-weight property
}

export type CardFontWeight =
  'NORMAL'
  | 'BOLD'
  | 'LIGHT';

export const CardFontWeights: Record<CardFontWeight, CardFontWeight> = {
  NORMAL: 'NORMAL',
  BOLD: 'BOLD',
  LIGHT: 'LIGHT'
};

export const CardFontWeightsConfig: Record<CardFontWeight, CardFontWeightData> = {
  NORMAL: {
    name: 'Normal',
    cssValue: 'normal',
  },
  BOLD: {
    name: 'Negrito',
    cssValue: 'bold',
  },
  LIGHT: {
    name: 'Leve',
    cssValue: '300',
  }
};