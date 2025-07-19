import { AccentColor } from "@/config/colors";
import { CARD_SIZES, CardSize } from "./core/CardSize";
import { CARD_TYPES, CardType } from "./core/CardType";
import { CardCustomText } from "./fields/CustomText";
import { DEFAULT_CARD_TITLE } from "./fields/CardTitle";
import { DEFAULT_CARD_DESCRIPTION } from "./fields/CardDescription";
import { DEFAULT_CARD_SOURCE } from "./fields/CardSource";

export interface BaseCardData {
  type: CardType;
  size: CardSize;
  backgroundColor: string;
  withPaperTexture?: boolean;
  withBack?: boolean;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  title: CardCustomText;
  description: CardCustomText;
  source: CardCustomText;
}

export abstract class BaseCard implements BaseCardData {
  type!: CardType;
  size!: CardSize;
  backgroundColor!: string;
  withPaperTexture?: boolean;
  withBack?: boolean;
  borderColor!: string;
  borderWidth!: number;
  borderRadius!: number;
  title!: CardCustomText;
  description!: CardCustomText;
  source!: CardCustomText;

  static defaults: BaseCardData = {
    type: CARD_TYPES.SKILL,
    size: CARD_SIZES.NORMAL,
    backgroundColor: "#ffffff",
    withPaperTexture: true,
    withBack: false,
    borderColor: "#000000",
    borderWidth: 8,
    borderRadius: 8,
    title: DEFAULT_CARD_TITLE,
    description: DEFAULT_CARD_DESCRIPTION,
    source: DEFAULT_CARD_SOURCE
  };

  constructor(data: Partial<BaseCardData> = {}) {
    const init = { ...BaseCard.defaults, ...data } as BaseCardData;
    Object.assign(this, init);
  }
  
  getDefaults(): BaseCardData {
    return { ...BaseCard.defaults };
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

  customFields?: {
    field: string;
    label: string;
    placeholder?: string;
    defaultValues?: unknown;
    type?: string;
  }[];
}