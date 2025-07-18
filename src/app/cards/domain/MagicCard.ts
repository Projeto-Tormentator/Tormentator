import { Flame } from "lucide-react";
import { BaseCard, BaseCardConfig, BaseCardData } from "./BaseCard";
import { CARD_SIZES } from "./core/CardSize";
import { CARD_TYPES } from "./core/CardType";
import { CardCustomText } from "./fields/CustomText";
import { CardFontFamilies } from "./fields/CardFontFamily";
import { deepMerge } from "@/lib/utils";

export interface MagicCardData extends BaseCardData {
  origin: CardCustomText; //Magic origin, e.g., "Poderes de Paladino"
}

export class MagicCard extends BaseCard implements MagicCardData {
  static defaults: MagicCardData = {
    type: CARD_TYPES.MAGIC,
    size: CARD_SIZES.NORMAL,
    origin: {
      text: "",
      fontSize: 12,
      color: "#888888",
      maxLength: 100,
      type: "text",
      fontFamily: CardFontFamilies.SOURCESANS_PRO
    }
  } as MagicCardData;

  origin: CardCustomText;

  constructor(data: Partial<MagicCardData> = {}) {
    const full = deepMerge({ ...MagicCard.defaults }, data) as MagicCardData;
    super(full);
    this.origin = full.origin;
  }

  getDefaults(): MagicCardData {
    return { ...MagicCard.defaults };
  }
}


export const MagicCardConfig: BaseCardConfig = {
  type: CARD_TYPES.MAGIC,
  availableSizes: [CARD_SIZES.NORMAL, CARD_SIZES.TAROT],
  defaultSize: CARD_SIZES.NORMAL,
  uiLabel: "Magia",
  uiIcon: Flame,
  uiDescription: "Magias",
  uiAccent: "purple",

  isAvailable: true,
  isNew: false,
  isBeta: false,

  isComingSoon: false,

  isFuture: true,

  isHidden: false,
};