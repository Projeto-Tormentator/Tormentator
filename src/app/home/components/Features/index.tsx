import { Dices, Users, BookType } from "lucide-react";
import Feature, { FeatureProps } from "./Feature";
import { TbCards } from "react-icons/tb";

const FeatureList: FeatureProps[] = [
  {
    title: "Cartas",
    description: "Crie e gerencie cartas de RPG de forma fácil e intuitiva.",
    icon: <TbCards className="h-6 w-6" />,
    accent: "purple",
    link: "/cards",
    isAvailable: true,
    isBeta: true,
  },
  {
    title: "Dados Virtuais",
    description: "Role dados virtuais com suporte a múltiplos tipos e regras personalizadas.",
    icon: <Dices className="h-6 w-6" />,
    accent: "blue",
    link: "/dice",
    isFutureDevelopment: true,
  },
  {
    title: "Criador de Personagens",
    description: "Monte personagens completos com todas as regras do Tormenta 20.",
    icon: <Users className="h-6 w-6" />,
    accent: "green",
    link: "/characters",
    isFutureDevelopment: true,
  },
  {
    title: "Compêndio",
    description: "Acesse um compêndio completo com todas as regras e informações do Tormenta 20.",
    icon: <BookType className="h-6 w-6" />,
    accent: "red",
    link: "/compendium",
    isFutureDevelopment: true,
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Ferramentas Poderosas para Suas Aventuras
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Descubra como o Tormentator pode transformar suas sessões de RPG com ferramentas práticas e intuitivas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FeatureList.map((feature, index) => (
              <Feature
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                accent={feature.accent}
                link={feature.link}
                isAvailable={feature.isAvailable}
                isComingSoon={feature.isComingSoon}
                isBeta={feature.isBeta}
                isNew={feature.isNew}
                isFutureDevelopment={feature.isFutureDevelopment}
              />
            ))}
          </div>
        </div>
      </section>
  );
}