import { Metadata } from "next";
import { PROJECT_CONFIG } from "@/config/links";
import { 
  Zap, 
  Sparkles, 
  Code, 
  Gamepad2,
  ScrollText,
  HandMetal
} from "lucide-react";
import Link from "next/link";
import ProfileImage from "@/components/ProfileImage";

export const metadata: Metadata = {
  title: `Sobre - ${PROJECT_CONFIG.name}`,
  description: "Conheça a história por trás do Tormentator, um HUB de ferramentas para Tormenta 20 criado por Arthur Santos.",
  keywords: ["Tormentator", "Tormenta 20", "RPG", "ferramentas", "Arthur Santos", "história"],
  openGraph: {
    title: `Sobre - ${PROJECT_CONFIG.name}`,
    description: "Conheça a história por trás do Tormentator, um HUB de ferramentas para Tormenta 20 criado por Arthur Santos.",
    url: `${PROJECT_CONFIG.project.homepage}/about`,
    siteName: PROJECT_CONFIG.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Sobre - ${PROJECT_CONFIG.name}`,
    description: "Conheça a história por trás do Tormentator, um HUB de ferramentas para Tormenta 20 criado por Arthur Santos.",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-purple-950">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-400 dark:to-purple-500 mb-6 shadow-lg">
              <Zap className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Sobre o{" "}
              <span className="bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-400 dark:to-purple-500 bg-clip-text text-transparent">
                Tormentator
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-100 max-w-2xl mx-auto">
              A história por trás desse HUB de ferramentas para Tormenta 20
            </p>
          </div>

          {/* Story Timeline */}
          <div className="space-y-12">
            {/* Origins */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-purple-200/50 dark:border-slate-700/50">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                    <Gamepad2 className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                    O Início da Jornada
                  </h2>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-slate-700 dark:text-slate-100 mb-4">
                      Tudo começou quando eu, <strong>Arthur Santos</strong>, precisei gerar cartas dos poderes e habilidades 
                      de jogadores para uma campanha de Fim dos Tempos. A maioria dos jogadores nunca havia jogado RPG, 
                      e os poucos que tinham experiência jamais haviam jogado Tormenta 20.
                    </p>
                    <p className="text-slate-700 dark:text-slate-100">
                      Para tornar a experiência mais acessível e visual, criei cartas baseadas no estilo das cartas de 
                      Pokémon. O resultado foi fantástico - todos adoraram! As cartas transformaram a experiência de 
                      jogo, tornando-a mais intuitiva e divertida.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* The Problem */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-purple-200/50 dark:border-slate-700/50">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 flex items-center justify-center">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                    O Desafio
                  </h2>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-slate-700 dark:text-slate-100 mb-4">
                      O tempo passou e, inevitavelmente, perdi o script que gerava as cartas. 
                      Quando precisei criar novas cartas, tive que recomeçar do zero. 
                      Foi nesse momento que uma ideia brilhante surgiu...
                    </p>
                    <p className="text-slate-700 dark:text-slate-100">
                      <strong>Por que não criar uma ferramenta web que ajudasse outros mestres com isso?</strong><br />
                      Assim nasceu a visão do que se tornaria o Tormentator.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* The Name */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-purple-200/50 dark:border-slate-700/50">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center">
                    <HandMetal className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                    A Inspiração do Nome
                  </h2>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-slate-700 dark:text-slate-100 mb-4">
                      Algum tempo depois, fui ao show do <strong>Massacration</strong>, a Banda da Galera, 
                      e foi lá que me surgiu um lampejo de inspiração! 
                    </p>
                    <p className="text-slate-700 dark:text-slate-100 mb-4">
                      <strong>Tormentator</strong> - um nome que os próprios deuses do metal dariam para uma música 
                      em homenagem à Tempestade Rubra. A sonoridade era perfeita, combinando a essência do 
                      Tormenta 20 com a força e energia do metal.
                    </p>
                    <p className="text-slate-700 dark:text-slate-100">
                      Gostei tanto da ideia que decidi seguir com esse nome para sempre!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* The Vision */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-purple-200/50 dark:border-slate-700/50">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                    A Visão do Futuro
                  </h2>
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-slate-700 dark:text-slate-100 mb-4">
                      Depois de um tempo, decidi criar o Tormentator oficialmente. Desde o início, 
                      já visualizava que ele poderia se tornar um <strong>HUB para futuras ferramentas</strong>.
                    </p>
                    <p className="text-slate-700 dark:text-slate-100">
                      Quem sabe o que nos espera? O potencial é infinito, e a jornada está apenas começando!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy */}
          <div className="mt-16 bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600 rounded-2xl p-8 text-center shadow-2xl">
            <ScrollText className="h-8 w-8 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Nossa Filosofia
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              O Tormentator é um projeto open source, criado pela comunidade para a comunidade. 
              <br />
              Assim como Tanna-Toh, acreditamos que as melhores ferramentas surgem da colaboração e do compartilhamento de conhecimento.
            </p>
            <p className="text-lg text-white/90 mt-4">
              Se você deseja contribuir, seja com código, ideias ou feedback, entre em contato! 
              Estamos sempre abertos a novas colaborações.
            </p>
          </div>

          {/* Creator Info */}
          <div className="mt-16 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-purple-200/50 dark:border-slate-700/50">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 p-1 shadow-2xl">
                    <ProfileImage 
                      src="/assets/images/arthur-santos.png" 
                      alt="Arthur Santos"
                      className="w-full h-full object-cover rounded-full"
                      width={128}
                      height={128}
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-lg flex items-center justify-center">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                </div>
              </div>

              {/* Creator Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  Criador
                </h2>
                <h3 className="text-2xl font-semibold text-purple-600 dark:text-purple-400">
                  Arthur Santos
                </h3>
                <h4 className="text-lg text-purple-700 dark:text-purple-300 mb-4">                  
                  Engenheiro de Software, entusiasta de RPG e dono de uma BMW velha.
                </h4>
                <p className="text-lg text-slate-700 dark:text-slate-100 mb-4 leading-relaxed">
                  Apaixonado por Tormenta20 desde o primeiro contato, sempre tive vontade de ser mais ativo na comunidade, e esse projeto é a realização desse desejo.
                </p>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  &quot;Ninguém nunca lê essas citações, por que eu perderia meu tempo escrevendo uma?&quot;
                </p>
                
                {/* Social Links */}
                <div className="flex justify-center md:justify-start gap-4">
                  <Link 
                    href={PROJECT_CONFIG.creator.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">GitHub</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
