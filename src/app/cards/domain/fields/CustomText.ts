import { CardFontFamily } from "./CardFontFamily";

export interface CardCustomText {
  text: string;
  fontSize: number;
  color: string;
  maxLength?: number;
  type?: 'text' | 'textarea';
  fontFamily?: CardFontFamily;

}
