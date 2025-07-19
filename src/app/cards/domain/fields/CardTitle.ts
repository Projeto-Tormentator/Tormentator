import { CardFontFamilies } from "./types/CardFontFamily";
import { CardFontWeights } from "./types/CardFontWeight";
import { CardCustomText } from "./CustomText";
import { CardTextAligns } from "./types/CardTextAlign";
import { CardTextStyles } from "./types/CardTextStyle";

//export interface CardTitle extends CardCustomText {}

export const DEFAULT_CARD_TITLE: CardCustomText = {
  text: "",
  fontSize: 20,
  color: "#ffffff",
  maxLength: 50,
  type: "text",
  fontFamily: CardFontFamilies.TORMENTA_20,
  fontWeight: CardFontWeights.NORMAL,
  textAlign: CardTextAligns.CENTER,
  textStyle: CardTextStyles.NORMAL
};