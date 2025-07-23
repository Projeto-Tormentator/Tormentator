import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas-pro';
import { CardClasses } from '@/app/cards/domain/registry';
import { CARD_SIZE_DATA } from '@/app/cards/domain/core/CardSize';
import ReactDOM from 'react-dom/client';
import { Card } from '@/app/cards/components/Card';
import React from 'react';
import JSZip from 'jszip';

// Função utilitária para renderizar carta como canvas
async function renderCardToCanvas(card: CardClasses, isBack: boolean = false): Promise<HTMLCanvasElement> {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-99999px';
  container.style.top = '-99999px';
  container.style.width = '100%';
  container.style.height = '100%';
  document.body.appendChild(container);

  const root = ReactDOM.createRoot(container);

  const cardClone = Object.assign({}, card);
  cardClone.withBack = isBack;
  
  const cardProps = {
    card: cardClone,
    isPrintMode: true,
    isFlippedByDefault: isBack
  };
  
  root.render(React.createElement(Card, cardProps));

  await new Promise(resolve => setTimeout(resolve, 100));

  const canvas = await html2canvas(container.firstChild as HTMLElement).then(capturedCanvas => {
    const newCanvas = document.createElement('canvas');
    newCanvas.width = capturedCanvas.width;
    newCanvas.height = capturedCanvas.height;
    const ctx = newCanvas.getContext('2d');
    ctx?.drawImage(capturedCanvas, 0, 0, newCanvas.width, newCanvas.height);
    return newCanvas;
  });

  root.unmount();
  document.body.removeChild(container);

  return canvas;
}

function downloadFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), 'image/png');
  });
}

function getTimestamp(): string {
  return new Date().toISOString().split('T')[0];
}

class CardPDFGenerator {
  document: jsPDF;
  currentX = 0;
  currentY = 0;

  constructor() {
    this.document = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [
        CARD_SIZE_DATA.NORMAL.printDimensions.width,
        CARD_SIZE_DATA.NORMAL.printDimensions.height
      ],
    }).deletePage(1);
  }

  async addCard(card: CardClasses): Promise<void> {
    this.currentX = 0;
    this.currentY = 0;

    const { width: cardWidthMm, height: cardHeightMm } = CARD_SIZE_DATA[card.size].printDimensions;

    const pageOrientation = card.withBack ? 'landscape' : 'portrait';

    this.document.addPage([cardWidthMm * (card.withBack ? 2 : 1), cardHeightMm], pageOrientation);

    if (card.withBack) {
      const backCanvas = await renderCardToCanvas(card, true);
      const backImgData = backCanvas.toDataURL('image/png');
      this.document.addImage(backImgData, 'PNG', this.currentX, this.currentY, cardWidthMm, cardHeightMm);
      this.currentX += cardWidthMm;
    }

    const frontCanvas = await renderCardToCanvas(card, false);
    const frontImgData = frontCanvas.toDataURL('image/png');
    this.document.addImage(frontImgData, 'PNG', this.currentX, this.currentY, cardWidthMm, cardHeightMm);
  }

  generatePDF(): Blob {
    if (this.document.getNumberOfPages() === 0) {
      this.document.addPage([
        CARD_SIZE_DATA.NORMAL.printDimensions.width,
        CARD_SIZE_DATA.NORMAL.printDimensions.height
      ]);
      this.document.text('Nenhuma carta para imprimir', 20, 20);
    }
    return this.document.output('blob');
  }

  downloadPDF(filename: string = 'tormentator-cartas.pdf'): void {
    const blob = this.generatePDF();
    downloadFile(blob, filename);
  }
}

export async function generateCardsPDF(cards: CardClasses[], onProgress?: (current: number, total: number) => void): Promise<void> {
  const generator = new CardPDFGenerator();
  
  for (let i = 0; i < cards.length; i++) {
    await generator.addCard(cards[i]);
    onProgress?.(i + 1, cards.length);
  }
  
  generator.downloadPDF(`tormentator-cartas-${getTimestamp()}.pdf`);
}

export async function generateCardsJSON(cards: CardClasses[], onProgress?: (current: number, total: number) => void): Promise<void> {
  try {
    onProgress?.(0, cards.length);
    const exportCards = [];
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      exportCards.push(card.export());
      onProgress?.(i + 1, cards.length);
    }

    const cardsJson = JSON.stringify(exportCards, null, 2);
    const blob = new Blob([cardsJson], { type: 'application/json' });
    downloadFile(blob, `tormentator-cartas-${getTimestamp()}.json`);
  } catch (error) {
    throw new Error('Erro ao exportar cartas para JSON');
    console.error('Erro ao exportar cartas para JSON:', error);
  }
}

export async function generateCardsPNG(cards: CardClasses[], onProgress?: (current: number, total: number) => void): Promise<void> {
  const zip = new JSZip();
  
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    
    const frontCanvas = await renderCardToCanvas(card, false);
    const frontBlob = await canvasToBlob(frontCanvas);
    
    const cardTitle = card.title.text || 'Carta Sem Título';
    const fileName = `${i + 1} - ${cardTitle}.png`;
    
    zip.file(fileName, frontBlob);
    
    if (card.withBack) {
      const backCanvas = await renderCardToCanvas(card, true);
      const backBlob = await canvasToBlob(backCanvas);
      const backFileName = `${i + 1} - ${cardTitle} (Verso).png`;
      zip.file(backFileName, backBlob);
    }
    
    onProgress?.(i + 1, cards.length);
  }
  
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  downloadFile(zipBlob, `tormentator-cartas-${getTimestamp()}.zip`);
}