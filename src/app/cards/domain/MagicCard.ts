import { Flame } from "lucide-react";
import { BaseCard, BaseCardConfig, BaseCardData } from "./BaseCard";
import { CARD_SIZES } from "./core/CardSize";
import { CARD_TYPES } from "./core/CardType";
import { CardCustomText } from "./fields/CustomText";
import { CardFontFamilies } from "./fields/CardFontFamily";

export interface MagicCardData extends BaseCardData {
  origin: CardCustomText; //Magic origin, e.g., "Poderes de Paladino"
}

export class MagicCard extends BaseCard implements MagicCardData {
  static defaults: MagicCardData = {
    type: CARD_TYPES.MAGIC,
    size: CARD_SIZES.NORMAL,
    backgroundColor: "#f0f0f0",
    borderColor: "#cccccc",
    borderWidth: 1,
    title: {
      text: "",
      fontSize: 16,
      color: "#ffffff",
      maxLength: 50,
      type: "text",
      fontFamily: CardFontFamilies.TORMENTA_20
    },
    description: {
      text: "",
      fontSize: 14,
      color: "#333333",
      maxLength: 500,
      type: "textarea",
      fontFamily: CardFontFamilies.IOWAN_OLD_STYLE
    },
    source: {
      text: "",
      fontSize: 12,
      color: "#666666",
      maxLength: 100,
      type: "text",
      fontFamily: CardFontFamilies.IOWAN_OLD_STYLE
    },
    origin: {
      text: "",
      fontSize: 12,
      color: "#888888",
      maxLength: 100,
      type: "text",
      fontFamily: CardFontFamilies.SOURCESANS_PRO
    }
  };

  origin: CardCustomText;

  constructor(data: Partial<MagicCardData> = {}) {
    const full = { ...MagicCard.defaults, ...data } as MagicCardData;
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