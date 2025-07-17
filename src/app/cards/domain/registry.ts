import { ItemCard, ItemCardConfig } from "./ItemCard";
import { MagicCard, MagicCardConfig } from "./MagicCard";
import { PowerCard, PowerCardConfig } from "./PowerCard";
import { SkillCard, SkillCardConfig } from "./SkillCard";

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

export type CardConfigs = typeof SkillCardConfig | typeof PowerCardConfig | typeof MagicCardConfig | typeof ItemCardConfig;
