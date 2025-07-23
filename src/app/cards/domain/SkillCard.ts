import { Dna } from "lucide-react";
import { BaseCard, BaseCardConfig, BaseCardData } from "./BaseCard";
import { CARD_SIZES } from "./core/CardSize";
import { CARD_TYPES } from "./core/CardType";
import { CardCustomText } from "./fields/CustomText";
import { CardFontFamilies } from "./fields/types/CardFontFamily";
import { deepMergeCards } from "@/lib/utils";
import { CardTextStyles } from "./fields/types/CardTextStyle";
import { CardTextAligns } from "./fields/types/CardTextAlign";

export interface SkillCardData extends BaseCardData {
  origin: CardCustomText; //Skill origin, e.g., "Habilidades de Goblin"
}

export class SkillCard extends BaseCard implements SkillCardData {
  static customDefaults: SkillCardData = {
    type: CARD_TYPES.SKILL,
    size: CARD_SIZES.NORMAL,
    borderColor: "#3b82f6",
    origin: {
      text: "",
      fontSize: 12,
      color: "#000000",
      maxLength: {
        [CARD_SIZES.NORMAL]: 35,
        [CARD_SIZES.TAROT]: 40
      },
      type: "text",
      fontFamily: CardFontFamilies.IOWAN_OLD_STYLE,
      textStyle: CardTextStyles.ITALIC,
      textAlign: CardTextAligns.CENTER,
    }
  } as SkillCardData;

  defaults: SkillCardData | undefined;

  origin: CardCustomText;

  constructor(data: Partial<SkillCardData> = {}) {
    const full = deepMergeCards({ ...SkillCard.customDefaults }, data) as SkillCardData;
    super(full);
    this.origin = full.origin;
    this.origin.text = this.origin.text.slice(0, this.origin.maxLength![this.size]);
    this.defaults = deepMergeCards({...BaseCard.defaults}, {...SkillCard.customDefaults}) as SkillCardData;
  }

  getDefaults(): SkillCardData {
    return this.defaults || SkillCard.customDefaults;
  }

  export(): SkillCardData {
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


export const SkillCardConfig: BaseCardConfig = {
  type: CARD_TYPES.SKILL,
  availableSizes: [CARD_SIZES.NORMAL, CARD_SIZES.TAROT],
  defaultSize: CARD_SIZES.NORMAL,
  uiLabel: "Habilidade",
  uiIcon: Dna,
  uiDescription: "Habilidades de Raça, Classe, Origem, etc.",
  uiAccent: "blue",

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
      defaultValues: SkillCard.customDefaults.origin,
      type: "CardCustomText"
    }
  ]
};