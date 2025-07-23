"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { BookOpen, Download, FileDown, FileUp, Plus, Sparkles, Trash2, FileImage, FileText } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CardClasses, CardConfigs, CardInterfaces, CardRegistry } from "../../domain/registry";
import { EXAMPLE_CARDS } from "../../domain/examples/exampleCards";
import { generateCardsPDF, generateCardsJSON, generateCardsPNG } from "../../utils/cardGenerator";
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
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState({ current: 0, total: 0, type: '' });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [exportDropdownOpen, setExportDropdownOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardClasses>();
  const [originalSelectedCard, setOriginalSelectedCard] = useState<CardClasses>();
  const [selectedCardConfig, setSelectedCardConfig] = useState<CardConfigs>();
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(true);
  const [isConfirmClearAllOpen, setIsConfirmClearAllOpen] = useState(false);
  const [isConfirmDeleteCardOpen, setIsConfirmDeleteCardOpen] = useState(false);
  const [isConfirmImportOpen, setIsConfirmImportOpen] = useState(false);
  const [isConfirmImportExamplesOpen, setIsConfirmImportExamplesOpen] = useState(false);
  const [pendingImportData, setPendingImportData] = useState<CardClasses[] | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);

  const menuOption = Object.values(CardRegistry);

  const cardArrayToObject = (cards: CardClasses[]) =>  {

    const parsedCards: CardClasses[] = [];
    const invalidIndexes: number[] = [];

    cards.forEach((cardData: CardInterfaces, idx: number) => {
      try {
        const cardInstance = new CardRegistry[cardData.type].cardClass(cardData);
        parsedCards.push(cardInstance);
      } catch (error) {
        invalidIndexes.push(idx);
        console.error(`Erro ao criar instância da carta no índice ${idx}:`, error);
      }
    });

    return { parsedCards, invalidIndexes };
  };

  useEffect(() => {
    const loadStoredCards = async () => {
      try {
        const storedCards = localStorage.getItem("tormentator-cards");
        if (storedCards) {
          toast.loading("Carregando cartas do armazenamento local...", {
            duration: 9999999999,
            id: "loading-cards"
          });
          
          const parsedData = JSON.parse(storedCards);
          const { parsedCards, invalidIndexes } = cardArrayToObject(parsedData);
          setCards(parsedCards);
          
          toast.dismiss("loading-cards");
          
          if (invalidIndexes.length > 0) {
            toast.error(`Algumas cartas não puderam ser carregadas devido a erros de formatação. Verifique os índices: ${invalidIndexes.join(', ')}`, {
              duration: 10000,
            });
          }
          
          if (parsedCards.length === 0) {
            toast.info("Nenhuma carta encontrada no armazenamento local. Você pode criar novas cartas ou importar cartas de exemplo.", {
              duration: 5000,
            });
          } else {
            toast.success(`Carregadas ${parsedCards.length} carta(s) do armazenamento local!`, {
              duration: 5000,
            });
          }
        } else {
          setCards([]);
        }
      } catch (error) {
        console.error('Erro ao carregar cartas do localStorage:', error);
        toast.error('Erro ao carregar cartas salvas. Começando com lista vazia.', {
          duration: 5000,
        });
        setCards([]);
      } finally {
        setLoading(false);
      }
    };

    loadStoredCards();
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
    fileInputRef.current?.click();
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processImportFile(file);
    }
    // Limpar o input para permitir selecionar o mesmo arquivo novamente
    if (event.target) {
      event.target.value = '';
    }
  }


  const processImportFile = (file: File) => {
    if (!file.name.endsWith('.json')) {
      toast.error('Por favor, selecione um arquivo JSON válido.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const toastId = toast.loading('Processando arquivo de importação...', {
        duration: Infinity,
      });

      try {
        const content = e.target?.result as string;
        const importedCards = JSON.parse(content);
        
        if (!Array.isArray(importedCards)) {
          toast.error('Formato de arquivo inválido. Esperado um array de cartas.', { id: toastId });
          return;
        }

        // Usar a função cardArrayToObject para garantir conversão adequada
        const { parsedCards: validCards, invalidIndexes } = cardArrayToObject(importedCards);

        if (validCards.length === 0) {
          toast.error('Nenhuma carta válida encontrada no arquivo.', { id: toastId });
          return;
        }

        // Armazenar as cartas para importação pendente e mostrar confirmação
        setPendingImportData(validCards);
        setIsConfirmImportOpen(true);
        
        toast.success(`${validCards.length} carta(s) válida(s) encontrada(s) no arquivo.`, { 
          id: toastId,
          duration: 3000,
        });
        
        if (validCards.length < importedCards.length) {
          toast.warning(`${importedCards.length - validCards.length} carta(s) ignorada(s) por formato inválido. Cartas inválidas nos índices: ${invalidIndexes.join(', ')}`);
        }
      } catch (error) {
        console.error('Erro ao importar cartas:', error);
        toast.error('Erro ao processar o arquivo. Verifique se o formato está correto.', { id: toastId });
      }
    };
    
    reader.onerror = () => {
      toast.error('Erro ao ler o arquivo. Tente novamente.');
    };
    
    reader.readAsText(file);
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processImportFile(files[0]);
    }
  }

  const handleImportExampleCards = () => {
    setIsConfirmImportExamplesOpen(true);
  }

  const handleConfirmImport = () => {
    if (pendingImportData) {
      try {
        const newCards = [...cards, ...pendingImportData];

        setCards(newCards);
        localStorage.setItem("tormentator-cards", JSON.stringify(newCards));
        toast.success(`${pendingImportData.length} carta(s) importada(s) com sucesso!`, {
          duration: 5000,
        });
        setPendingImportData(null);
      } catch (error) {
        console.error('Erro ao salvar cartas importadas:', error);
        toast.error('Erro ao salvar cartas importadas. Tente novamente.');
      }
    }
    setIsConfirmImportOpen(false);
  }

  const handleConfirmImportExamples = () => {
    try {
      // Converter cartas de exemplo usando cardArrayToObject para garantir consistência
      const { parsedCards: convertedExampleCards } = cardArrayToObject(EXAMPLE_CARDS);
      const newCards = [...cards, ...convertedExampleCards];
      
      setCards(newCards);
      localStorage.setItem("tormentator-cards", JSON.stringify(newCards));
      toast.success(`${convertedExampleCards.length} cartas de exemplo importadas com sucesso!`, {
        duration: 5000,
      });
    } catch (error) {
      console.error('Erro ao importar cartas de exemplo:', error);
      toast.error('Erro ao importar cartas de exemplo. Tente novamente.');
    }
    setIsConfirmImportExamplesOpen(false);
  }

  const handleExportJSON = async () => {
    if (cards.length === 0) {
      toast.error('Nenhuma carta disponível para exportar.');
      return;
    }

    setIsExporting(true);
    setExportProgress({ current: 0, total: cards.length, type: 'JSON' });

    const toastId = toast.loading(`Exportando cartas para JSON... (0/${cards.length})`, {
      duration: Infinity,
    });

    try {
      await generateCardsJSON(cards, (current, total) => {
        setExportProgress({ current, total, type: 'JSON' });
        toast.loading(`Exportando cartas para JSON... (${current}/${total})`, {
          id: toastId,
        });
      });

      toast.success('Cartas exportadas para JSON com sucesso!', { 
        id: toastId,
        duration: 5000,
      });
    } catch (error) {
      console.error('Erro ao exportar cartas:', error);
      toast.error('Erro ao exportar cartas. Tente novamente.', { id: toastId });
    } finally {
      setIsExporting(false);
      setExportProgress({ current: 0, total: 0, type: '' });
    }
  }

  const handleExportPDF = async () => {
    if (cards.length === 0) {
      toast.error('Nenhuma carta disponível para gerar PDF.');
      return;
    }

    setIsExporting(true);
    setExportProgress({ current: 0, total: cards.length, type: 'PDF' });

    const toastId = toast.loading(`Gerando PDF... (0/${cards.length})`, {
      duration: Infinity,
    });

    try {
      await generateCardsPDF(cards, (current, total) => {
        setExportProgress({ current, total, type: 'PDF' });
        toast.loading(`Gerando PDF... (${current}/${total})`, {
          id: toastId,
        });
      });

      toast.success('PDF gerado com sucesso!', { 
        id: toastId,
        duration: 5000,
      });
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast.error('Erro ao gerar PDF. Tente novamente.', { id: toastId });
    } finally {
      setIsExporting(false);
      setExportProgress({ current: 0, total: 0, type: '' });
    }
  }

  const handleExportPNG = async () => {
    if (cards.length === 0) {
      toast.error('Nenhuma carta disponível para exportar.');
      return;
    }

    setIsExporting(true);
    setExportProgress({ current: 0, total: cards.length, type: 'PNG' });

    const toastId = toast.loading(`Exportando cartas para PNG... (0/${cards.length})`, {
      duration: Infinity,
    });

    try {
      await generateCardsPNG(cards, (current, total) => {
        setExportProgress({ current, total, type: 'PNG' });
        toast.loading(`Exportando cartas para PNG... (${current}/${total})`, {
          id: toastId,
        });
      });

      toast.success('Cartas exportadas para PNG com sucesso!', { 
        id: toastId,
        duration: 5000,
      });
    } catch (error) {
      console.error('Erro ao exportar cartas:', error);
      toast.error('Erro ao exportar cartas. Tente novamente.', { id: toastId });
    } finally {
      setIsExporting(false);
      setExportProgress({ current: 0, total: 0, type: '' });
    }
  }

  const handleClearAllCards = () => {
    try {
      setCards([]);
      localStorage.setItem("tormentator-cards", JSON.stringify([]));
      toast.success("Todas as cartas foram apagadas com sucesso!", {
        duration: 5000,
      });
    } catch (error) {
      console.error('Erro ao limpar todas as cartas:', error);
      toast.error("Erro ao apagar todas as cartas. Tente novamente.");
    }
  }

  const handleSaveCard = (card: CardClasses) => {
    try {
      if (isCreating) {
        const newCards = [...cards, card];
        setCards(newCards);
        localStorage.setItem("tormentator-cards", JSON.stringify(newCards));
        toast.success("Carta criada com sucesso!", {
          duration: 5000,
        });
      } else if (selectedCardIndex !== null) {
        const updatedCards = [...cards];
        updatedCards[selectedCardIndex] = card;
        setCards(updatedCards);
        localStorage.setItem("tormentator-cards", JSON.stringify(updatedCards));
        toast.success("Carta atualizada com sucesso!", {
          duration: 5000,
        });
      } else {
        toast.error("Erro ao salvar a carta. Tente novamente.");
      }
    } catch (error) {
      console.error('Erro ao salvar carta:', error);
      toast.error("Erro ao salvar a carta. Tente novamente.");
    }
  }

  const handleEditCard = (card: CardClasses, index: number) => {
    setSelectedCard(card);
    setOriginalSelectedCard(card);
    setSelectedCardConfig(CardRegistry[card.type].config);
    setSelectedCardIndex(index);
    setIsCreating(false);
    setIsDialogOpen(true);
  }

  const handleDeleteCard = (index: number) => {
    setIsConfirmDeleteCardOpen(true);
    setSelectedCard(cards[index]);
    setSelectedCardIndex(index);
  }

  const handleConfirmDeleteCard = () => {
    if (selectedCard && selectedCardIndex !== null) {
      try {
        const updatedCards = cards.filter((_, i) => i !== selectedCardIndex);
        setCards(updatedCards);
        localStorage.setItem("tormentator-cards", JSON.stringify(updatedCards));
        toast.success("Carta apagada com sucesso!", {
          duration: 5000,
        });
        setSelectedCard(undefined);
        setSelectedCardConfig(undefined);
        setSelectedCardIndex(null);
      } catch (error) {
        console.error('Erro ao deletar carta:', error);
        toast.error("Erro ao apagar a carta. Tente novamente.");
      }
    }
  }

  return (
    <>
      {/* Input de arquivo oculto */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />
    
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
        
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
            <p className="text-lg text-slate-600 dark:text-slate-400">Carregando suas cartas...</p>
          </div>
        )}
        
        {/* Main Content - Show only when not loading */}
        {!loading && (
          <>
            <div className="flex flex-wrap justify-center gap-4 mb-12 flex-col md:flex-row">
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
                <DropdownMenuContent 
                  className="w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg" 
                  style={{ zIndex: 9999 }}
                >
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
                <div 
                  className={`p-8 text-slate-700 dark:text-slate-100 transition-all duration-300 ${
                    isDragOver 
                      ? 'bg-purple-100 dark:bg-purple-900/20 border-2 border-dashed border-purple-400 dark:border-purple-500' 
                      : ''
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
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
                  <p className={`text-sm dark:text-slate-400 mt-2 transition-all duration-300 ${
                    isDragOver ? 'text-purple-600 dark:text-purple-400 font-medium' : ''
                  }`}>
                    {isDragOver 
                      ? 'Solte o arquivo aqui para importar suas cartas!' 
                      : 'Você pode também arrastar um arquivo até esse local para importá-lo.'
                    }
                  </p>
                </div>
              ) : (
                <div 
                  className={`p-8 text-slate-700 dark:text-slate-100 flex flex-col transition-all duration-300 ${
                    isDragOver 
                      ? 'bg-purple-100 dark:bg-purple-900/20 border-2 border-dashed border-purple-400 dark:border-purple-500 rounded-3xl' 
                      : ''
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
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
                            <DropdownMenu open={exportDropdownOpen} onOpenChange={setExportDropdownOpen}>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700"
                                  disabled={isExporting}
                                >
                                  <Download className="h-4 w-4 mr-1" />
                                  {isExporting ? `Exportando... (${exportProgress.current}/${exportProgress.total})` : "Exportar"}
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent 
                                className="w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg" 
                                style={{ zIndex: 9999 }}
                              >
                                <DropdownMenuItem
                                  onSelect={handleExportJSON}
                                  disabled={isExporting}
                                  className="flex items-center gap-3 p-3 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                                >
                                  <FileText className="h-4 w-4" />
                                  <span>Exportar JSON</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onSelect={handleExportPDF}
                                  disabled={isExporting}
                                  className="flex items-center gap-3 p-3 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                                >
                                  <FileDown className="h-4 w-4" />
                                  <span>Exportar PDF</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onSelect={handleExportPNG}
                                  disabled={isExporting}
                                  className="flex items-center gap-3 p-3 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                                >
                                  <FileImage className="h-4 w-4" />
                                  <span>Exportar PNG (ZIP)</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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
                  {isDragOver && (
                    <div className="fixed inset-0 bg-purple-500/20 dark:bg-purple-900/30 flex items-center justify-center z-50 pointer-events-none">
                      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl border-2 border-dashed border-purple-400 dark:border-purple-500">
                        <div className="flex items-center gap-4">
                          <FileUp className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                          <div className="text-xl font-semibold text-purple-600 dark:text-purple-400">
                            Solte o arquivo aqui para importar cartas
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-32 md:gap-x-6 md:gap-y-16 lg:gap-x-6 lg:gap-y-24 xl:gap-x-6 xl:gap-y-32 h-full">
                    {cards.map((card, index) => (
                      <div
                      key={index}
                      className="w-full h-full flex items-baseline justify-center"
                      >
                      <Card
                        card={card}
                        isPrintMode={printMode}
                        index={index}
                        onEdit={() => handleEditCard(card, index)}
                        onDelete={() => handleDeleteCard(index)}
                      />
                      </div>
                    ))}
                    </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Confirmar Importação de Arquivo Dialog */}
      <AlertDialog
        open={isConfirmImportOpen}
        onOpenChange={(open) => {
          if (!open) {
            setPendingImportData(null);
            setIsConfirmImportOpen(false);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogTitle className="text-lg font-semibold">
            Deseja mesmo importar {pendingImportData?.length || 0} carta{(pendingImportData?.length || 0) !== 1 ? 's' : ''}?
          </AlertDialogTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Suas cartas atuais serão mantidas e as novas serão adicionadas ao fim da lista.
          </p>
          <div className="mt-6 flex justify-end gap-4">
            <AlertDialogCancel>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-purple-500 text-white hover:bg-purple-600 focus:ring-2 focus:ring-purple-500 rounded-md px-4 py-2"
              onClick={handleConfirmImport}
            >
              Importar
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirmar Importação de Cartas de Exemplo Dialog */}
      <AlertDialog
        open={isConfirmImportExamplesOpen}
        onOpenChange={setIsConfirmImportExamplesOpen}
      >
        <AlertDialogContent>
          <AlertDialogTitle className="text-lg font-semibold">
            Deseja mesmo importar {EXAMPLE_CARDS.length} cartas de exemplo?
          </AlertDialogTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Suas cartas atuais serão mantidas e as novas serão adicionadas ao fim da lista.
          </p>
          <div className="mt-6 flex justify-end gap-4">
            <AlertDialogCancel>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-purple-500 text-white hover:bg-purple-600 focus:ring-2 focus:ring-purple-500 rounded-md px-4 py-2"
              onClick={handleConfirmImportExamples}
            >
              Importar
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

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

      {/* Confirmar Exclusão de Carta Dialog */}
      <AlertDialog
        open={isConfirmDeleteCardOpen}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedCard(undefined);
            setSelectedCardIndex(null);
            setIsConfirmDeleteCardOpen(false);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogTitle className="text-lg font-semibold">
            Tem certeza que deseja apagar essa carta?
          </AlertDialogTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Essa ação não pode ser desfeita. A carta será removida permanentemente.
          </p>
          <div className="mt-6 flex justify-end gap-4">
            <AlertDialogCancel>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500 rounded-md px-4 py-2" 
              onClick={() => {handleConfirmDeleteCard()}}
            >
              Apagar
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}