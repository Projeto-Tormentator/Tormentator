import { Button } from "@/components/ui/button";
import { PROJECT_CONFIG } from "@/config/links";
import { Code, Shield, Star, Users } from "lucide-react";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa6";

export default function Community() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Feito pela Comunidade, Para a Comunidade
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-12">
            O Tormentator é um projeto open source desenvolvido por fãs apaixonados por Tormenta 20. 
            Junte-se à nossa comunidade e ajude a tornar o projeto ainda melhor!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 rounded-full mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Open Source
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Código aberto e auditável por qualquer pessoa
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Comunidade Ativa
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Discord ativo com desenvolvedores e usuários
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Sempre Gratuito
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Todas as ferramentas sempre serão gratuitas
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={PROJECT_CONFIG.community.discordInvite} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
                <FaDiscord className="h-5 w-5 mr-2" />
                Entrar no Discord
              </Button>
            </Link>
            
            <Link href={PROJECT_CONFIG.project.repository} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 px-8 py-4 text-lg font-semibold transition-all duration-300">
                <Code className="h-5 w-5 mr-2" />
                Contribuir no GitHub
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}