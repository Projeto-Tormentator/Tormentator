import { Sword } from "lucide-react";
import { BaseCard, BaseCardConfig, BaseCardData } from "./BaseCard";
import { CARD_SIZES } from "./core/CardSize";
import { CARD_TYPES } from "./core/CardType";
import { CardCustomText } from "./fields/CustomText";
import { CardFontFamilies } from "./fields/types/CardFontFamily";
import { deepMergeCards } from "@/lib/utils";

export interface ItemCardData extends BaseCardData {
  origin: CardCustomText; //Item origin, e.g., "Poderes de Paladino"
}

export class ItemCard extends BaseCard implements ItemCardData {
  static cutomDefaults: ItemCardData = {
    type: CARD_TYPES.ITEM,
    size: CARD_SIZES.NORMAL,
    origin: {
      text: "",
      fontSize: 12,
      color: "#888888",
      maxLength: {
        [CARD_SIZES.NORMAL]: 100,
        [CARD_SIZES.TAROT]: 150,
      },
      type: "text",
      fontFamily: CardFontFamilies.SOURCESANS_PRO
    },
  } as ItemCardData;

  defaults: ItemCardData | undefined;

  origin: CardCustomText;

  constructor(data: Partial<ItemCardData> = {}) {
    const full = deepMergeCards({...ItemCard.cutomDefaults}, data) as ItemCardData;
    super(full);
    this.origin = full.origin;
    this.defaults = deepMergeCards({ ...BaseCard.defaults }, { ...ItemCard.cutomDefaults }) as ItemCardData;
  }

  getDefaults(): ItemCardData {
    return this.defaults || ItemCard.cutomDefaults;
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
  
  customFields: [
    {
      field: "origin",
      label: "Origem",
      placeholder: "Digite a origem do item",
      defaultValues: ItemCard.cutomDefaults.origin,
      type: "CardCustomText"
    }
  ]
};