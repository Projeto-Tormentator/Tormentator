import { CardFontFamily } from "./types/CardFontFamily";
import { CardFontWeight } from "./types/CardFontWeight";
import { CardTextAlign } from "./types/CardTextAlign";
import { CardTextStyle } from "./types/CardTextStyle";

export interface CardCustomText {
  text: string;
  fontSize: number;
  color: string;
  maxLength?: number;
  type?: 'text' | 'textarea';
  fontFamily?: CardFontFamily;
  fontWeight?: CardFontWeight;
  textAlign?: CardTextAlign;
  textStyle?: CardTextStyle;
}
