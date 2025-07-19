import { CardFontFamilies } from "./types/CardFontFamily";
import { CardFontWeights } from "./types/CardFontWeight";
import { CardCustomText } from "./CustomText";
import { CardTextAligns } from "./types/CardTextAlign";
import { CardTextStyles } from "./types/CardTextStyle";

//export interface CardTitle extends CardCustomText {}

export const DEFAULT_CARD_TITLE: CardCustomText = {
  text: "",
  fontSize: 16,
  color: "#ffffff",
  maxLength: 50,
  type: "text",
  fontFamily: CardFontFamilies.TORMENTA_20,
  fontWeight: CardFontWeights.BOLD,
  textAlign: CardTextAligns.CENTER,
  textStyle: CardTextStyles.NORMAL
};