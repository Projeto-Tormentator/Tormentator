"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { BookOpen, Download, FileDown, FileUp, Plus, Sparkles, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CardClasses, CardConfigs, CardRegistry } from "../../domain/registry";
import Badge from "@/app/home/components/Features/Badge";
import { TbCards } from "react-icons/tb";
import { CardDialog } from "../CardDialog";
import { CARD_TYPES, CardType } from "../../domain/core/CardType";
import PreviewModeButton from "../PreviewModeButton";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Card } from "../Card";


export default function CardList() {
  const [cards, setCards] = useState<CardClasses[]>([]);
  const [printMode, setPrintMode] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardClasses>();
  const [originalSelectedCard, setOriginalSelectedCard] = useState<CardClasses>();
  const [selectedCardConfig, setSelectedCardConfig] = useState<CardConfigs>();
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(true);
  const [isConfirmClearAllOpen, setIsConfirmClearAllOpen] = useState(false);

  const menuOption = Object.values(CardRegistry);
  
  useEffect(() => {
    const storedCards = localStorage.getItem("tormentator-cards");
    if (storedCards) {
      setCards(JSON.parse(storedCards));
    } else {
      setCards([]);
    }
  }, []);


  const handleCreateCard = (cardType: CardType) => {
    const cardResgitry = CardRegistry[cardType];

    if (!cardResgitry) {
      console.error(`Card type ${cardType} not found in registry.`);
      return;
    }

    const newCard = new cardResgitry.cardClass();
    setSelectedCard(newCard);
    setOriginalSelectedCard(newCard);
    setIsCreating(true);    
    setSelectedCardConfig(cardResgitry.config);
    setIsDialogOpen(true);

  }

  const handleImportCards = () => {
    // TO-DO: Implementar a lógica para importar cartas
    console.log("Importar cartas");
  }

  const handleImportExampleCards = () => {
    // TO-DO: Implementar a lógica para importar cartas de exemplo
    console.log("Importar cartas de exemplo");
  }

  const handleExportCards = () => {
    // TO-DO: Implementar a lógica para exportar cartas
    console.log("Exportar cartas");
  }

  const handleGeneratePdf = () => {
    setIsGeneratingPdf(true);
    // TO-DO: Implementar a lógica para gerar PDF
    console.log("Gerar PDF");
  }

  const handleClearAllCards = () => {
    setCards([]);
    toast.success("Todas as cartas foram apagadas com sucesso!");
  }

  const handleSaveCard = (card: CardClasses) => {
  
    if (isCreating) {
      const newCards = [...cards, card];
      setCards(newCards);
      localStorage.setItem("tormentator-cards", JSON.stringify(newCards));
      toast.success("Carta criada com sucesso!");
    } else if (selectedCardIndex !== null) {
      const updatedCards = [...cards];
      updatedCards[selectedCardIndex] = card;
      setCards(updatedCards);
      localStorage.setItem("tormentator-cards", JSON.stringify(updatedCards));
      toast.success("Carta atualizada com sucesso!");
    } else {
      toast.error("Erro ao salvar a carta. Tente novamente.");
    }
  }


  return (
    <>
    
      {selectedCard && selectedCardConfig && (
        <CardDialog
          isOpen={isDialogOpen}
          isCreating={isCreating}
          card={selectedCard}
          originalCard={originalSelectedCard!}
          setCard={setSelectedCard}
          cardConfig={selectedCardConfig}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              setSelectedCard(undefined);
              setSelectedCardConfig(undefined);
            }
          }}
          onSave={handleSaveCard}
        />
      )}

      <div className="container mx-auto py-8 flex flex-col items-center">
        <div className="max-w-2xl mx-auto p-8">
          <h1 className="text-4xl font-bold mb-8">Suas Cartas</h1>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <Plus className="h-5 w-5 mr-2" />
                Adicionar Nova Carta
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg">
              {menuOption.map((option, index) => (
                <DropdownMenuItem
                  key={index}
                  disabled={!option.config.isAvailable}
                  onSelect={() => {
                  if (option.config.isAvailable) {
                    handleCreateCard(option.config.type);
                  }
                  }}
                  className={`flex items-center gap-3 p-3 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 ${!option.config.isAvailable ? 'text-slate-400 dark:text-slate-500 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {option.config.uiIcon && <option.config.uiIcon className="h-4 w-4" />}
                  <div className="flex-1 gap-2 flex flex-row justify-between  ">
                    <div className="font-medium">{option.config.uiLabel}</div>
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
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button
            size="lg"
            variant="outline"
            className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
            onClick={handleImportCards}
          >
            <FileUp className="h-5 w-5 mr-2" />
            Importar Cartas
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
            onClick={handleImportExampleCards}
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Cartas de Exemplo
          </Button>
        </div>
        <div className="mx-auto text-center bg-slate-200/30 dark:bg-slate-700/30 rounded-3xl w-full">
          {cards.length === 0 ? (
            <div className="p-8 text-slate-700 dark:text-slate-100">
              <div className="flex items-center justify-center mb-4">
                <button
                  type="button"
                  className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center transition-all duration-200 group hover:bg-gradient-to-br hover:from-purple-600 hover:to-purple-700 focus:outline-none"
                  onClick={() => handleCreateCard(CARD_TYPES.SKILL)}
                  aria-label="Criar Nova Carta"
                  >
                  <span className="sr-only">Criar Nova Carta</span>
                  <TbCards className="h-10 w-10 text-white group-hover:hidden transition-opacity duration-200" />
                  <Plus className="h-10 w-10 text-white hidden group-hover:block transition-opacity duration-200" />
                </button>
              </div>
              <h2 className="text-2xl font-semibold mb-4 ">Nenhuma carta encontrada</h2>
              <p className="text-lg">Clique no botão &quot;Adicionar Nova Carta&quot; para começar.</p>
              <p className="text-sm dark:text-slate-400 mt-2">Você pode importar cartas de exemplo ou então de um arquivo de cartas.</p>
              <p className="text-sm dark:text-slate-400 mt-2">Você pode também arrastar um arquivo até esse local para importá-lo.</p>
            </div>
          ) : (
            <div className="p-8 text-slate-700 dark:text-slate-100 flex flex-col">
              <div className="flex w-full">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 w-full">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <BookOpen className="size-6 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                          {cards.length} {cards.length === 1 ? 'carta criada' : 'cartas criadas'}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Pronto para suas aventuras
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row items-center gap-4">
                      <div className="flex items-center gap-2 lg:border-r-1 border-0 border-slate-300 dark:border-slate-600 pr-4">
                        Você está no modo{" "}
                        
                        {/* Print Mode Toggler */}
                        <PreviewModeButton 
                          previewPrintMode={printMode}
                          onToggle={() => setPrintMode(!printMode)}
                        />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700"
                          onClick={handleExportCards}
                        >
                          <FileDown className="h-4 w-4 mr-1" />
                          Exportar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700"
                          onClick={handleGeneratePdf}
                          disabled={isGeneratingPdf}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          {isGeneratingPdf ? "Gerando..." : "PDF"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-300 dark:border-red-600 text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                          onClick={() => setIsConfirmClearAllOpen(true)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Apagar Todas
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-32 md:gap-x-6 md:gap-y-16 lg:gap-x-6 lg:gap-y-24 xl:gap-x-6 xl:gap-y-32 h-full">
                {cards.map((card, index) => (
                  <div
                  key={index}
                  className="w-full h-full flex items-baseline justify-center"
                  >
                  <Card
                    card={card}
                    isPrintMode={printMode}
                    onClick={() => {
                      setSelectedCard(card);
                      setOriginalSelectedCard(card);
                      setSelectedCardConfig(CardRegistry[card.type].config);
                      setSelectedCardIndex(index);
                      setIsCreating(false);
                      setIsDialogOpen(true);
                    }}
                  />
                  </div>
                ))}
                </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmar Exclusão de Todas as Cartas Dialog */}
      <AlertDialog
        open={isConfirmClearAllOpen}
        onOpenChange={setIsConfirmClearAllOpen}
      >
        <AlertDialogContent>
          <AlertDialogTitle className="text-lg font-semibold">
            Tem certeza que deseja apagar todas as cartas?
          </AlertDialogTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Essa ação não pode ser desfeita. Todas as cartas serão removidas permanentemente.
          </p>
          <div className="mt-6 flex justify-end gap-4">
            <AlertDialogCancel>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500 rounded-md px-4 py-2"
              onClick={() => {
                handleClearAllCards();
                setIsConfirmClearAllOpen(false);
              }}
            >
              Apagar Todas
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
          
      </AlertDialog>
    </>
  );
}