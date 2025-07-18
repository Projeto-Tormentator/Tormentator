export interface CardTextAlignData {
  name: string; // Name of the text alignment
  cssValue: string; // CSS value for the text-align property
}

export type CardTextAlign =
  'LEFT'
  | 'CENTER'
  | 'RIGHT'
  | 'JUSTIFY';

export const CardTextAligns: Record<CardTextAlign, CardTextAlign> = {
  LEFT: 'LEFT',
  CENTER: 'CENTER',
  RIGHT: 'RIGHT',
  JUSTIFY: 'JUSTIFY'
};

export const CardTextAlignsConfig: Record<CardTextAlign, CardTextAlignData> = {
  LEFT: {
    name: 'Esquerda',
    cssValue: 'left',
  },
  CENTER: {
    name: 'Centro',
    cssValue: 'center',
  },
  RIGHT: {
    name: 'Direita',
    cssValue: 'right',
  },
  JUSTIFY: {
    name: 'Justificado',
    cssValue: 'justify',
  }
};