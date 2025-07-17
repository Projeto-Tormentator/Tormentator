"use client";
import { Info, X } from "lucide-react";
import { useState } from "react";

export default function SaveCardsAlert() {
  const [showAlertSaveCards, setShowAlertSaveCards] = useState(true);
  


  return (
    <>
      {showAlertSaveCards && (
        <div className="max-w-2xl mx-auto mt-8">
          <div className="bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 rounded-lg p-4 relative">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <Info className="h-4 w-4 text-purple-600 dark:text-purple-300" />
              </div>
              <div className="flex-1 text-sm pr-8">
                <p className="text-purple-800 dark:text-purple-200 mb-2">
                  Suas cartas ficam salvas localmente no seu navegador. 
                  Recomendamos exportá-las para um local seguro após criá-las.
                </p>
                <p className="text-purple-600 dark:text-purple-300/80 text-xs">
                  Você também pode importar cartas previamente salvas.
                </p>
              </div>
              <button
                className="text-purple-500 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-100 transition-colors"
                onClick={() => setShowAlertSaveCards(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}