import { Dna } from "lucide-react";
import { BaseCard, BaseCardConfig, BaseCardData } from "./BaseCard";
import { CARD_SIZES } from "./core/CardSize";
import { CARD_TYPES } from "./core/CardType";
import { CardCustomText } from "./fields/CustomText";
import { CardFontFamilies } from "./fields/types/CardFontFamily";
import { deepMerge } from "@/lib/utils";

export interface SkillCardData extends BaseCardData {
  origin: CardCustomText; //Skill origin, e.g., "Habilidades de Goblin"
}

export class SkillCard extends BaseCard implements SkillCardData {
  static customDefaults: SkillCardData = {
    type: CARD_TYPES.SKILL,
    size: CARD_SIZES.NORMAL,
    origin: {
      text: "",
      fontSize: 12,
      color: "#888888",
      maxLength: 50,
      type: "text",
      fontFamily: CardFontFamilies.SOURCESANS_PRO
    }
  } as SkillCardData;

  defaults: SkillCardData | undefined;

  origin: CardCustomText;

  constructor(data: Partial<SkillCardData> = {}) {
    const full = deepMerge({ ...SkillCard.customDefaults }, data) as SkillCardData;
    super(full);
    this.origin = full.origin;
    this.defaults = deepMerge({...BaseCard.defaults}, {...SkillCard.customDefaults}) as SkillCardData;
  }

  getDefaults(): SkillCardData {
    return this.defaults || SkillCard.customDefaults;
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
  isNew: false,
  isBeta: false,

  isComingSoon: true,

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