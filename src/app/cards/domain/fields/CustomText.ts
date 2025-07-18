import { CardFontFamily } from "./CardFontFamily";
import { CardFontWeight } from "./CardFontWeight";

export interface CardCustomText {
  text: string;
  fontSize: number;
  color: string;
  maxLength?: number;
  type?: 'text' | 'textarea';
  fontFamily?: CardFontFamily;
  fontWeight?: CardFontWeight;

}
