import { CardFontFamilies } from "./types/CardFontFamily";
import { CardFontWeights } from "./types/CardFontWeight";
import { CardCustomText } from "./CustomText";
import { CardTextAligns } from "./types/CardTextAlign";
import { CardTextStyles } from "./types/CardTextStyle";

export interface CardSource extends CardCustomText {}

export const DEFAULT_CARD_SOURCE: CardSource = {
  text: "",
  fontSize: 16,
  color: "#ffffff",
  maxLength: 50,
  type: "text",
  fontFamily: CardFontFamilies.IOWAN_OLD_STYLE,
  fontWeight: CardFontWeights.LIGHT,
  textAlign: CardTextAligns.CENTER,
  textStyle: CardTextStyles.NORMAL
};