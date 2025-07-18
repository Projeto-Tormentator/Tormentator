import { CardFontFamilies } from "./types/CardFontFamily";
import { CardFontWeights } from "./types/CardFontWeight";
import { CardTextAligns } from "./types/CardTextAlign";
import { CardCustomText } from "./CustomText";
import { CardTextStyles } from "./types/CardTextStyle";

export interface CardDescription extends CardCustomText {}

export const DEFAULT_CARD_DESCRIPTION: CardDescription = {
  text: "",
  fontSize: 16,
  color: "#ffffff",
  maxLength: 50,
  type: "text",
  fontFamily: CardFontFamilies.IOWAN_OLD_STYLE,
  fontWeight: CardFontWeights.NORMAL,
  textAlign: CardTextAligns.LEFT,
  textStyle: CardTextStyles.NORMAL
};