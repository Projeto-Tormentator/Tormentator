export const PROJECT_CONFIG = {
  name: "Tormentator",
  version: "0.1.0",
  description: "HUB de ferramentas para Tormenta 20",
  
  creator: {
    name: "Arthur Santos",
    github: "https://github.com/santos-arthur",
    githubUsername: "santos-arthur"
  },
  
  project: {
    repository: "https://github.com/Projeto-Tormentator/Tormentator",
    homepage: "https://tormentator.com.br",
    issues: "https://github.com/Projeto-Tormentator/Tormentator/issues",
    discussions: "https://github.com/Projeto-Tormentator/Tormentator/discussions"
  },
  
  community: {
    discord: "https://discord.gg/BvkGZzHCRF"
  },
  
  support: {
    pix: "https://livepix.gg/santosarthur",
  },
  
  tormenta20: {
    systemName: "Tormenta20",
    jamboEditoraName: "Jambô Editora",
    jamboEditora: "https://jamboeditora.com.br/",
  },
  
  google: {
    analytics: {
      enabled: true,
      description: "Dados anônimos de uso para melhorar a experiência do usuário"
    },
    cloudPlatform: {
      enabled: true,
      description: "Hospedagem via Firebase Hosting no Google Cloud Platform"
    },
    termsOfService: "https://policies.google.com/terms",
    privacyPolicy: "https://policies.google.com/privacy"
  },

  internal: {
    home: "/",
    privacy: "/privacy",
    terms: "/terms",
    cards: "/cards",
  },

  terms: {
    lastUpdate: "11/07/2025",
    url: "/terms",
    text: "Termos de Uso"
  },

  privacy: {
    lastUpdate: "11/07/2025",
    url: "/privacy",
    text: "Política de Privacidade"
  }
} as const;

export const getLink = (category: keyof typeof PROJECT_CONFIG, key: string) => {
  const section = PROJECT_CONFIG[category] as Record<string, string>;
  return section[key] || "#";
};

export const getCreatorInfo = () => PROJECT_CONFIG.creator;

export const getProjectInfo = () => ({
  name: PROJECT_CONFIG.name,
  version: PROJECT_CONFIG.version,
  description: PROJECT_CONFIG.description
});

export const getCommunityLinks = () => PROJECT_CONFIG.community;

export const getSupportLinks = () => PROJECT_CONFIG.support;

export const getTormenta20Links = () => PROJECT_CONFIG.tormenta20;

export const getGoogleServices = () => PROJECT_CONFIG.google;

export const getInternalLinks = () => PROJECT_CONFIG.internal;
