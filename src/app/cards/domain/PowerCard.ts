import { Sparkle } from "lucide-react";
import { BaseCard, BaseCardConfig, BaseCardData } from "./BaseCard";
import { CARD_SIZES } from "./core/CardSize";
import { CARD_TYPES } from "./core/CardType";
import { CardCustomText } from "./fields/CustomText";
import { CardFontFamilies, CardFontFamily } from "./fields/CardFontFamily";

export interface PowerCardData extends BaseCardData {
  origin: CardCustomText; //Power origin, e.g., "Poderes de Paladino"
}

export class PowerCard extends BaseCard implements PowerCardData {
  static defaults: PowerCardData = {
    type: CARD_TYPES.POWER,
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

  constructor(data: Partial<PowerCardData> = {}) {
    const full = { ...PowerCard.defaults, ...data } as PowerCardData;
    super(full);
    this.origin = full.origin;
  }

  getDefaults(): PowerCardData {
    return { ...PowerCard.defaults };
  }
}


export const PowerCardConfig: BaseCardConfig = {
  type: CARD_TYPES.POWER,
  availableSizes: [CARD_SIZES.NORMAL, CARD_SIZES.TAROT],
  defaultSize: CARD_SIZES.NORMAL,
  uiLabel: "Poder",
  uiIcon: Sparkle,
  uiDescription: "Poderes de Classe, Concedidos, Combate, etc.",
  uiAccent: "red",

  isAvailable: true,
  isNew: false,
  isBeta: false,

  isComingSoon: true,

  isFuture: false,

  isHidden: false,
};