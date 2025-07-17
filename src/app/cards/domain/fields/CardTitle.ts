import { CardCustomText } from "./CustomText";

export interface CardTitle extends CardCustomText {}

export const DEFAULT_CARD_TITLE: CardTitle = {
  text: "",
  fontSize: 16,
  color: "#ffffff",
  maxLength: 50,
  type: "text"
};