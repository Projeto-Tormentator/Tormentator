export interface CardTextStyleData {
  name: string; // Name of the text style
  cssValue: string; // CSS value for the text style
}

export type CardTextStyle =
  'NORMAL'
  | 'ITALIC';

export const CardTextStyles: Record<CardTextStyle, CardTextStyle> = {
  NORMAL: 'NORMAL',
  ITALIC: 'ITALIC'
};

export const CardTextStylesConfig: Record<CardTextStyle, CardTextStyleData> = {
  NORMAL: {
    name: 'Normal',
    cssValue: 'normal',
  },
  ITALIC: {
    name: 'Itálico',
    cssValue: 'italic',
  }
};