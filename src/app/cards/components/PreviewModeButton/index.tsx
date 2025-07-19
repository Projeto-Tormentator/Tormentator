import { Button } from "@/components/ui/button";
import { Monitor, Printer } from "lucide-react";

interface PreviewModeButtonProps {
  previewPrintMode: boolean;
  onToggle: () => void;
  hintDirection?: "top" | "bottom" | "left" | "right";
}

export default function PreviewModeButton({ previewPrintMode, onToggle, hintDirection = "top" }: PreviewModeButtonProps) {
  return (
    <div className="relative group">
      <Button
        onClick={onToggle}
        size="sm"
        variant={previewPrintMode ? "default" : "outline"}
        className={`flex items-center rounded-lg border transition-all duration-200 ${
          previewPrintMode 
            ? 'bg-purple-500 border-purple-500 text-white hover:bg-purple-600' 
            : 'border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700'
        }`}
        title={previewPrintMode ? "Modo de Impressão Ativo" : "Modo Normal Ativo"}
      >
        {previewPrintMode ? (
          <Printer className="h-4 w-4 mr-1" />
        ) : (
          <Monitor className="h-4 w-4 mr-1" />
        )}
        <span className="text-xs font-medium">
          {previewPrintMode ? "Impressão" : "Normal"}
        </span>
      </Button>

      {/* Tooltip */}
      <div
        className={`
          absolute z-[9999] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200
          ${hintDirection === "top" ? "bottom-full left-1/2 transform -translate-x-1/2 mb-2" : ""}
          ${hintDirection === "bottom" ? "top-full left-1/2 transform -translate-x-1/2 mt-2" : ""}
          ${hintDirection === "left" ? "right-full top-1/2 transform -translate-y-1/2 mr-2" : ""}
          ${hintDirection === "right" ? "left-full top-1/2 transform -translate-y-1/2 ml-2" : ""}
          w-72 p-3 bg-slate-900 dark:bg-slate-700 text-white text-xs rounded-lg shadow-lg
        `}
      >
        <div className="space-y-2">
          <div className="font-semibold">
        {previewPrintMode ? "Modo de Impressão" : "Modo Normal"}
          </div>
          <div>
        {previewPrintMode ? (
          <>
            <p>Preview de como a carta será exportada.</p>
            <p className="text-amber-300 mt-1">⚠️ Pode ser um pouco diferente da real exportação.</p>
          </>
        ) : (
          <>
            <p>Preview otimizado para visualização no sistema.</p>
            <p className="text-blue-300 mt-1">💡 Será diferente do resultado final.</p>
          </>
        )}
          </div>
        </div>
        {/* Arrow */}
        <div
          className={`
        absolute
        ${hintDirection === "top" ? "top-full left-1/2 transform -translate-x-1/2" : ""}
        ${hintDirection === "bottom" ? "bottom-full left-1/2 transform -translate-x-1/2 rotate-180" : ""}
        ${hintDirection === "left" ? "left-full top-1/2 transform -translate-y-1/2 -rotate-90" : ""}
        ${hintDirection === "right" ? "right-full top-1/2 transform -translate-y-1/2 rotate-90" : ""}
        w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent
        ${hintDirection === "top" || hintDirection === "bottom"
          ? "border-t-slate-900 dark:border-t-slate-700"
          : "border-t-slate-900 dark:border-t-slate-700"}
          `}
        ></div>
      </div>
    </div>
  );
}
