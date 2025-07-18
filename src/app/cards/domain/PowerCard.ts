import { Sparkle } from "lucide-react";
import { BaseCard, BaseCardConfig, BaseCardData } from "./BaseCard";
import { CARD_SIZES } from "./core/CardSize";
import { CARD_TYPES } from "./core/CardType";
import { CardCustomText } from "./fields/CustomText";
import { CardFontFamilies, CardFontFamily } from "./fields/types/CardFontFamily";
import { deepMerge } from "@/lib/utils";

export interface PowerCardData extends BaseCardData {
  origin: CardCustomText; //Power origin, e.g., "Poderes de Paladino"
}

export class PowerCard extends BaseCard implements PowerCardData {
  static customDefaults: PowerCardData = {
    type: CARD_TYPES.POWER,
    size: CARD_SIZES.NORMAL,
    origin: {
      text: "",
      fontSize: 12,
      color: "#888888",
      maxLength: 100,
      type: "text",
      fontFamily: CardFontFamilies.SOURCESANS_PRO
    }
  } as PowerCardData;

  defaults: PowerCardData | undefined;

  origin: CardCustomText;

  constructor(data: Partial<PowerCardData> = {}) {
    const full = deepMerge({ ...PowerCard.customDefaults }, data) as PowerCardData;
    super(full);
    this.origin = full.origin;
    this.defaults = deepMerge({ ...BaseCard.defaults }, { ...PowerCard.customDefaults }) as PowerCardData;
  }

  getDefaults(): PowerCardData {
    return this.defaults || PowerCard.customDefaults;
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