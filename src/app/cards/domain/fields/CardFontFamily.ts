export interface CardFontFamilyData {
  name: string; // Name of the font family
  cssValue: string; // CSS value for the font-family property
}

export type CardFontFamily = 
  'TORMENTA_20'
  | 'IOWAN_OLD_STYLE'
  | 'SOURCESANS_PRO'
  | 'BENGUIAT'
  | 'COMIC_SANS_MS'
  | 'COURIER_NEW'
  | 'ARIAL';

export const CardFontFamilies: Record<CardFontFamily, CardFontFamily> = {
  TORMENTA_20: 'TORMENTA_20',
  IOWAN_OLD_STYLE: 'IOWAN_OLD_STYLE',
  SOURCESANS_PRO: 'SOURCESANS_PRO',
  BENGUIAT: 'BENGUIAT',
  COMIC_SANS_MS: 'COMIC_SANS_MS',
  COURIER_NEW: 'COURIER_NEW',
  ARIAL: 'ARIAL'
};

export const CardFontFamiliesConfig: Record<CardFontFamily, CardFontFamilyData> = {
  TORMENTA_20: {
    name: 'Tormenta 20',
    cssValue: '"Tormenta 20", fantasy',
  },
  IOWAN_OLD_STYLE: {
    name: 'Iowan Old Style',
    cssValue: '"Iowan Old Style", serif',
  },
  SOURCESANS_PRO: {
    name: 'Source Sans Pro',
    cssValue: '"Source Sans Pro", sans-serif',
  },
  BENGUIAT: {
    name: 'Benguiat',
    cssValue: '"Benguiat", cursive',
  },
   ARIAL: {
    name: 'Arial',
    cssValue: 'Arial, sans-serif',
  },
  COMIC_SANS_MS: {
    name: 'Comic Sans MS',
    cssValue: '"Comic Sans MS", cursive, sans-serif',
  },
  COURIER_NEW: {
    name: 'Courier New',
    cssValue: '"Courier New", monospace',
  }
};