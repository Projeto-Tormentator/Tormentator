import { ItemCard, ItemCardConfig, ItemCardData } from "./ItemCard";
import { MagicCard, MagicCardConfig, MagicCardData } from "./MagicCard";
import { PowerCard, PowerCardConfig, PowerCardData } from "./PowerCard";
import { SkillCard, SkillCardConfig, SkillCardData } from "./SkillCard";

export const CardRegistry = {
  SKILL: {
    cardClass: SkillCard,
    config: SkillCardConfig
  },
  POWER: {
    cardClass: PowerCard,
    config: PowerCardConfig
  },
  MAGIC: {
    cardClass: MagicCard,
    config: MagicCardConfig
  },
  ITEM: {
    cardClass: ItemCard,
    config: ItemCardConfig
  }
} as const;

export type CardClasses = SkillCard | PowerCard | MagicCard | ItemCard;

export type CardInterfaces = SkillCardData | PowerCardData | MagicCardData | ItemCardData;

export type CardConfigs = typeof SkillCardConfig | typeof PowerCardConfig | typeof MagicCardConfig | typeof ItemCardConfig;
