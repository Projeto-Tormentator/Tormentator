import { AccentColor } from "@/config/colors";
import { CARD_SIZES, CardSize } from "./core/CardSize";
import { CARD_TYPES, CardType } from "./core/CardType";
import { CardCustomText } from "./fields/CustomText";
import { DEFAULT_CARD_TITLE } from "./fields/CardTitle";
import { DEFAULT_CARD_DESCRIPTION } from "./fields/CardDescription";
import { DEFAULT_CARD_SOURCE } from "./fields/CardSource";

export interface BaseCardData {
  type: CardType;
  size: CardSize;
  backgroundColor: string;
  withPaperTexture?: boolean;
  withBack?: boolean;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  title: CardCustomText;
  description: CardCustomText;
  source: CardCustomText;
}

export abstract class BaseCard implements BaseCardData {
  type!: CardType;
  size!: CardSize;
  backgroundColor!: string;
  withPaperTexture?: boolean;
  withBack?: boolean;
  borderColor!: string;
  borderWidth!: number;
  borderRadius!: number;
  title!: CardCustomText;
  description!: CardCustomText;
  source!: CardCustomText;

  static defaults: BaseCardData = {
    type: CARD_TYPES.SKILL,
    size: CARD_SIZES.NORMAL,
    backgroundColor: "#ffffff",
    withPaperTexture: true,
    withBack: false,
    borderColor: "#000000",
    borderWidth: 8,
    borderRadius: 8,
    title: DEFAULT_CARD_TITLE,
    description: DEFAULT_CARD_DESCRIPTION,
    source: DEFAULT_CARD_SOURCE
  };

  constructor(data: Partial<BaseCardData> = {}) {
    const init = { ...BaseCard.defaults, ...data } as BaseCardData;
    
    init.title = { ...BaseCard.defaults.title, ...data.title };
    init.description = { ...BaseCard.defaults.description, ...data.description };
    init.source = { ...BaseCard.defaults.source, ...data.source };
    
    if (init.title.maxLength) {
      init.title.text = init.title.text.slice(0, init.title.maxLength[init.size]);
    }
    if (init.description.maxLength) {
      init.description.text = init.description.text.slice(0, init.description.maxLength[init.size]);
    }
    if (init.source.maxLength) {
      init.source.text = init.source.text.slice(0, init.source.maxLength[init.size]);
    }
    
    Object.assign(this, init);
  }
  
  getDefaults(): BaseCardData {
    return { ...BaseCard.defaults };
  }

  export(): BaseCardData {
    return {
      type: this.type,
      size: this.size,
      backgroundColor: this.backgroundColor,
      withPaperTexture: this.withPaperTexture,
      withBack: this.withBack,
      borderColor: this.borderColor,
      borderWidth: this.borderWidth,
      borderRadius: this.borderRadius,
      title: {
        text: this.title.text,
        fontSize: this.title.fontSize,
        color: this.title.color,
        fontFamily: this.title.fontFamily,
        fontWeight: this.title.fontWeight,
        textAlign: this.title.textAlign,
        textStyle: this.title.textStyle
      },
      description: {
        text: this.description.text,
        fontSize: this.description.fontSize,
        color: this.description.color,
        fontFamily: this.description.fontFamily,
        fontWeight: this.description.fontWeight,
        textAlign: this.description.textAlign,
        textStyle: this.description.textStyle
      },
      source: {
        text: this.source.text,
        fontSize: this.source.fontSize,
        color: this.source.color,
        fontFamily: this.source.fontFamily,
        fontWeight: this.source.fontWeight,
        textAlign: this.source.textAlign,
        textStyle: this.source.textStyle
      }
    };
  }
}

export interface CardCustomField {
  field: string;
  label: string;
  placeholder?: string;
  defaultValues?: unknown;
  type?: string;
}

export interface BaseCardConfig {
  type: CardType;
  availableSizes: CardSize[];
  defaultSize: CardSize;
  uiLabel: string;
  uiIcon: React.ElementType;
  uiDescription: string;
  uiAccent: AccentColor;

  isAvailable: boolean;
  isNew: boolean;
  isBeta: boolean;

  isComingSoon: boolean;

  isFuture: boolean;

  isHidden: boolean;

  customFields?: CardCustomField[];
}