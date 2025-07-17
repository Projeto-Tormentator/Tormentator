import { PROJECT_CONFIG } from "@/config/links";
import { Metadata } from "next";
import CardsHero from "./components/CardsHero/CardsHero";
import SaveCardsAlert from "./components/SaveCardsAlert/SaveCardsAlert";
import CardList from "./components/CardList/CardList";

export const metadata: Metadata = {
  title: `Criador de Cartas - ${PROJECT_CONFIG.name}`,
  description: "Crie e personalize cartas para suas aventuras em Tormenta 20. Ferramenta interativa para gerar cartas de poderes, magias, itens e muito mais para suas mesas de RPG.",
  keywords: ["Tormenta 20", "cartas", "RPG", "criador", "gerador", "poderes", "magias", "itens", "mesa", "jogo"],
  authors: [{ name: PROJECT_CONFIG.creator.name, url: PROJECT_CONFIG.creator.github }],
  creator: PROJECT_CONFIG.creator.name,
  openGraph: {
    title: `Criador de Cartas - ${PROJECT_CONFIG.name}`,
    description: "Crie e personalize cartas para suas aventuras em Tormenta 20. Ferramenta interativa para gerar cartas de poderes, magias, itens e muito mais para suas mesas de RPG.",
    url: `${PROJECT_CONFIG.project.homepage}/cards`,
    siteName: PROJECT_CONFIG.name,
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: `Criador de Cartas - ${PROJECT_CONFIG.name}`,
    description: "Crie e personalize cartas para suas aventuras em Tormenta 20. Ferramenta interativa para gerar cartas de poderes, magias, itens e muito mais para suas mesas de RPG.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function CardsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <CardsHero />

      {/* Alert Section */}
      <SaveCardsAlert />
      
    </div>
  );
}
