import { Flame } from "lucide-react";
import { BaseCard, BaseCardConfig, BaseCardData } from "./BaseCard";
import { CARD_SIZES } from "./core/CardSize";
import { CARD_TYPES } from "./core/CardType";
import { CardCustomText } from "./fields/CustomText";
import { CardFontFamilies } from "./fields/types/CardFontFamily";
import { deepMergeCards } from "@/lib/utils";

export interface MagicCardData extends BaseCardData {
  origin: CardCustomText; //Magic origin, e.g., "Poderes de Paladino"
}

export class MagicCard extends BaseCard implements MagicCardData {
  static customDefaults: MagicCardData = {
    type: CARD_TYPES.MAGIC,
    size: CARD_SIZES.NORMAL,
    origin: {
      text: "",
      fontSize: 12,
      color: "#888888",
      maxLength: {
        [CARD_SIZES.NORMAL]: 100,
        [CARD_SIZES.TAROT]: 150
      },
      type: "text",
      fontFamily: CardFontFamilies.SOURCESANS_PRO
    }
  } as MagicCardData;

  defaults: MagicCardData | undefined;

  origin: CardCustomText;

  constructor(data: Partial<MagicCardData> = {}) {
    const full = deepMergeCards({ ...MagicCard.customDefaults }, data) as MagicCardData;
    super(full);
    this.origin = full.origin;
    this.defaults = deepMergeCards({ ...BaseCard.defaults }, { ...MagicCard.customDefaults }) as MagicCardData;
  }

  getDefaults(): MagicCardData {
    return this.defaults || MagicCard.customDefaults;
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

  isAvailable: false,
  isNew: false,
  isBeta: false,

  isComingSoon: false,

  isFuture: true,

  isHidden: false,

  customFields: [
    {
      field: "origin",
      label: "Origem",
      placeholder: "Digite a origem da magia",
      defaultValues: MagicCard.customDefaults.origin,
      type: "CardCustomText"
    }
  ]
};