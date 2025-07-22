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
    cssValue: '"IowanOldStyle"',
  },
  SOURCESANS_PRO: {
    name: 'Source Sans Pro',
    cssValue: '"SourceSansPro"',
  },
  BENGUIAT: {
    name: 'Benguiat',
    cssValue: '"Benguiat"',
  },
   ARIAL: {
    name: 'Arial',
    cssValue: 'Arial, sans-serif',
  },
  COMIC_SANS_MS: {
    name: 'Comic Sans MS',
    cssValue: '"Comic Sans MS", "Comic Sans", cursive',
  },
  COURIER_NEW: {
    name: 'Courier New',
    cssValue: '"Courier New", monospace',
  }
};