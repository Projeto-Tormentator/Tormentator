import { CARD_TYPES } from "../core/CardType";
import { CARD_SIZES } from "../core/CardSize";
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
      text: "Ossos Frágeis",
    },
    description: {
      text: `Você sofre 1 ponto de dano a-dicional por dado de dano de impacto.
      
Por exemplo, se for atingido por uma clava (1d6) sofre 1d6 + 1 pontos de dano. Se cair de 3m de altura (dano 2d6), sofre 2d6 + 2 pontos de dano.`,
    },
    source: {
      text: "Tormenta 20 JDA - Pg.: 28",
    },
    origin: {
      text: "Habilidade de Kliren",
    }
  }),
  new SkillCard({
    type: CARD_TYPES.SKILL,
    size: CARD_SIZES.TAROT,
    withBack: true,
    withPaperTexture: true,
    borderColor: "#4d7c0f",
    title: {
      text: "Mau Cheiro",
    },
    description: {
      text: `Você pode gastar uma ação pa-drão e 2pm para expelir um gás fétido. 
  
Todas as criaturas (exceto trogs) em alcance curto devem passar em um teste de Fortitude contra veneno (CD Con) ou ficarão en-joadas durante 1d6 rodadas.
  
Uma criatura que passe no teste de resistência fica imune a essa habilidade por um dia.`,
    },
    source: {
      text: "Tormenta 20 JDA - Pg.: 31",
    },
    origin: {
      text: "Habilidade de Trog",
    }
  }),
  new PowerCard({
    type: CARD_TYPES.POWER,
    size: CARD_SIZES.NORMAL,
    withBack: true,
    withPaperTexture: true,
    borderColor: "#f97316",
    title: {
      text: "Esgrima Mágica",
    },
    description: {
      text: `Sua arte mescla esgrima e magia, transformando dança em golpes.

Se estiver sob o efeito de Ins-piração, você pode substituir testes de luta por testes de A-tuação, mas apenas para ata-ques com armas corpo a cor-po leves ou de uma mão.`,
    },
    source: {
      text: "Tormenta 20 JDA - Pg.: 44",
    },
    origin: {
      text: "Poderes de Bardo",
    }
  }),
  new PowerCard({
    type: CARD_TYPES.POWER,
    size: CARD_SIZES.TAROT,
    withBack: true,
    withPaperTexture: true,
    borderColor: "#60a5fa",
    title: {
      text: "Pesquisa Abençoada",
    },
    description: {
      text: `Se passar uma hora pesquisando seus livros e anotações, você po-de rolar novamente um teste de perícia baseada em Inteligência ou Sabedoria que tenha feito des-de a última cena.
      
Se tiver acesso a mais livros, você recebe um bônus no teste:

  +2 para uma coleção particular ou biblioteca pequena

  +5 para a biblioteca de um tem-plo ou universidade.`,
    },
    source: {
      text: "Tormenta 20 JDA - Pg.: 134",
    },
    origin: {
      text: "Poder Cocedido | Tanna-Toh",
    }
  }),
];
