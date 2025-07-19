import { CardFontFamilies } from "./types/CardFontFamily";
import { CardFontWeights } from "./types/CardFontWeight";
import { CardCustomText } from "./CustomText";
import { CardTextAligns } from "./types/CardTextAlign";
import { CardTextStyles } from "./types/CardTextStyle";

//export interface CardSource extends CardCustomText {}

export const DEFAULT_CARD_SOURCE: CardCustomText = {
  text: "",
  fontSize: 10,
  color: "#000000",
  maxLength: 25,
  type: "text",
  fontFamily: CardFontFamilies.IOWAN_OLD_STYLE,
  fontWeight: CardFontWeights.NORMAL,
  textAlign: CardTextAligns.LEFT,
  textStyle: CardTextStyles.NORMAL
};