import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/cardDialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { CardClasses, CardConfigs, CardInterfaces, CardRegistry } from "../../domain/registry";
import { CustomTextField, UpdateField } from "../fields/CustomTextField/CustomTextField";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";
import { CARD_TYPES, CardType } from "../../domain/core/CardType";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Badge from "@/app/home/components/Features/Badge";
import { ColorPickerField } from "../fields/ColorPickerField";
import { NumberInput } from "@/components/ui/number-input";
import { CardCustomText } from "../../domain/fields/CustomText";
import { toast } from "sonner";
import { CARD_SIZE_DATA, CARD_SIZES, CardSize } from "../../domain/core/CardSize";
import PreviewModeButton from "../PreviewModeButton";
import { Card } from "../Card";
import { CardCustomField } from "../../domain/BaseCard";

export interface CardDialogProps {
  isOpen: boolean;
  isCreating?: boolean;
  card: CardClasses;
  setCard: (card: CardClasses) => void;
  originalCard: CardClasses;
  cardConfig: CardConfigs;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (card: CardClasses) => void;
}

export function CardDialog({ 
  isOpen, 
  isCreating = false, 
  card,
  cardConfig, 
  onOpenChange,
  setCard, 
  onSave, 
  originalCard
 }: CardDialogProps) {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [confirmDialogTitle, setConfirmDialogTitle] = useState("");
  const [confirmDialogDescription, setConfirmDialogDescription] = useState("");
  const [confirmDialogActionClassName, setConfirmDialogActionClassName] = useState<string | null>(null);
  const [confirmDialogAction, setConfirmDialogAction] = useState<() => void>(() => () => {});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [hasUnsavedStyleChanges, setHasUnsavedStyleChanges] = useState(false);
  const [isPreviewPrintMode, setIsPreviewPrintMode] = useState(false);

  const hasCustomFieldChanges = useCallback((): boolean => {
    return cardConfig.customFields?.some((field) => {
      const originalValue = (originalCard as unknown as Record<string, unknown>)[field.field];
      const currentValue = (card as unknown as Record<string, unknown>)[field.field];      

      if(field.type === "CardCustomText")
      {
        if((currentValue as CardCustomText)?.text !== (originalValue as CardCustomText)?.text) {
          console.log(`Custom field ${field.field} text changed`);
          return true;
        } else if(
          !isCreating &&
          ((currentValue as CardCustomText)?.fontSize !== (originalValue as CardCustomText)?.fontSize ||
          (currentValue as CardCustomText)?.color !== (originalValue as CardCustomText)?.color ||
          (currentValue as CardCustomText)?.fontFamily !== (originalValue as CardCustomText)?.fontFamily ||
          (currentValue as CardCustomText)?.fontWeight !== (originalValue as CardCustomText)?.fontWeight ||
          (currentValue as CardCustomText)?.textAlign !== (originalValue as CardCustomText)?.textAlign ||
          (currentValue as CardCustomText)?.textStyle !== (originalValue as CardCustomText)?.textStyle)
        ) {
          console.log(`Custom field ${field.field} style changed`);
          console.log(currentValue);
          console.log(originalValue);
          return true;
        }
      }
      return false;

    }) ?? false;
  }, [card, originalCard, cardConfig.customFields, isCreating]);

  const hasAnyChange = useCallback((): boolean => {

    if(!isCreating){
      if (
        card.type !== originalCard.type
        || card.size !== originalCard.size
        || card.withBack !== originalCard.withBack
        || card.withPaperTexture !== originalCard.withPaperTexture
        || card.backgroundColor !== originalCard.backgroundColor
        || card.borderColor !== originalCard.borderColor
        || card.borderWidth !== originalCard.borderWidth
        || card.borderRadius !== originalCard.borderRadius
      ) {
        console.log("Type or Size changed");
        return true;
      }
    }

    if (
      card.withPaperTexture !== originalCard.withPaperTexture ||
      card.backgroundColor !== originalCard.backgroundColor ||
      card.borderColor !== originalCard.borderColor ||
      card.borderWidth !== originalCard.borderWidth ||
      card.borderRadius !== originalCard.borderRadius
    ) {
      console.log("Style changes detected");
      return true;
    }


    if (card.title.text !== originalCard.title.text) {
      console.log("Title text changes detected");
      return true;
    } else if(
      !isCreating && 
      (card.title.fontSize !== originalCard.title.fontSize ||
      card.title.color !== originalCard.title.color ||
      card.title.fontFamily !== originalCard.title.fontFamily ||
      card.title.fontWeight !== originalCard.title.fontWeight ||
      card.title.textAlign !== originalCard.title.textAlign ||
      card.title.textStyle !== originalCard.title.textStyle)
    ) {
      console.log("Title changes detected");
      return true;
    }

    if (card.description.text !== originalCard.description.text) {
      console.log("Description text changes detected");
      return true;
    } else if(
      !isCreating &&
      (card.description.fontSize !== originalCard.description.fontSize ||
      card.description.color !== originalCard.description.color ||
      card.description.fontFamily !== originalCard.description.fontFamily ||
      card.description.fontWeight !== originalCard.description.fontWeight ||
      card.description.textAlign !== originalCard.description.textAlign ||
      card.description.textStyle !== originalCard.description.textStyle)
    ) {
      console.log("Description changes detected");
      return true;
    }

    if (card.source.text !== originalCard.source.text) {
      console.log("Source text changes detected");
      return true;
    } else if(
      !isCreating &&
      (card.source.fontSize !== originalCard.source.fontSize ||
      card.source.color !== originalCard.source.color ||
      card.source.fontFamily !== originalCard.source.fontFamily ||
      card.source.fontWeight !== originalCard.source.fontWeight ||
      card.source.textAlign !== originalCard.source.textAlign ||
      card.source.textStyle !== originalCard.source.textStyle)
    ) {
      console.log("Source changes detected");
      return true;
    }

    if (hasCustomFieldChanges()) {
      return true;
    }

    return false;

  }, [card, originalCard, hasCustomFieldChanges, isCreating]);

  const hasStyleChanges = useCallback((): boolean => {
    if (card.withPaperTexture !== originalCard.withPaperTexture ||
       card.backgroundColor !== originalCard.backgroundColor ||
       card.borderColor !== originalCard.borderColor ||
       card.borderWidth !== originalCard.borderWidth) {
      return true;
    }

    const fields = [
      'title',
      'description',
      'source',
      ...(cardConfig?.customFields?.map(field => field.field) ?? [])
    ];

    fields.forEach(field => {
      const originalValue = (originalCard as unknown as Record<string, unknown>)[field];
      const currentValue = (card as unknown as Record<string, unknown>)[field];

      if( originalValue && currentValue && 
          typeof originalValue === 'object' && typeof currentValue === 'object' &&
          (originalValue as Record<string, unknown>).type === 'CustomTextField' && 
          (currentValue as Record<string, unknown>).type === 'CustomTextField') {
        const origObj = originalValue as Record<string, unknown>;
        const currObj = currentValue as Record<string, unknown>;
        for (const key in origObj) {
          if (key !== "text" && origObj[key] !== currObj[key]) {
            return true;
          }
        }
      }
    });
    return false;


  }, [card, originalCard, cardConfig?.customFields]);

  const checkTextTruncation = (currentCard: CardClasses, newDefaults: CardInterfaces): string[] => {
    const truncatedFields: string[] = [];
    
    if (currentCard.title.text && newDefaults.title?.maxLength![newDefaults.size] < currentCard.title.text.length) {
      truncatedFields.push(`Título (${currentCard.title.text.length} → ${newDefaults.title?.maxLength![newDefaults.size]} caracteres)`);
    }

    if (currentCard.description.text && newDefaults.description?.maxLength![newDefaults.size] < currentCard.description.text.length) {
      truncatedFields.push(`Descrição (${currentCard.description.text.length} → ${newDefaults.description?.maxLength![newDefaults.size]} caracteres)`);
    }

    if (currentCard.source.text && newDefaults.source?.maxLength![newDefaults.size] < currentCard.source.text.length) {
      truncatedFields.push(`Fonte (${currentCard.source.text.length} → ${newDefaults.source?.maxLength![newDefaults.size]} caracteres)`);
    }
    
    cardConfig.customFields?.forEach((customField: CardCustomField) => {
      const originalField = currentCard[customField.field as keyof CardClasses] as CardCustomText;
      const newField = newDefaults[customField.field as keyof CardInterfaces] as CardCustomText;

      if(
        originalField &&
        newField &&
        originalField.text &&
        newField.maxLength &&
        newField.maxLength[newDefaults.size] < originalField.text.length
      ){
        truncatedFields.push(`${customField.label || customField.field} (${originalField.text.length} → ${newField.maxLength[newDefaults.size]} caracteres)`);
      }      
    });
    
    return truncatedFields;
  };

  const recreateCardWithNewDefaults = (currentCard: CardClasses, newDefaults: CardInterfaces): CardClasses => {
    const userCustomizations: Partial<CardInterfaces> & Record<string, unknown> = {};

    userCustomizations.title = 
    { 
      ...newDefaults.title,
      ... currentCard.title,
      text: currentCard.title.text.slice(0, newDefaults.title.maxLength![newDefaults.size])
    };

    userCustomizations.description = 
    { 
      ...newDefaults.description,
      ... currentCard.description,
      text: currentCard.description.text.slice(0, newDefaults.description.maxLength![newDefaults.size])
    };

    userCustomizations.source =
    {
      ...newDefaults.source,
      ... currentCard.source,
      text: currentCard.source.text.slice(0, newDefaults.source.maxLength![newDefaults.size])
    };

    cardConfig.customFields?.forEach((customField: CardCustomField) => {
      if (currentCard[customField.field as keyof CardClasses]) {
        const originalField = currentCard[customField.field as keyof CardClasses] as CardCustomText;
        const newField = newDefaults[customField.field as keyof CardInterfaces] as CardCustomText;
        console.log(newDefaults);
        userCustomizations[customField.field] = {
          ...newField,
          ...originalField,
          text: originalField.text.slice(0, newField.maxLength![newDefaults.size])
        };
      }
    });

    const fieldsToCheck = [
      'backgroundColor', 'borderColor', 'borderWidth', 'borderRadius',
      'withPaperTexture', 'withBack'
    ];
    fieldsToCheck.forEach((field) => {
      if ((currentCard as CardClasses)[field as keyof CardClasses] !== undefined) {
        userCustomizations[field] = (currentCard as CardClasses)[field as keyof CardClasses];
      }
    });

    return new CardRegistry[newDefaults.type].cardClass({
      ...newDefaults,
      ...userCustomizations
    }) as CardClasses;
  };

  const handleUpdate = (
    fieldOrUpdates: string | UpdateField[],
    value?: unknown
  ) => {
    const cardClone = Object.create(Object.getPrototypeOf(card));
    Object.assign(cardClone, card);

    const updates: UpdateField[] = Array.isArray(fieldOrUpdates)
      ? fieldOrUpdates
      : [{ field: fieldOrUpdates, value }];

    updates.forEach(({ field, value }) => {
      const keys = field.split(".");
      let current: Record<string, unknown> = cardClone;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        const currentValue = current[keys[i]];
        current[keys[i]] = { ...(typeof currentValue === 'object' && currentValue !== null ? currentValue as Record<string, unknown> : {}) };
        current = current[keys[i]] as Record<string, unknown>;
      }

      current[keys[keys.length - 1]] = value;
    });
    setCard(cardClone);
  };

  const handleSave = (card: CardClasses) => {
    if (card) {
      onSave(card);
      setHasUnsavedChanges(false);
      onOpenChange(false);
    }
  };

  const handleResetCard = () => {
    setCard(originalCard);
    setIsConfirmDialogOpen(false);
    setHasUnsavedChanges(false);

    toast.success(`Alterações desfeitas.`);
  }

  const handleResetStyles = () => {
    const defaultStyles = card.getDefaults();
    handleUpdate([
      { field: 'backgroundColor', value: defaultStyles.backgroundColor },
      { field: 'borderColor', value: defaultStyles.borderColor },
      { field: 'borderWidth', value: defaultStyles.borderWidth },
      { field: 'withPaperTexture', value: defaultStyles.withPaperTexture },
    ]);

    const fields = [
      'title',
      'description',
      'source',
      ...(cardConfig?.customFields?.map(field => field.field) ?? [])
    ];

    fields.forEach(field => {
      const defaultValue = (defaultStyles as unknown as Record<string, unknown>)[field];
      if (defaultValue && typeof defaultValue === 'object' && (defaultValue as Record<string, unknown>).type == 'CustomTextField') {
        handleUpdate(field, {
          text: ((card as unknown as Record<string, unknown>)[field] as Record<string, unknown>)?.text,
          ...defaultValue
        });
      }
    });

    toast.success(`Estilos da carta restaurados para os padrões.`);

  }

  const handleDialogOpenChange = (open: boolean) => {
    if (!open && hasUnsavedChanges) {
      setConfirmDialogTitle("Deseja sair sem salvar?");
      setConfirmDialogDescription("Você tem alterações não salvas na carta atual.<br>Sair agora irá descartar todas as alterações feitas.");
      setConfirmDialogAction(() => () => onOpenChange(false));
      setIsConfirmDialogOpen(true);
      setConfirmDialogActionClassName("bg-red-500 hover:bg-red-600");
    } else {
      onOpenChange(open);
    }
  }

  const resetDialog = () => {
    setIsConfirmDialogOpen(false);
    setConfirmDialogTitle("");
    setConfirmDialogDescription("");
    setConfirmDialogActionClassName(null);
    setConfirmDialogAction(() => () => {});
    setIsConfirmDialogOpen(false);
  }

  const handleSizeChange = (value: CardSize) => {
    if (CARD_SIZES[value]) {
      const currentDefaults = card.getDefaults();
      currentDefaults.size = value;

      const truncatedFields = checkTextTruncation(card, currentDefaults);

      if (truncatedFields.length > 0) {
        setConfirmDialogTitle("Deseja mudar o tamanho da carta?");
        setConfirmDialogDescription(
          `Os seguintes campos serão cortados:<br>• ${truncatedFields.join('<br>• ')}<br><br>Essa ação não pode ser desfeita.`
        );
        setConfirmDialogAction(() => () => handleConfirmSizeChange(value));
        setConfirmDialogActionClassName("bg-yellow-500 hover:bg-yellow-600");
        setIsConfirmDialogOpen(true);
      } else {
        handleConfirmSizeChange(value);
      }
    }
  }

  const handleConfirmSizeChange = (value: CardSize) => {
    if (CARD_SIZES[value]) {
      const currentDefaults = card.getDefaults();
      const newCard = recreateCardWithNewDefaults(card, currentDefaults);
      newCard.size = value;
      setCard(newCard);
    }
    setIsConfirmDialogOpen(false);
  }

  const handleTypeChange = (value: CardType) => {
    if (CardRegistry[value].config.isAvailable) {
      const selectedType = CardRegistry[value];
      const newDefaults = new selectedType.cardClass({size: card.size}).getDefaults();
      const truncatedFields = checkTextTruncation(card, newDefaults);
      const customFieldsNotInNewType = cardConfig.customFields?.filter(
        field => !selectedType.config.customFields?.some(newField => newField.field === field.field)
      ) || [];


      if(customFieldsNotInNewType?.length == 0 && truncatedFields.length == 0) {
        handleConfirmTypeChange(value)
        return;
      }

      setConfirmDialogTitle("Deseja mudar o tipo da carta?");
      if(customFieldsNotInNewType?.length > 0){
        setConfirmDialogDescription(
          `Essa ação irá remover os seguintes campos personalizados: <br>• ${customFieldsNotInNewType.map(field => field.label || field.field).join('<br>• ')}<br><br>Essa ação não pode ser desfeita.`
        );
      }
      if(truncatedFields.length > 0) {
        setConfirmDialogDescription(
          confirmDialogDescription + 
          `<br>Os seguintes campos serão cortados:<br>• ${truncatedFields.join('<br>• ')}<br><br>Essa ação não pode ser desfeita.`
        );
      }
      setConfirmDialogAction(() => () => handleConfirmTypeChange(value));
      setConfirmDialogActionClassName("bg-yellow-500 hover:bg-yellow-600");
      setIsConfirmDialogOpen(true);
    }
  };

  const handleConfirmTypeChange = (value: CardType) => {
    if (value) {
      const selectedType = CardRegistry[value];
      const newDefaults = new selectedType.cardClass({size: card.size}).getDefaults();
      const newCard = recreateCardWithNewDefaults(card, newDefaults);
      newCard.type = value;
      newCard.size = card.size;
      setCard(newCard);
    }
    setIsConfirmDialogOpen(false);
  };

  useEffect(() => {
    setHasUnsavedChanges(hasAnyChange());
    setHasUnsavedStyleChanges(hasStyleChanges());
  }, [card, hasAnyChange, hasStyleChanges]);

  console.log(card)

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="max-w-2xl min-h-[80vh] overflow-y-scroll md:overflow-y-hidden h-full md:h-fit bg-slate-100 dark:bg-background rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className={`text-2xl ${hasUnsavedChanges ? 'italic' : ''}`}>{isCreating ? "Criando Carta" : "Editando Carta"}{hasUnsavedChanges ? "*" : ""}</DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-col h-full lg:flex-row max-h-[80vh] overflow-y-scroll lg:overflow-y-visible">
          <div className="flex flex-col gap-4 custom-scrollbar-accent w-full lg:w-1/2 h-full lg:min-h-[80vh] min-h-fit max-h-fit lg:max-h-[80vh] overflow-y-auto px-4 py-2 bg-white dark:bg-slate-800 rounded-lg rounded-b-none lg:rounded-b-lg lg:rounded-r-none shadow-md pb-12 lg:pb-0">
            {/* TIPO DA CARTA */}
            <div className="mb-4">
              <Label
                htmlFor="card-type"
                className="block text-lg font-medium text-slate-700 dark:text-slate-100 mb-2"
              >
                Tipo de Carta
              </Label>
              <Select
                value={card.type || CARD_TYPES.SKILL}
                onValueChange={handleTypeChange}
              >
                <SelectTrigger size="big" className="w-full transition-all duration-200 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400">
                  <SelectValue placeholder="Selecione o tipo da carta" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  {Object.values(CardRegistry).map((option) => {


                    return (
                      <SelectItem 
                        key={`card-type-${option.config.type}`} 
                        value={option.config.type}
                        disabled={!option.config.isAvailable}
                        className={`flex justify-between items-center flex-row w-full ${!option.config.isAvailable ? 'text-slate-400 dark:text-slate-500 cursor-not-allowed' : 'cursor-pointer'} w-full`}
                      >
                        <div className="flex items-center gap-2 min-w-24">
                          {option.config.uiIcon && <option.config.uiIcon className="h-4 w-4" />}
                          {option.config.uiLabel}
                        </div>
                        <div className="flex items-center gap-2">
                          {option.config.isBeta && (
                                <Badge
                                  text="Beta"
                                  accent="yellow"
                                  className="text-xs px-1.5 py-1"
                                />
                          )}
                          {option.config.isNew && (
                            <Badge 
                              text="Novo"
                              accent="blue"
                              className="text-xs px-1.5 py-1"
                            />
                          )}
                          {option.config.isComingSoon && (
                            <Badge 
                              text="Em Breve"
                              accent="orange"
                              className="text-xs px-1.5 py-1"
                            />
                          )}
                          {option.config.isFuture && (
                              <Badge 
                                text="Futuro"
                                accent="purple"
                                className="text-xs px-1.5 py-1"
                              />
                          )}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* TAMANHO DA CARTA */}
            <div className="mb-4">
              <Label
                htmlFor="card-size"
                className="block text-lg font-medium text-slate-700 dark:text-slate-100 mb-2"
              >
                Tamanho da Carta
              </Label>
              <Select
                value={card.size || CARD_SIZES.NORMAL}
                onValueChange={handleSizeChange}
              >
                <SelectTrigger size="big" className="w-full transition-all duration-200 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400">
                  <SelectValue placeholder="Selecione o tamanho da carta" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  {Object.values(cardConfig.availableSizes).map((option) => {
                    const sizeConfig = CARD_SIZE_DATA[option];
                    return (
                      <SelectItem 
                        key={`card-size-${option}`} 
                        value={option}
                        disabled={!cardConfig.availableSizes.includes(option)}
                        className={`flex justify-between items-center flex-row w-full ${!(cardConfig.availableSizes.includes(option)) ? 'text-slate-400 dark:text-slate-500 cursor-not-allowed' : 'cursor-pointer'} w-full`}
                      >
                        <div className="flex items-center gap-2 min-w-24">
                          {sizeConfig?.uiLabel || option}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* BORDA */}
            <div className="mb-4">
              <div className="text-lg font-medium text-slate-700 dark:text-slate-100 mb-2">
                Borda
              </div>
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="w-full md:w-auto">
                  <ColorPickerField
                    id="card-borderColor"
                    label="Cor "
                    color={card.borderColor || card.getDefaults().borderColor}
                    onChange={(color) => handleUpdate('borderColor', color)}
                    variant="big"
                  />
                </div>
                <div className="w-full md:w-auto">
                  <Label htmlFor="card-borderWidth" className="text-lg font-medium text-slate-700 dark:text-slate-100 mb-2">
                    Largura
                  </Label>
                  <NumberInput
                    id="card-borderWidth"
                    max={20}
                    min={0}
                    value={card.borderWidth || card.getDefaults().borderWidth}
                    onChange={(value) => handleUpdate('borderWidth', value)}
                    placeholder="Largura da Borda"
                    className="h-10 w-full transition-all duration-200 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                  />
                </div>
                <div className="w-full md:w-auto">
                  <Label htmlFor="card-borderRadius" className="text-lg font-medium text-slate-700 dark:text-slate-100 mb-2">
                    Raio
                  </Label>
                  <NumberInput
                    id="card-borderRadius"
                    min={0}
                    max={40}
                    value={card.borderRadius || card.getDefaults().borderRadius}
                    onChange={(value) => handleUpdate('borderRadius', value)}
                    placeholder="Raio da Borda"
                    className="h-10 w-full transition-all duration-200 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                  />
                </div>
              </div>
            </div>

            {/* TÍTULO */}
            <div>
              <CustomTextField
                field={card.title}
                label="Título"
                placeholder="Digite o título da carta"
                defaultValues={isCreating ? card.getDefaults().title : originalCard.title}
                onUpdate={handleUpdate}
                id={`title`}
                cardSize={card.size}
              />
            </div>

            {/* DESCRIÇÃO */}
            <div>
              <CustomTextField
                field={card.description}
                label="Descrição"
                placeholder="Digite a descrição da carta"
                defaultValues={isCreating ? card.getDefaults().description : originalCard.description}
                onUpdate={handleUpdate}
                id={`description`}
                cardSize={card.size}
              />
            </div>


            {/* CAMPOS CUSTOMIZADOS */}
            {
              cardConfig.customFields?.map((field) => {
                if (field.type == "CardCustomText"){
                  return (
                    <div key={field.field}>
                      <CustomTextField
                        field={(card as unknown as Record<string, unknown>)[field.field] as CardCustomText}
                        label={field.label}
                        placeholder={field.placeholder ?? ""}
                        defaultValues={isCreating ? (card.getDefaults() as unknown as Record<string, unknown>)[field.field] as Partial<CardCustomText> : (originalCard as unknown as Record<string, unknown>)[field.field] as Partial<CardCustomText>}
                        onUpdate={handleUpdate}
                        id={field.field}
                        cardSize={card.size}
                      />
                    </div>
                  );
                }
                return null;
              })
            }

            {/* FONTE */}
            <div>
              <CustomTextField
                field={card.source}
                label="Fonte"
                placeholder="Digite a fonte da carta"
                defaultValues={isCreating ? card.getDefaults().source : originalCard.source}
                onUpdate={handleUpdate}
                id={`source`}
                cardSize={card.size}
              /> 
            </div>


            {/* OPÇÕES AVANÇADAS */}           
            <div className="space-y-4">
              <Label className="block text-lg font-medium text-slate-700 dark:text-slate-100">
                Opções Avançadas
              </Label>
              <div className="space-y-3 bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                  <input
                    type="checkbox"
                    id="card-withPaperTexture"
                    checked={card.withPaperTexture || false}
                    onChange={(e) => handleUpdate('withPaperTexture', e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-purple-600 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-colors"
                  />
                  <Label
                    htmlFor="card-withPaperTexture"
                    className="text-sm font-medium text-slate-700 dark:text-slate-100 cursor-pointer flex-1"
                  >
                    Textura de papel
                    <span className="block text-xs text-slate-500 dark:text-slate-400">
                      Adiciona uma textura sutil de papel à carta
                    </span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                  <input
                    type="checkbox"
                    id="card-withBack"
                    checked={card.withBack || false}
                    onChange={(e) => handleUpdate('withBack', e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-purple-600 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-colors"
                  />
                  <Label
                    htmlFor="card-withBack"
                    className="text-sm font-medium text-slate-700 dark:text-slate-100 cursor-pointer flex-1"
                  >
                    Gerar verso da carta
                    <span className="block text-xs text-slate-500 dark:text-slate-400">
                      Cria uma versão do verso para impressão
                    </span>
                  </Label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 custom-scrollbar-accent w-full lg:w-1/2 lg:max-w-1/2 h-full min-h-[80vh] lg:max-h-[80vh] px-4 py-2 bg-white dark:bg-slate-800 rounded-lg rounded-t-none lg:rounded-t-lg lg:rounded-l-none shadow-md">
            <div className="h-full">
              <div className="text-xl font-semibold text-slate-700 dark:text-slate-100 flex items-center justify-between w-full z-[999]">
                Preview da Carta
                <PreviewModeButton
                  previewPrintMode={isPreviewPrintMode}
                  onToggle={() => setIsPreviewPrintMode(!isPreviewPrintMode)}
                  hintDirection="left"
                />
              </div>
              <div className="h-full w-full flex items-center justify-center">
                <Card
                  card={card}
                  isPrintMode={isPreviewPrintMode}
                  onClick={() => {}}
                />
              </div>
            </div>
            
            
            {/* Botões de Ação */}
            <div className="flex gap-3 justify-end">
              <Button
                onClick={() => {
                  setConfirmDialogTitle("Deseja redefinir os estilos?");
                  setConfirmDialogDescription("Você tem alterações de estilo não salvas na carta atual.<br>Redefinir os estilos irá apagar todas as alterações feitas nas customizações da carta.");
                  setConfirmDialogAction(() => handleResetStyles);
                  setIsConfirmDialogOpen(true);
                  setConfirmDialogActionClassName("bg-red-500 hover:bg-red-600");
                }}
                variant="outline"
                className="flex-1 lg:flex-none transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                disabled={!hasUnsavedStyleChanges}
              >
                Redefinir Estilos
              </Button>
              <Button 
                onClick={() => {
                  setConfirmDialogTitle("Deseja redefinir a carta?");
                  setConfirmDialogDescription("Você tem alterações não salvas na carta atual.<br>Redefinir a carta irá apagar todas as alterações feitas.");
                  setConfirmDialogAction(() => handleResetCard);
                  setIsConfirmDialogOpen(true);
                  setConfirmDialogActionClassName("bg-red-500 hover:bg-red-600");
                }}
                variant="outline"
                className="flex-1 lg:flex-none transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                disabled={!hasUnsavedChanges}
              >
                Desfazer Alterações
              </Button>
              <Button
                onClick={() => {
                  if (!isCreating) {
                    handleSave(card);
                  } else {
                    setConfirmDialogTitle("Deseja salvar as alterações feitas na carta?");
                    setConfirmDialogDescription("");
                    setConfirmDialogAction(() => () => handleSave(card));
                    setIsConfirmDialogOpen(true);
                    setConfirmDialogActionClassName("bg-green-500 hover:bg-green-600");
                  }
                }}
                className="flex-1 lg:flex-none bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!hasUnsavedChanges}
              >
                {!isCreating ? "Salvar Alterações" : "Criar Carta"}
              </Button>
            </div>

          </div>
        </div>
      </DialogContent>

      {/* AlertDialog de confirmação */}
      <AlertDialog open={isConfirmDialogOpen} onOpenChange={resetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmDialogTitle}</AlertDialogTitle>
            <AlertDialogDescription >
                {confirmDialogDescription.split("<br>").map((line, idx) => (
                  <span key={idx}>
                    {line}
                    {idx < confirmDialogDescription.split("<br>").length - 1 && <br />}
                  </span>
                ))}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => confirmDialogAction() } 
              className={`text-white ${confirmDialogActionClassName || 'bg-purple-600 hover:bg-purple-700'}`}
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}