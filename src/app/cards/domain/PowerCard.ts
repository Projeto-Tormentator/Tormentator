import { Sparkle } from "lucide-react";
import { BaseCard, BaseCardConfig, BaseCardData } from "./BaseCard";
import { CARD_SIZES } from "./core/CardSize";
import { CARD_TYPES } from "./core/CardType";
import { CardCustomText } from "./fields/CustomText";
import { CardFontFamilies } from "./fields/types/CardFontFamily";
import { deepMergeCards } from "@/lib/utils";

export interface PowerCardData extends BaseCardData {
  origin: CardCustomText; //Power origin, e.g., "Poderes de Paladino"
}

export class PowerCard extends BaseCard implements PowerCardData {
  static customDefaults: PowerCardData = {
    type: CARD_TYPES.POWER,
    size: CARD_SIZES.NORMAL,
    borderColor: "#f97316",
    origin: {
      text: "",
      fontSize: 12,
      color: "#000000",
      maxLength: {
        [CARD_SIZES.NORMAL]: 35,
        [CARD_SIZES.TAROT]: 40
      },
      type: "text",
      fontFamily: CardFontFamilies.SOURCESANS_PRO
    }
  } as PowerCardData;

  defaults: PowerCardData | undefined;

  origin: CardCustomText;

  constructor(data: Partial<PowerCardData> = {}) {
    const full = deepMergeCards({ ...PowerCard.customDefaults }, data) as PowerCardData;
    super(full);
    this.origin = full.origin;
    this.origin.text = this.origin.text.slice(0, this.origin.maxLength![this.size]);
    this.defaults = deepMergeCards({ ...BaseCard.defaults }, { ...PowerCard.customDefaults }) as PowerCardData;
  }

  getDefaults(): PowerCardData {
    return this.defaults || PowerCard.customDefaults;
  }

  export(): PowerCardData {
    return {
      ...super.export(),
      origin: {
        text: this.origin.text,
        fontSize: this.origin.fontSize,
        color: this.origin.color,
        fontFamily: this.origin.fontFamily,
        fontWeight: this.origin.fontWeight,
        textAlign: this.origin.textAlign,
        textStyle: this.origin.textStyle
      }
    };
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
  isNew: true,
  isBeta: true,

  isComingSoon: false,

  isFuture: false,

  isHidden: false,
  
  customFields: [
    {
      field: "origin",
      label: "Origem",
      placeholder: "Digite a origem da habilidade",
      defaultValues: PowerCard.customDefaults.origin,
      type: "CardCustomText"
    }
  ]
};