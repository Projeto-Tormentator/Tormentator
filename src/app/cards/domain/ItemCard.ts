import { Sword } from "lucide-react";
import { BaseCard, BaseCardConfig, BaseCardData } from "./BaseCard";
import { CARD_SIZES } from "./core/CardSize";
import { CARD_TYPES } from "./core/CardType";
import { CardCustomText } from "./fields/CustomText";

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
    title: { text: "", fontSize: 16, color: "#000000" },
    description: { text: "", fontSize: 14, color: "#333333" },
    source: { text: "", fontSize: 12, color: "#666666" },
    origin: { text: "", fontSize: 12, color: "#888888" }
  };

  origin: CardCustomText;

  constructor(data: Partial<ItemCardData> = {}) {
    const full = { ...ItemCard.defaults, ...data } as ItemCardData;
    super(full);
    this.origin = full.origin;
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

  isAvailable: false,
  isNew: false,
  isBeta: false,

  isComingSoon: false,

  isFuture: true,

  isHidden: false,
};