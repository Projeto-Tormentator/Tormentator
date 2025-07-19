import React, { useState, useEffect } from 'react';
import { Input } from './input';
import { cn } from '@/lib/utils';

interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value'> {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  allowFloat?: boolean;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, value, onChange, min, max, allowFloat = false, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState<string>('');
    const [isFocused, setIsFocused] = useState(false);

    // Sincroniza o valor interno com o prop value
    useEffect(() => {
      if (value !== undefined && !isFocused) {
        setDisplayValue(value.toString());
      }
    }, [value, isFocused]);

    // Inicializa o displayValue se não estiver definido
    useEffect(() => {
      if (value !== undefined && displayValue === '') {
        setDisplayValue(value.toString());
      }
    }, [value, displayValue]);

    const validateAndFormatValue = (inputValue: string): string => {
      // Remove caracteres não numéricos (exceto ponto/vírgula para decimais se permitido)
      let cleanValue = inputValue;
      
      if (allowFloat) {
        // Para float, permite apenas números, ponto e vírgula
        cleanValue = inputValue.replace(/[^0-9.,]/g, '');
        // Substitui vírgula por ponto
        cleanValue = cleanValue.replace(',', '.');
        // Remove pontos extras (mantém apenas o primeiro)
        const parts = cleanValue.split('.');
        if (parts.length > 2) {
          cleanValue = parts[0] + '.' + parts.slice(1).join('');
        }
      } else {
        // Para inteiros, permite apenas números
        cleanValue = inputValue.replace(/[^0-9]/g, '');
      }

      return cleanValue;
    };

    const parseValue = (inputValue: string): number => {
      if (inputValue === '') return 0;
      
      const numValue = allowFloat ? parseFloat(inputValue) : parseInt(inputValue);
      
      if (isNaN(numValue)) return 0;
      
      // Aplica limites se definidos
      let finalValue = numValue;
      if (min !== undefined && finalValue < min) finalValue = min;
      if (max !== undefined && finalValue > max) finalValue = max;
      
      return finalValue;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const validatedValue = validateAndFormatValue(inputValue);
      
      setDisplayValue(validatedValue);
      
      // Só chama onChange se há um valor válido ou string vazia
      if (validatedValue !== '' || inputValue === '') {
        const numericValue = parseValue(validatedValue);
        onChange?.(numericValue);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      
      // No blur, garante que o valor está dentro dos limites e formatado corretamente
      const numericValue = parseValue(displayValue);
      const formattedValue = numericValue.toString();
      
      setDisplayValue(formattedValue);
      onChange?.(numericValue);
      
      props.onBlur?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Permite teclas de navegação e edição
      const allowedKeys = [
        'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
        'Home', 'End'
      ];

      if (allowedKeys.includes(e.key)) {
        props.onKeyDown?.(e);
        return;
      }

      // Para números com decimais
      if (allowFloat && (e.key === '.' || e.key === ',')) {
        // Permite ponto/vírgula apenas se não há um já
        if (!displayValue.includes('.') && !displayValue.includes(',')) {
          props.onKeyDown?.(e);
          return;
        } else {
          e.preventDefault();
          return;
        }
      }

      // Permite apenas números
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
        return;
      }

      props.onKeyDown?.(e);
    };

    return (
      <Input
        {...props}
        ref={ref}
        type="text"
        inputMode="numeric"
        pattern={allowFloat ? "[0-9]*[.,]?[0-9]*" : "[0-9]*"}
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        className={cn(className)}
      />
    );
  }
);

NumberInput.displayName = "NumberInput";
