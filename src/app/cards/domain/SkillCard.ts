import { Dna } from "lucide-react";
import { BaseCard, BaseCardConfig, BaseCardData } from "./BaseCard";
import { CARD_SIZES } from "./core/CardSize";
import { CARD_TYPES } from "./core/CardType";
import { CardCustomText } from "./fields/CustomText";
import { CardFontFamilies } from "./fields/CardFontFamily";

export interface SkillCardData extends BaseCardData {
  origin: CardCustomText; //Skill origin, e.g., "Habilidades de Goblin"
}

export class SkillCard extends BaseCard implements SkillCardData {
  static defaults: SkillCardData = {
    type: CARD_TYPES.SKILL,
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

  constructor(data: Partial<SkillCardData> = {}) {
    const full = { ...SkillCard.defaults, ...data } as SkillCardData;
    super(full);
    this.origin = full.origin;
  }

  getDefaults(): SkillCardData {
    return { ...SkillCard.defaults };
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
};