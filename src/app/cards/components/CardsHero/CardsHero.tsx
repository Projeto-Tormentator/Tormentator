import { TbCards } from "react-icons/tb";

export default function CardsHero() {
  return (
    <section className="relative bg-gradient-to-br from-purple-700 via-purple-600 to-slate-700 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-slate-900/20"></div>
      
      <div className="relative container mx-auto px-4 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-400/30 mb-8">
              <TbCards className="h-4 w-4 text-purple-300" />
              <span className="text-sm font-medium text-purple-200">
                Criador de Cartas
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-slate-300 bg-clip-text text-transparent">
              Crie Cartas Personalizadas
            </h1>
            
            
            <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
              Crie cartas de Habilidades, Poderes, Magias, Itens e muito mais...
              <br />
              Use o editor intuitivo para personalizar cada detalhe.
              <br />
            </p>
          
        </div>
      </div>
    </section>
  );
}