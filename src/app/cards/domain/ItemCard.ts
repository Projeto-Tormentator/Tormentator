import { Sword } from "lucide-react";
import { BaseCard, BaseCardConfig, BaseCardData } from "./BaseCard";
import { CARD_SIZES } from "./core/CardSize";
import { CARD_TYPES } from "./core/CardType";
import { CardCustomText } from "./fields/CustomText";
import { CardFontFamilies } from "./fields/CardFontFamily";

export interface ItemCardData extends BaseCardData {
  origin: CardCustomText; //Item origin, e.g., "Poderes de Paladino"
}

export class ItemCard extends BaseCard implements ItemCardData {
  static defaults: ItemCardData = {
    type: CARD_TYPES.ITEM,
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

  constructor(data: Partial<ItemCardData> = {}) {
    const full = { ...ItemCard.defaults, ...data } as ItemCardData;
    super(full);
    this.origin = full.origin;
  }

  getDefaults(): ItemCardData {
    return { ...ItemCard.defaults };
  }
}


export const ItemCardConfig: BaseCardConfig = {
  type: CARD_TYPES.ITEM,
  availableSizes: [CARD_SIZES.NORMAL, CARD_SIZES.TAROT],
  defaultSize: CARD_SIZES.NORMAL,
  uiLabel: "Item",
  uiIcon: Sword,
  uiDescription: "Itens, Equipamentos, Artefatos, etc.",
  uiAccent: "yellow",

  isAvailable: true,
  isNew: false,
  isBeta: false,

  isComingSoon: false,

  isFuture: true,

  isHidden: false,
};