import { CARD_TYPES } from "../core/CardType";
import { CARD_SIZES } from "../core/CardSize";
import { CardFontFamilies } from "../fields/types/CardFontFamily";
import { CardFontWeights } from "../fields/types/CardFontWeight";
import { CardTextAligns } from "../fields/types/CardTextAlign";
import { CardTextStyles } from "../fields/types/CardTextStyle";
import { SkillCard } from "../SkillCard";
import { PowerCard } from "../PowerCard";

export const EXAMPLE_CARDS = [
  new SkillCard({
    type: CARD_TYPES.SKILL,
    size: CARD_SIZES.NORMAL,
    withBack: true,
    withPaperTexture: true,
    borderColor: "#8B5CF6",
    title: {
      text: "Ataque Furtivo",
    },
    description: {
      text: "Quando você ataca um inimi-go que não pode vê-lo ou que está sendo flanqueado, cause +1d6 de dano adicional.",
    },
    source: {
      text: "Tormenta 20 - Livro Básico",
    },
    origin: {
      text: "Habilidade de Ladino",
    }
  }),
];
