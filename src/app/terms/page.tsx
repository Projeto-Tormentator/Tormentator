import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Scale, Code, Users, CheckCircle, AlertTriangle, ShieldAlert, GitPullRequest, RefreshCw, MessageCircle } from "lucide-react";
import { PROJECT_CONFIG } from "@/config/links";

export const metadata: Metadata = {
  title: `Termos de Uso - ${PROJECT_CONFIG.name}`,
  description: "Termos de uso do Tormentator. Conheça os direitos, responsabilidades e condições para usar nossa plataforma.",
  keywords: ["Tormentator", "termos de uso", "condições", "responsabilidades", "direitos"],
  openGraph: {
    title: `Termos de Uso - ${PROJECT_CONFIG.name}`,
    description: "Termos de uso do Tormentator. Conheça os direitos, responsabilidades e condições para usar nossa plataforma.",
    url: `${PROJECT_CONFIG.project.homepage}/terms`,
    siteName: PROJECT_CONFIG.name,
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary",
    title: `Termos de Uso - ${PROJECT_CONFIG.name}`,
    description: "Termos de uso do Tormentator. Conheça os direitos, responsabilidades e condições para usar nossa plataforma.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
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
              <Scale className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                {PROJECT_CONFIG.terms.text}
              </h1>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Última atualização: {PROJECT_CONFIG.terms.lastUpdate}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-purple-200/50 dark:border-slate-700/50 p-8 space-y-8">
          
          {/* Aceitação dos Termos */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              1. Aceitação dos Termos
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Ao acessar e usar o Tormentator, você concorda em cumprir e estar vinculado a estes termos de uso. 
                Se você não concordar com qualquer parte destes termos, não deve usar nosso serviço.
              </p>
            </div>
          </section>

          {/* Sobre o Projeto */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <Code className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              2. Sobre o Projeto
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none space-y-4">
              <p>
                O {PROJECT_CONFIG.name} é um projeto <strong>open source</strong> desenvolvido por {PROJECT_CONFIG.creator.name}, 
                um fã da comunidade de Tormenta20. Esta ferramenta foi criada com amor pela comunidade 
                RPGista para facilitar e aprimorar a experiência de jogo.
              </p>
              <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg border-l-4 border-purple-500">
                <p className="font-medium text-purple-900 dark:text-purple-100 mb-2">
                  📜 Licença: MIT License
                </p>
                <p className="text-purple-800 dark:text-purple-200">
                  Este projeto está licenciado sob a MIT License, permitindo uso, modificação e distribuição 
                  desde que a atribuição adequada seja mantida.
                </p>
              </div>
            </div>
          </section>

          {/* Uso Permitido */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              3. Uso Permitido
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>Você está autorizado a:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Usar o Tormentator para fins pessoais e não comerciais</li>
                <li>Replicar, modificar e distribuir o código-fonte</li>
                <li>Criar trabalhos derivados baseados no projeto</li>
                <li>Usar a ferramenta em suas campanhas de RPG</li>
              </ul>
              
              <p className="mt-4"><strong>Condições para replicação:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Manter a atribuição aos desenvolvedores originais</li>
                <li>Incluir uma cópia da licença MIT</li>
                <li>Referenciar o projeto original em trabalhos derivados</li>
                <li>Não remover os créditos e avisos de copyright</li>
              </ul>
            </div>
          </section>

          {/* Disclaimer Tormenta20 */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              4. Propriedade Intelectual de Terceiros
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border-l-4 border-amber-500">
                <p className="font-medium text-amber-900 dark:text-amber-100 mb-2">
                  ⚖️ Importante: Direitos da {PROJECT_CONFIG.tormenta20.jamboEditoraName}
                </p>
                <p className="text-amber-800 dark:text-amber-200">
                  <strong>{PROJECT_CONFIG.tormenta20.systemName}</strong> é uma marca registrada da{" "}
                  <a 
                    href={PROJECT_CONFIG.tormenta20.jamboEditora}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-amber-600 dark:text-amber-400 underline hover:text-amber-800 dark:hover:text-amber-200"
                  >
                    {PROJECT_CONFIG.tormenta20.jamboEditoraName}
                  </a>. 
                  Este projeto não possui afiliação oficial com a {PROJECT_CONFIG.tormenta20.jamboEditoraName} e respeita todos os direitos autorais do sistema.
                </p>
              </div>
            </div>
          </section>

          {/* Limitação de Responsabilidade */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <ShieldAlert className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              5. Limitação de Responsabilidade
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                O Tormentator é fornecido &quot;como está&quot;, sem garantias de qualquer tipo. Os desenvolvedores 
                não se responsabilizam por:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Perda de dados ou informações</li>
                <li>Interrupções no serviço</li>
                <li>Danos diretos ou indiretos decorrentes do uso</li>
                <li>Problemas técnicos ou bugs</li>
              </ul>
            </div>
          </section>

          {/* Serviços do Google */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <RefreshCw className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              6. Serviços do Google
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Este site utiliza serviços do Google que estão sujeitos aos seus próprios termos:
              </p>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg mt-4">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Google Analytics</h3>
                <p>
                  Utilizamos o Google Analytics para coletar dados anônimos sobre o uso do site. 
                  Esses dados nos ajudam a melhorar a experiência do usuário e compreender como 
                  as ferramentas são utilizadas.
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg mt-4">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Google Cloud Platform & Firebase</h3>
                <p>
                  Nosso site é hospedado no Google Cloud Platform usando Firebase Hosting. 
                  O Google pode coletar logs de acesso e outros dados técnicos para fins de 
                  segurança, desempenho e disponibilidade do serviço.
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border-l-4 border-blue-500 mt-4">
                <p className="text-blue-800 dark:text-blue-200">
                  <strong>Importante:</strong> Ao usar este site, você também concorda com os 
                  Termos de Serviço do Google e a Política de Privacidade do Google para 
                  os serviços mencionados acima.
                </p>
              </div>
            </div>
          </section>

          {/* Responsabilidades */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <ShieldAlert className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              6. Responsabilidades e Limitações
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Ao usar o Tormentator, você concorda em isentar os desenvolvedores de qualquer responsabilidade 
                por danos diretos, indiretos, acidentais, consequenciais ou punitivos decorrentes do uso ou 
                da incapacidade de uso da ferramenta. Isso inclui, mas não se limita a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Interrupções ou cessação do serviço</li>
                <li>Erros, bugs ou vulnerabilidades no software</li>
                <li>Perda de dados, receitas ou lucros</li>
                <li>Danos à sua propriedade ou equipamentos</li>
              </ul>
              
              <p className="mt-4">
                O Tormentator pode conter links para sites de terceiros. Não nos responsabilizamos pelo conteúdo, 
                políticas de privacidade ou práticas de sites vinculados. Recomendamos revisar os termos e 
                políticas de cada site visitado.
              </p>
            </div>
          </section>

          {/* Contribuições */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <GitPullRequest className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              7. Contribuições da Comunidade
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Contribuições são bem-vindas! Ao contribuir com código, documentação ou outros materiais, 
                você concorda que suas contribuições serão licenciadas sob a mesma licença MIT do projeto.
              </p>
              <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border-l-4 border-green-500 mt-4">
                <p className="font-medium text-green-900 dark:text-green-100 mb-2">
                  🤝 Como Contribuir
                </p>
                <p className="text-green-800 dark:text-green-200">
                  Acesse nosso{" "}
                  <a 
                    href={PROJECT_CONFIG.project.repository} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-600 dark:text-green-400 underline hover:text-green-800 dark:hover:text-green-200"
                  >
                    repositório no GitHub
                  </a>{" "}
                  para submeter issues, pull requests ou sugestões de melhorias.
                </p>
              </div>
            </div>
          </section>

          {/* Alterações nos Termos */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <RefreshCw className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              9. Alterações nos Termos
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Reservamos o direito de modificar estes termos a qualquer momento. As alterações entrarão 
                em vigor imediatamente após a publicação. É sua responsabilidade revisar periodicamente 
                estes termos.
              </p>
            </div>
          </section>

          {/* Contato */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              8. Contato
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                Para dúvidas sobre estes termos, entre em contato através:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  GitHub:{" "}
                  <a 
                    href={PROJECT_CONFIG.creator.github}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-600 dark:text-purple-400 underline hover:text-purple-800 dark:hover:text-purple-200"
                  >
                    {PROJECT_CONFIG.creator.githubUsername}
                  </a>
                </li>
                <li>
                  Discord:{" "}
                  <a 
                    href={PROJECT_CONFIG.community.discord}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-600 dark:text-purple-400 underline hover:text-purple-800 dark:hover:text-purple-200"
                  >
                    {PROJECT_CONFIG.community.discord}
                  </a>
                </li>
              </ul>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
