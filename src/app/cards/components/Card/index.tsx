import { useState } from "react";
import { CARD_SIZE_DATA } from "../../domain/core/CardSize";
import { CARD_TYPES } from "../../domain/core/CardType";
import { CardFontFamilies, CardFontFamiliesConfig } from "../../domain/fields/types/CardFontFamily";
import { CardFontWeights, CardFontWeightsConfig } from "../../domain/fields/types/CardFontWeight";
import { CardTextAligns, CardTextAlignsConfig } from "../../domain/fields/types/CardTextAlign";
import { CardTextStyles, CardTextStylesConfig } from "../../domain/fields/types/CardTextStyle";
import { CardClasses } from "../../domain/registry";
import Image from "next/image";
import { Pen, RefreshCcw, Trash } from "lucide-react";

export interface CardProps {
  card: CardClasses;
  isPrintMode?: boolean;
  index?: number;
  onEdit?: (card: CardClasses, index: number) => void;
  onDelete?: (index: number) => void;
}

export function Card({ card, isPrintMode = false, onEdit, onDelete, index }: CardProps) {

  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const mmToPx = 3.7795275591; // 1 mm = 3.7795275591 px

  const getCardSize = () => {
    const sizeData = CARD_SIZE_DATA[card.size];
    if (!sizeData) {
      throw new Error(`Invalid card size: ${card.size}`);
    }

    if( isPrintMode ) {
      return {
        width: sizeData.printDimensions.width * mmToPx,
        height: sizeData.printDimensions.height * mmToPx
      };
    }

    return sizeData.displayDimensions;

  }

  const getCardBackground = () => {
    if (isPrintMode && card.withPaperTexture) {
      return `url('/assets/images/paper-texture.png')`;
    } else if (isPrintMode) {
      return '#ffffff';
    } else {
      return '';
    }
  }

  const printCard = ()  => {
    switch (card.type) {
      case CARD_TYPES.SKILL:
        return (
          <>
            {card.origin && card.origin.text ? (
              <div
                className={`
                  ${!isPrintMode ? 'text-slate-700 dark:text-slate-200' : ''}
                `}
                style={{
                  width: "100%",
                  height: "fit-content",
                  fontSize: `${card.origin.fontSize}px`,
                  color: isPrintMode ? card.origin.color : '',
                  padding: card.borderWidth ? `${card.borderWidth / 2}px` : '0',
                  textAlign: CardTextAlignsConfig[card.origin.textAlign || CardTextAligns.CENTER].cssValue,
                  fontFamily: CardFontFamiliesConfig[card.origin.fontFamily! || CardFontFamilies.IOWAN_OLD_STYLE].cssValue,
                  fontStyle: CardTextStylesConfig[card.origin.textStyle! || CardTextStyles.ITALIC].cssValue,
                  overflow: 'hidden',
                  wordBreak: 'break-word',
                  textOverflow: 'ellipsis',
                  lineHeight: '1',
                  letterSpacing: '0.05em',
                }}
              >
                {card.origin.text || ""}
              </div>
            ) : null}
          </>
            
        )
        break;
      case CARD_TYPES.POWER:
        return (
          <>
            {card.origin && card.origin.text ? (
              <div
                className={`
                  ${!isPrintMode ? 'text-slate-700 dark:text-slate-200' : ''}
                `}
                style={{
                  width: "100%",
                  height: "fit-content",
                  fontSize: `${card.origin.fontSize}px`,
                  color: isPrintMode ? card.origin.color : '',
                  padding: card.borderWidth ? `${card.borderWidth / 2}px` : '0',
                  textAlign: CardTextAlignsConfig[card.origin.textAlign || CardTextAligns.CENTER].cssValue,
                  fontFamily: CardFontFamiliesConfig[card.origin.fontFamily! || CardFontFamilies.IOWAN_OLD_STYLE].cssValue,
                  fontStyle: CardTextStylesConfig[card.origin.textStyle! || CardTextStyles.ITALIC].cssValue,
                  overflow: 'hidden',
                  wordBreak: 'break-word',
                  textOverflow: 'ellipsis',
                  lineHeight: '1',
                  letterSpacing: '0.05em',
                }}
              >
                {card.origin.text || ""}
              </div>
            ) : null}
          </>
            
        )
        break;
    
      default:
        break;
    }
  }

  const renderPrintMode = () => {
    return (
      <div
        className={`${!isPrintMode ? 'bg-slate-200/30 dark:bg-slate-950/30' : ''}`}
        style={{
          width: `${getCardSize().width}px`,
          height: `${getCardSize().height}px`,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          perspective: '1000px',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      > 
        
        
        <div
          style={{
            width: "100%",
            zIndex: 10,
            position: 'absolute',
            top: 0,
            right: 0,
            padding: '8px',
            gap: '4px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
            transition: 'all 0.3s ease-in-out',
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(-8px)',
          }}
        >
          {onEdit && (
            <div className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 shadow-lg hover:shadow-xl rounded-full p-1.5 transition-all duration-300 hover:scale-110"
              onClick={() => onEdit(card, index!)}
              >
              <Pen className="w-4 h-4" />
            </div>
          )}
          {card.withBack && (
            <div className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 shadow-lg hover:shadow-xl rounded-full p-1.5 transition-all duration-300 hover:scale-110"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <RefreshCcw className="w-4 h-4" />
            </div>
          )}
          {onDelete && (
            <div className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-500 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 shadow-lg hover:shadow-xl rounded-full p-1.5 transition-all duration-300 hover:scale-110"
              onClick={() => onDelete(index!)}
            >
              <Trash className="w-4 h-4" />
            </div>
          )}
        </div>
        
        <div
          style={{
            width: getCardSize().width,
            height: getCardSize().height,
            alignItems: 'center',
            position: 'relative',
            transition: "transform 0.7s",
            transformStyle: 'preserve-3d',
            transform: card.withBack && isFlipped ? 'rotateY(180deg)' : 'none',
            borderColor: card.borderColor,
            backgroundColor: card.borderColor,
            borderWidth: `${card.borderWidth}px`,
            borderRadius: `${card.borderRadius}px`,
            borderStyle: 'solid',
          }}
        >
          <div
            style={{
              width: getCardSize().width - (card.borderWidth * 2),
              height: getCardSize().height - (card.borderWidth * 2),
              display: 'flex',
              backfaceVisibility: 'hidden',
              overflow: 'hidden',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              transition: "display 0.7s",
            }}
          >
            <div>
              <div
                style={{
                  width: "100%",
                  height: "fit-content",
                  backgroundColor: card.borderColor,
                  paddingBottom: card.borderWidth && card.title.text.length > 0? `${card.borderWidth}px` : '0',
                  paddingRight: card.borderWidth? `4px` : '0',
                  paddingLeft: card.borderWidth? `4px` : '0',
                  margin: 0,
                  border: 0,
                  boxShadow: 'none',
                  fontSize: `${card.title.fontSize}px`,
                  color: card.title.color,
                  textAlign: CardTextAlignsConfig[card.title.textAlign || CardTextAligns.CENTER].cssValue,
                  fontFamily: CardFontFamiliesConfig[card.title.fontFamily! || CardFontFamilies.TORMENTA_20].cssValue,
                  fontWeight: CardFontWeightsConfig[card.title.fontWeight || CardFontWeights.BOLD].cssValue,
                  fontStyle: CardTextStylesConfig[card.title.textStyle! || CardTextStyles.NORMAL].cssValue,
                  wordBreak: 'break-word',
                  textOverflow: 'ellipsis',
                  lineHeight: '1',
                  letterSpacing: '0.05em',
                  alignmentBaseline: 'middle',
                }}
              >
                {card.title.text || ""}
              </div>
            </div>
            <div
              style={{
                width: "100%",
                height: "100%",
                flex: 1,
                background: getCardBackground(),
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: `${card.borderRadius}px`,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              { printCard() }
              
              <div
                className={`
                  ${!isPrintMode ? 'text-slate-700 dark:text-slate-200' : ''}
                `}
                style={{
                  width: "100%",
                  height: "100%",
                  padding: '4px 4px 4px 4px',
                  margin: 0,
                  border: 0,
                  boxShadow: 'none',
                  fontSize: `${card.description.fontSize}px`,
                  color: isPrintMode ? card.description.color : '',
                  textAlign: CardTextAlignsConfig[card.description.textAlign || CardTextAligns.LEFT].cssValue,
                  fontFamily: CardFontFamiliesConfig[card.description.fontFamily! || CardFontFamilies.IOWAN_OLD_STYLE].cssValue,
                  fontWeight: CardFontWeightsConfig[card.description.fontWeight || CardFontWeights.NORMAL].cssValue,
                  fontStyle: CardTextStylesConfig[card.description.textStyle! || CardTextStyles.NORMAL].cssValue,
                  overflow: 'clip',
                  wordBreak: 'break-word',
                  textOverflow: 'ellipsis',
                  lineHeight: '1.1',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {card.description.text || ""}
              </div>
              <div
                className={`
                  ${!isPrintMode ? 'text-slate-700 dark:text-slate-200' : ''}
                `}
                style={{
                  width: "100%",
                  padding: card.borderRadius ? `${card.borderRadius / 2}px` : '0',
                  margin: 0,
                  border: 0,
                  boxShadow: 'none',
                  fontSize: `${card.source.fontSize}px`,
                  color: isPrintMode ? card.source.color : '',
                  textAlign: CardTextAlignsConfig[card.source.textAlign || CardTextAligns.CENTER].cssValue,
                  fontFamily: CardFontFamiliesConfig[card.source.fontFamily! || CardFontFamilies.TORMENTA_20].cssValue,
                  fontWeight: CardFontWeightsConfig[card.source.fontWeight || CardFontWeights.BOLD].cssValue,
                  fontStyle: CardTextStylesConfig[card.source.textStyle! || CardTextStyles.NORMAL].cssValue,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  lineHeight: '1',
                  letterSpacing: '0.05em',
                  marginTop: 'auto',
                }}
              >
                {card.source.text || ""}
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              width: getCardSize().width - (card.borderWidth * 2),
              height: getCardSize().height - (card.borderWidth * 2),
              backfaceVisibility: 'hidden',
              overflow: 'hidden',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              transform: 'rotateY(180deg)',
              position: 'absolute',
              top: 0,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "fit-content",
                backgroundColor: card.borderColor,
                paddingBottom: card.borderWidth? `${card.borderWidth}px` : '0',
                paddingRight: card.borderWidth? `4px` : '0',
                paddingLeft: card.borderWidth? `4px` : '0',
                margin: 0,
                border: 0,
                boxShadow: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                src={"/assets/images/logo-t20.png"}
                alt={"Card Image"}
                className="rounded-lg"
                width={130}
                height={20}
              />
            </div>
            <div
              style={{
                width: "100%",
                height: "100%",
                background: getCardBackground(),
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: card.borderWidth ? `${card.borderWidth}px` : '0',
                borderRadius: `${card.borderRadius}px`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image
                  src={"/assets/images/logo.png"}
                  alt={"Card Image"}
                  className="rounded-lg"
                  width={getCardSize().width - (card.borderWidth * 2 + 40)}
                  height={getCardSize().height + (card.borderWidth * 2 + 40)}
                />
              </div>
              <div>
                <div
                  style={{
                    width: "100%",
                    paddingRight: card.borderWidth? `4px` : '0',
                    paddingLeft: card.borderWidth? `4px` : '0',
                    margin: 0,
                    border: 0,
                    boxShadow: 'none',
                    fontSize: `${card.title.fontSize}px`,
                    color: card.title.color,
                    textAlign: CardTextAlignsConfig[card.title.textAlign || CardTextAligns.CENTER].cssValue,
                    fontFamily: CardFontFamiliesConfig[card.title.fontFamily! || CardFontFamilies.TORMENTA_20].cssValue,
                    fontWeight: CardFontWeightsConfig[card.title.fontWeight || CardFontWeights.BOLD].cssValue,
                    fontStyle: CardTextStylesConfig[card.title.textStyle! || CardTextStyles.NORMAL].cssValue,
                    wordBreak: 'break-word',
                    textOverflow: 'ellipsis',
                    lineHeight: '1',
                    letterSpacing: '0.05em',
                  }}
                >
                  {card.title.text || ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderPreviewMode = () => {
    return (
      <div
        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl overflow-hidden cursor-pointer group flex flex-col"
        style={{
          width: `${getCardSize().width}px`,
          height: `${getCardSize().height}px`,
        }}
      >
        
        {/* Header/Title */}
        <div className="bg-gradient-to-r from-slate-50/50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/50 border-b border-slate-200 dark:border-slate-700 px-4 py-3">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm text-left group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors truncate">
            {card.title.text || "Sem Título"}
          </h3>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1 overflow-hidden">
          {/* Origin (if exists) */}
          {card.origin && card.origin.text && (
            <div className="text-xs text-slate-500 dark:text-slate-400 italic mb-3 text-center flex-shrink-0">
              {card.origin.text}
            </div>
          )}

          {/* Description */}
          <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed flex-1 break-words overflow-hidden">
            {card.description.text || "Sem Descrição"}
          </div>
        </div>

        {/* Footer/Source */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
          <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
            {card.source.text || "Sem Fonte"}
          </div>
        </div>
      </div>
    );
  }
  return isPrintMode ? renderPrintMode() : renderPreviewMode();
}