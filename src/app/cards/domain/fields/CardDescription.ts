import { CardFontFamilies } from "./types/CardFontFamily";
import { CardFontWeights } from "./types/CardFontWeight";
import { CardCustomText } from "./CustomText";

export interface CardDescription extends CardCustomText {}

export const DEFAULT_CARD_DESCRIPTION: CardDescription = {
  text: "",
  fontSize: 16,
  color: "#ffffff",
  maxLength: 50,
  type: "text",
  fontFamily: CardFontFamilies.IOWAN_OLD_STYLE,
  fontWeight: CardFontWeights.NORMAL
};