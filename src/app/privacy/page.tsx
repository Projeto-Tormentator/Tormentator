import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, Cookie, Lock, MessageSquare, RefreshCw } from "lucide-react";
import { PROJECT_CONFIG } from "@/config/links";

export const metadata: Metadata = {
  title: `Política de Privacidade - ${PROJECT_CONFIG.name}`,
  description: "Política de privacidade do Tormentator. Saiba como coletamos, usamos e protegemos suas informações pessoais.",
  keywords: ["Tormentator", "política de privacidade", "proteção de dados", "LGPD", "privacidade"],
  openGraph: {
    title: `Política de Privacidade - ${PROJECT_CONFIG.name}`,
    description: "Política de privacidade do Tormentator. Saiba como coletamos, usamos e protegemos suas informações pessoais.",
    url: `${PROJECT_CONFIG.project.homepage}/privacy`,
    siteName: PROJECT_CONFIG.name,
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary",
    title: `Política de Privacidade - ${PROJECT_CONFIG.name}`,
    description: "Política de privacidade do Tormentator. Saiba como coletamos, usamos e protegemos suas informações pessoais.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-slate-100 dark:from-slate-950 dark:to-purple-950 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao início
          </Link>
          
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-purple-200/50 dark:border-slate-700/50 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                {PROJECT_CONFIG.privacy.text}
              </h1>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Última atualização: {PROJECT_CONFIG.privacy.lastUpdate}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-purple-200/50 dark:border-slate-700/50 p-8 space-y-8">
          
          {/* Resumo Executivo */}
          <section>
            <div className="bg-green-50 dark:bg-green-950/30 p-6 rounded-lg border-l-4 border-green-500">
              <h2 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Resumo: Sua Privacidade é Protegida
              </h2>
              <ul className="text-green-800 dark:text-green-200 space-y-2">
                <li>• <strong>Não coletamos dados pessoais</strong></li>
                <li>• <strong>Não armazenamos informações em servidor</strong></li>
                <li>• <strong>Tudo funciona localmente no seu navegador</strong></li>
                <li>• <strong>Apenas cookies para navegação durante o BETA</strong></li>
              </ul>
            </div>
          </section>

          {/* Sobre o Tormentator */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              1. Sobre o {PROJECT_CONFIG.name}
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                O {PROJECT_CONFIG.name} é um HUB de ferramentas open source desenvolvido pela comunidade 
                para Mestres e Jogadores de Tormenta 20. Nossa prioridade é fornecer ferramentas 
                úteis sem comprometer sua privacidade.
              </p>
              <p>
                <strong>Importante:</strong> Somos um projeto de fã para fã, não comercial, 
                e não temos interesse em coletar ou monetizar seus dados.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <Cookie className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              2. Cookies e Armazenamento Local
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Utilizamos cookies essenciais e de análise para melhorar sua experiência de navegação:
              </p>
              <ul>
                <li><strong>Tema do site:</strong> Lembra se você prefere modo claro ou escuro</li>
                <li><strong>Preferências das ferramentas:</strong> Salva configurações locais para facilitar o uso</li>
                <li><strong>Google Analytics:</strong> Coleta dados anônimos de uso para melhorar o site</li>
              </ul>
              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border-l-4 border-blue-500 mt-4">
                <p className="text-blue-800 dark:text-blue-200">
                  <strong>Cookies essenciais são armazenados apenas no seu navegador</strong> e não são 
                  enviados para nenhum servidor externo. Cookies de análise são processados pelo Google Analytics.
                </p>
              </div>
            </div>
          </section>

          {/* Google Analytics e Serviços */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <RefreshCw className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              3. Google Analytics e Serviços do Google
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Utilizamos os seguintes serviços do Google para melhorar nosso site:
              </p>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg mt-4">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Google Analytics</h3>
                <p>
                  Coletamos dados anônimos de uso para entender como os usuários interagem com o site, 
                  incluindo páginas visitadas, tempo de permanência e origem do tráfego.
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg mt-4">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Google Cloud Platform & Firebase</h3>
                <p>
                  Nosso site é hospedado no Google Cloud Platform usando Firebase Hosting, 
                  que pode coletar logs de acesso básicos para fins de segurança e desempenho.
                </p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border-l-4 border-amber-500 mt-4">
                <p className="text-amber-800 dark:text-amber-200">
                  <strong>Importante:</strong> Todos os dados coletados são anônimos e utilizados apenas 
                  para melhorar a experiência do usuário. Você pode desabilitar cookies de análise 
                  nas configurações do seu navegador.
                </p>
              </div>
            </div>
          </section>

          {/* Segurança */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <Lock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              4. Segurança e Dados Locais
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Esta versão BETA do Tormentator foi projetada para funcionar totalmente 
                no seu navegador, garantindo que:
              </p>
              <ul className="list-disc pl-8 pt-2">
                <li>Geração das catas acontece localmente</li>
                <li>Nenhum dado é enviado para servidores externos</li>
                <li>Seus dados de personagem e campanha ficam apenas no seu dispositivo</li>
              </ul>
              <p className="mt-4">
                Estamos comprometidos em manter seus dados seguros e privados. 
                Esta abordagem garante que você tenha controle total sobre suas informações.
              </p>
            </div>
          </section>

          {/* Contato */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              5. Contato e Transparência
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Dúvidas sobre privacidade? Entre em contato:
              </p>
              <ul>
                <li>
                  <strong>Discord:</strong> 
                  <a href={PROJECT_CONFIG.community.discord} className="text-purple-600 dark:text-purple-400 hover:underline ml-2">
                    {PROJECT_CONFIG.community.discord}
                  </a>
                </li>
                <li>
                  <strong>GitHub:</strong> 
                  <a href={PROJECT_CONFIG.creator.github} className="text-purple-600 dark:text-purple-400 hover:underline ml-2">
                    {PROJECT_CONFIG.creator.githubUsername}
                  </a>
                </li>
              </ul>
              <p>
                Como projeto open source, todo o código é auditável e transparente. 
                Você pode verificar pessoalmente que não coletamos dados.
              </p>
            </div>
          </section>

          {/* Alterações */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <RefreshCw className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              6. Alterações nesta Política
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Esta política pode ser atualizada conforme o projeto evolui. Sempre manteremos 
                o compromisso de não coletar dados desnecessários e informaremos sobre qualquer 
                mudança significativa.
              </p>
              <p>
                <strong>Versão atual:</strong> 1.0 (BETA)
              </p>
            </div>
          </section>

          {/* Footer da Política */}
          <section className="pt-8 border-t border-slate-200 dark:border-slate-700">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <p className="text-slate-600 dark:text-slate-400 text-sm text-center">
                Esta política de privacidade reflete nosso compromisso com a transparência e
                privacidade da comunidade de Tormenta 20.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
