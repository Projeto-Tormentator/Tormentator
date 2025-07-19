import { CardCustomText } from "@/app/cards/domain/fields/CustomText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui/number-input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { ColorPickerField } from "../ColorPickerField/index";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CardFontFamilies, CardFontFamiliesConfig, CardFontFamily } from "@/app/cards/domain/fields/types/CardFontFamily";
import { CardFontWeight, CardFontWeights, CardFontWeightsConfig } from "@/app/cards/domain/fields/types/CardFontWeight";
import { CardTextAlign, CardTextAligns, CardTextAlignsConfig } from "@/app/cards/domain/fields/types/CardTextAlign";
import { CardTextStyle, CardTextStyles, CardTextStylesConfig } from "@/app/cards/domain/fields/types/CardTextStyle";
import { toast } from "sonner";
export interface CustomTextFieldProps {
  id: string;
  field: CardCustomText;
  label: string;
  placeholder: string;
  defaultValues?: Partial<CardCustomText>;
  onUpdate: (
    fieldOrUpdates: string | UpdateField[],
    value?: unknown
  ) => void;
}

export type UpdateField = { field: string; value: unknown };


export function CustomTextField({ id, field, label, placeholder, defaultValues, onUpdate }: CustomTextFieldProps) {
  const [isCustomizationExpanded, setIsCustomizationExpanded] = useState(false);

  const restoreDefaults = () => {
    if (defaultValues) {
      const updatedField: UpdateField[] = [];
      Object.entries(defaultValues).forEach(([key, value]) => {
        if(key == 'text') return;
        updatedField.push({ field: `${id}.${key}`, value });
      });
      onUpdate(updatedField);
      toast.success(`Configurações de ${label.toLowerCase()} restauradas para os padrões.`);
    }
  };

  const handleTextChange = (newText: string) => {
    if (!field.maxLength || newText.length <= field.maxLength) {
      onUpdate(`${id}.text`, newText);
    }
  };
  
  const handleToggleCustomization = () => {
    setIsCustomizationExpanded(!isCustomizationExpanded);
  }

  return (
    <div className="space-y-2 mb-4">
      <Label
        htmlFor={`card-${id}`}
        className="block text-lg font-medium text-slate-700 dark:text-slate-100"
      >
        {label} {field.maxLength && (
          <span className="text-sm text-slate-500">(máx. {field.maxLength} caracteres)</span>
        )}
      </Label>

      {field.type === 'text' ? (
        <Input
          id={`card-${id}`}
          className="h-10 w-full focus-visible:ring-2 focus-visible:ring-purple-500 dark:focus-visible:ring-purple-400"
          value={field.text || ""}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder={placeholder}
          maxLength={field.maxLength}
        />
      ) : (
        <Textarea
          id={`card-${id}`}
          className="min-h-20 h-fit w-full resize-none wrap-break-word max-w-lg focus-visible:ring-2 focus-visible:ring-purple-500 dark:focus-visible:ring-purple-400"
          value={field.text || ""}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder={placeholder}
          maxLength={field.maxLength}
        />
      )}

      {field.maxLength && (
        <div className="text-xs text-slate-500 text-right -mb-4">
          {(field.text || "").length}/{field.maxLength}
        </div>
      )}
      
      {/* Customização */}
      <div className="border-l-2 border-slate-300 dark:border-slate-600 pl-4 ml-2">
        <button
          type="button"
          onClick={() => handleToggleCustomization()}
          className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          {isCustomizationExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
          Personalizar aparência {label.toLowerCase()}
        </button>
        
        {isCustomizationExpanded && (
          <div className="mt-3 space-y-3 bg-slate-50 dark:bg-slate-800 p-4 rounded-md">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col justify-between lg:flex-row gap-4 lg:gap-8">
                <div className="w-full lg:w-1/2">
                  <Label htmlFor={`${id}-fontSize`} className="block text-sm font-medium text-slate-700 dark:text-slate-100 mb-2">
                    Tamanho da Fonte
                  </Label>
                  <NumberInput
                    id={`${id}-fontSize`}
                    value={field.fontSize}
                    onChange={(value) => onUpdate(`${id}.fontSize`, value)}
                    className="w-full h-8 border-slate-300 dark:border-slate-600 focus-visible:ring-2 focus-visible:ring-purple-500 dark:focus-visible:ring-purple-400 outline-none"
                    min={8}
                    max={72}
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <ColorPickerField 
                    id={`${id}-color`}
                    label="Cor do Texto"
                    color={field.color}
                    onChange={(value) => onUpdate(`${id}.color`, value)}
                    variant="default"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-between lg:flex-row gap-4 lg:gap-8">
                <div className="w-full lg:w-1/2">
                  <Label htmlFor={`${id}-fontFamily`} className="block text-sm font-medium text-slate-700 dark:text-slate-100 mb-2">
                    Fonte
                  </Label>
                  <Select
                    value={field.fontFamily || CardFontFamilies.IOWAN_OLD_STYLE}
                    onValueChange={(value) => onUpdate(`${id}.fontFamily`, value)}
                  >
                    <SelectTrigger className="w-full" size="sm" style={{ fontFamily: CardFontFamiliesConfig[field.fontFamily || CardFontFamilies.IOWAN_OLD_STYLE].cssValue }}>
                      <SelectValue placeholder="Selecione uma fonte" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        Object.values(CardFontFamilies).map((font: CardFontFamily) => (
                          <SelectItem key={`${id}.${font}`} value={font} style={{ fontFamily: CardFontFamiliesConfig[font].cssValue }}>
                            {CardFontFamiliesConfig[font].name}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full lg:w-1/2">
                  <Label htmlFor={`${id}-fontWeight`} className="block text-sm font-medium text-slate-700 dark:text-slate-100 mb-2">
                    Peso
                  </Label>
                  <Select
                    value={field.fontWeight || CardFontWeights.NORMAL}
                    onValueChange={(value) => onUpdate(`${id}.fontWeight`, value)}
                  >
                    <SelectTrigger className="w-full" size="sm" style={{ fontWeight: CardFontWeightsConfig[field.fontWeight || CardFontWeights.NORMAL].cssValue }}>
                      <SelectValue placeholder="Selecione um peso" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        Object.values(CardFontWeights).map((font: CardFontWeight) => (
                          <SelectItem key={`${id}.${font}`} value={font} style={{ fontWeight: CardFontWeightsConfig[font].cssValue }}>
                            {CardFontWeightsConfig[font].name}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col justify-between lg:flex-row gap-4 lg:gap-8">
                <div className="w-full lg:w-1/2">
                  <Label htmlFor={`${id}-textAlign`} className="block text-sm font-medium text-slate-700 dark:text-slate-100 mb-2">
                    Alinhamento
                  </Label>
                  <Select
                    value={field.textAlign || CardTextAligns.LEFT}
                    onValueChange={(value) => onUpdate(`${id}.textAlign`, value)}
                  >
                    <SelectTrigger className="w-full" size="sm">
                      <SelectValue placeholder="Selecione um alinhamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        Object.values(CardTextAligns).map((align: CardTextAlign) => (
                          <SelectItem key={`${id}.${align}`} value={align}>
                            {CardTextAlignsConfig[align].name}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full lg:w-1/2">
                  <Label htmlFor={`${id}-textStyle`} className="block text-sm font-medium text-slate-700 dark:text-slate-100 mb-2">
                    Estilo
                  </Label>
                  <Select
                    value={field.textStyle || CardTextStyles.NORMAL}
                    onValueChange={(value) => onUpdate(`${id}.textStyle`, value)}
                  >
                    <SelectTrigger className="w-full" size="sm" style={{ fontStyle: CardTextStylesConfig[field.textStyle || CardTextStyles.NORMAL].cssValue }}>
                      <SelectValue placeholder="Selecione uma fonte" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        Object.values(CardTextStyles).map((style: CardTextStyle) => (
                          <SelectItem key={`${id}.${style}`} value={style} style={{ fontStyle: CardTextStylesConfig[style].cssValue }}>
                            {CardTextStylesConfig[style].name}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={restoreDefaults}
              className="w-full text-xs mt-4"
            >
              Restaurar Padrão {label.toLowerCase()}
            </Button>
          </div>
        )}
      </div>

    </div>
  );
}