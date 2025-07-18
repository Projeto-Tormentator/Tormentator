import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function deepMerge(
  target: { [key: string]: any },
  source: { [key: string]: any }
): { [key: string]: any } {
  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key])
    ) {
      target[key] = deepMerge(
        target[key] ? { ...target[key] } : {},
        source[key]
      );
    } else {
      target[key] = source[key];
    }
  }
  return target;
}
