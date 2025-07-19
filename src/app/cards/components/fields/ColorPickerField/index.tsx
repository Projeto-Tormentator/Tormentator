import { useState, useEffect, useRef } from "react";
import { HexAlphaColorPicker } from "react-colorful";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export interface ColorPickerFieldProps {
  id?: string;
  label?: string;
  color: string;
  onChange: (color: string) => void;
  variant?: "compact" | "default" | "big";
}

export function ColorPickerField({ 
  id = "color-picker",
  label = "Cor",
  color, 
  onChange,
  variant = "default",
}: ColorPickerFieldProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fechar picker clicando fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isPickerOpen &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsPickerOpen(false);
      }
    };

    if (isPickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPickerOpen]);

  return (
    <div className="space-y-2">
      {label && (
        <Label
          htmlFor={id}
          className={
            `block
            text-slate-700
            dark:text-slate-100
            ${variant === "compact" ? 'text-xs' : ''}
            ${variant === "default" ? 'text-sm' : ''}
            ${variant === "big" ? 'text-lg mb-2' : ''}
            w-fit`}
        >
          {label}
        </Label>
      )}
      
      <div className="relative" ref={containerRef}>
        <div className={
          `flex items-center gap-2
          ${variant === "compact" ? 'max-h-6' : ''}
          ${variant === "default" ? 'max-h-8' : ''}
          ${variant === "big" ? 'max-h-10' : ''}`
        }>
          {/* Color Preview Button */}
          <button
            type="button"
            onClick={() => setIsPickerOpen(!isPickerOpen)}
            className={`
              border-2
              rounded
              transition-all
              duration-200
              focus:ring-2
              focus:ring-purple-500
              dark:focus:ring-purple-400
              cursor-pointer
              ${variant === "compact" ? 'w-12 h-6' : ''}
              ${variant === "default" ? 'w-16 h-8' : ''}
              ${variant === "big" ? 'w-20 h-10' : ''}
              `}
            style={{ backgroundColor: color }}
            title="Clique para abrir o seletor de cor"
          />
          
          {/* Hex Input */}
          <div className="flex w-full items-center bg-slate-50 dark:bg-slate-800 rounded-md overflow-hidden transition-all duration-200 focus-within:ring-2 focus-within:ring-purple-500 dark:focus-within:ring-purple-400 border-1 border-input">
            <div className={`
              text-base
              bg-slate-200/50
              dark:bg-slate-800/30
              ${variant === "compact" ? 'text-sm h-6 px-1' : ''}
              ${variant === "default" ? 'text-base h-8 px-2' : ''}
              ${variant === "big" ? 'text-lg h-10 px-2' : ''}
              justify-center
              flex
              items-center
              text-slate-400
              dark:text-slate-100
              select-none
              font-mono`}>#</div>
            <Input
              type="text"
              className={`
                dark:bg-input/30
                flex
                items-center
                leading-none
                rounded-l-none
                border-0
                focus-visible:ring-0
                focus-visible:ring-offset-0
                tracking-wider
                uppercase
                ${variant === "compact" ? 'text-sm h-6 px-1' : ''}
                ${variant === "default" ? 'text-base h-8 px-2' : ''}
                ${variant === "big" ? 'text-lg h-10 px-2' : ''}
                w-full
                placeholder:text-slate-400
                dark:placeholder:text-slate-500
                `}
              value={color.replace('#', '')}
              onChange={(e) => {
                const inputValue = e.target.value.toUpperCase();
                if (/^[0-9A-F]*$/i.test(inputValue)) {
                  const limitedValue = inputValue.slice(0, 8); // Permite alpha
                  onChange('#' + limitedValue);
                }
              }}
              onPaste={(e) => {
                e.preventDefault();
                const pastedText = e.clipboardData.getData('text');
                const cleanText = pastedText.replace('#', '').replace(/[^0-9A-F]/gi, '').slice(0, 8).toUpperCase();
                onChange('#' + cleanText);
              }}
              placeholder={variant === "compact" ? "3b82f6" : "3b82f6ff"}
              title="Código hexadecimal da cor (suporta alpha)"
            />
          </div>
        </div>

        {/* Color Picker Dropdown */}
        {isPickerOpen && (
          <div className="absolute top-full left-0 mt-2 p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50">
            <HexAlphaColorPicker 
              color={color}
              onChange={onChange}
              className="w-48 h-32"
            />
          </div>
        )}
      </div>
    </div>
  );
}

