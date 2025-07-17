export type CardType = 
  "SKILL"
  | "POWER"
  | "MAGIC"
  | "ITEM";


export const CARD_TYPES: Record<CardType, CardType> = {
  SKILL: "SKILL",
  POWER: "POWER",
  MAGIC: "MAGIC",
  ITEM: "ITEM"
};

export interface CardTypeData {
  name: string;
  description: string;
  icon: string;
}
