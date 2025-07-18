import { CardFontFamily } from "./types/CardFontFamily";
import { CardFontWeight } from "./types/CardFontWeight";

export interface CardCustomText {
  text: string;
  fontSize: number;
  color: string;
  maxLength?: number;
  type?: 'text' | 'textarea';
  fontFamily?: CardFontFamily;
  fontWeight?: CardFontWeight;

}
