import { AccentColor } from "@/config/colors";
import { CARD_SIZES, CardSize } from "./core/CardSize";
import { CARD_TYPES, CardType } from "./core/CardType";
import { CardCustomText } from "./fields/CustomText";

export interface BaseCardData {
  type: CardType;
  size: CardSize;
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  title: CardCustomText;
  description: CardCustomText;
  source: CardCustomText;
}

export abstract class BaseCard implements BaseCardData {
  type!: CardType;
  size!: CardSize;
  backgroundColor!: string;
  borderColor!: string;
  borderWidth!: number;
  title!: CardCustomText;
  description!: CardCustomText;
  source!: CardCustomText;

  static defaults: BaseCardData = {
    type: CARD_TYPES.SKILL,
    size: CARD_SIZES.NORMAL,
    backgroundColor: "#ffffff",
    borderColor: "#000000",
    borderWidth: 1,
    title: { text: "", fontSize: 16, color: "#000000" },
    description: { text: "", fontSize: 14, color: "#333333" },
    source: { text: "", fontSize: 12, color: "#666666" }
  };

  constructor(data: Partial<BaseCardData> = {}) {
    const init = { ...BaseCard.defaults, ...data } as BaseCardData;
    Object.assign(this, init);
  } 
}

export interface BaseCardConfig {
  type: CardType;
  availableSizes: CardSize[];
  defaultSize: CardSize;
  uiLabel: string;
  uiIcon: React.ElementType;
  uiDescription: string;
  uiAccent: AccentColor;

  isAvailable: boolean;
  isNew: boolean;
  isBeta: boolean;

  isComingSoon: boolean;

  isFuture: boolean;

  isHidden: boolean;
}