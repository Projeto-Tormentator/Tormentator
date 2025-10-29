import Link from "next/link";
import { Github, Heart, ExternalLink, Users, Code } from "lucide-react";
import { PROJECT_CONFIG } from "@/config/links";
import CurrentYear from "../CurrentYear";
import { FaDiscord } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-purple-800 via-purple-700 to-purple-800 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-t border-purple-600/20 dark:border-slate-700/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Sobre o Projeto */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white dark:text-slate-100 flex items-center gap-2">
              <Code className="h-5 w-5 text-yellow-400" />
              Sobre o Tormentator
            </h3>
            <p className="text-sm text-purple-100 dark:text-slate-300 leading-relaxed">
              Uma ferramenta <span className="text-yellow-300 dark:text-yellow-400 font-medium">feita por fãs, para fãs</span> de Tormenta20. 
              Desenvolvida com amor pela comunidade RPGista.
            </p>
            <div className="flex items-center gap-2 text-xs text-purple-200 dark:text-slate-400">
              <Users className="h-4 w-4" />
              <span>Criado por {PROJECT_CONFIG.creator.name}</span>
            </div>
          </div>

          {/* Links Úteis */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white dark:text-slate-100">
              Links Úteis
            </h3>
            <div className="space-y-3">
              <Link 
                href={PROJECT_CONFIG.creator.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-purple-100 dark:text-slate-300 hover:text-white dark:hover:text-white transition-colors duration-200 group"
              >
                <Github className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span>GitHub do Criador</span>
                <ExternalLink className="h-3 w-3 opacity-60" />
              </Link>
              
              <Link 
                href={PROJECT_CONFIG.community.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-purple-100 dark:text-slate-300 hover:text-white dark:hover:text-white transition-colors duration-200 group"
              >
                <FaDiscord className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span>Discord da Comunidade</span>
                <ExternalLink className="h-3 w-3 opacity-60" />
              </Link>
            </div>
          </div>

          {/* Apoie o Projeto */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white dark:text-slate-100 flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-400" />
              Apoie o Projeto
            </h3>
            <p className="text-sm text-purple-100 dark:text-slate-300 mb-3">
              Deseja ajudar no projeto?
            </p>
            <Link 
              href={PROJECT_CONFIG.support.pix}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm font-medium"
            >
              <Heart className="h-4 w-4" />
              <span>Apoiar no Pix</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>

          {/* Disclaimer Tormenta20 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white dark:text-slate-100">
              Disclaimer
            </h3>
            <div className="space-y-3 text-xs text-purple-200 dark:text-slate-400">
              <p>
                <strong className="text-purple-100 dark:text-slate-300">Tormenta20</strong> é uma marca registrada da{" "}
                <Link 
                  href={PROJECT_CONFIG.tormenta20.jamboEditora}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-300 dark:text-yellow-400 hover:text-yellow-200 dark:hover:text-yellow-300 transition-colors duration-200 underline"
                >
                  {PROJECT_CONFIG.tormenta20.jamboEditoraName}
                </Link>
              </p>
              <p>
                Visite o{" "}
                <Link 
                  href={PROJECT_CONFIG.tormenta20.jamboEditora}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-300 dark:text-yellow-400 hover:text-yellow-200 dark:hover:text-yellow-300 transition-colors duration-200 underline"
                >
                  site oficial
                </Link>{" "}
                para mais informações sobre o sistema.
              </p>
              <p className="mt-3 pt-3 border-t border-purple-600/30 dark:border-slate-600/50">
                Este projeto não possui afiliação oficial com a {PROJECT_CONFIG.tormenta20.jamboEditoraName}.
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-purple-600/30 dark:border-slate-600/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-purple-100 dark:text-slate-300 text-center md:text-left">
              <span className="bg-gradient-to-r from-purple-200 to-purple-100 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent font-medium">
                &copy; <CurrentYear /> {PROJECT_CONFIG.name}
              </span>
              <span className="mx-2">•</span>
              <span>Criado por {PROJECT_CONFIG.creator.name}</span>
            </p>
            
            <div className="flex items-center gap-4 text-xs text-purple-200 dark:text-slate-400">
              <Link 
                href={PROJECT_CONFIG.internal.privacy}
                className="hover:text-white dark:hover:text-white transition-colors duration-200"
              >
                Privacidade
              </Link>
              <Link 
                href={PROJECT_CONFIG.internal.terms}
                className="hover:text-white dark:hover:text-white transition-colors duration-200"
              >
                Termos
              </Link>
              <span>•</span>
              <span>v{PROJECT_CONFIG.version}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
