import { Metadata } from "next";
import { PROJECT_CONFIG } from "@/config/links";
import HomePage from "./home/page";

export const metadata: Metadata = {
  title: PROJECT_CONFIG.name,
  description: PROJECT_CONFIG.description,
  keywords: ["Tormentator", "Tormenta 20", "RPG", "ferramentas", "cartas", "gerador", "HUB", "mesa", "jogo"],
  authors: [{ name: PROJECT_CONFIG.creator.name, url: PROJECT_CONFIG.creator.github }],
  creator: PROJECT_CONFIG.creator.name,
  openGraph: {
    title: PROJECT_CONFIG.name,
    description: PROJECT_CONFIG.description,
    url: PROJECT_CONFIG.project.homepage,
    images: [
      {
        url: `${PROJECT_CONFIG.project.homepage}/logo-com-fundo.png`,
        width: 512,
        height: 512,
        alt: PROJECT_CONFIG.name,
      }
    ],
    siteName: PROJECT_CONFIG.name,
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: PROJECT_CONFIG.name,
    description: PROJECT_CONFIG.description,
    creator: `@${PROJECT_CONFIG.creator.githubUsername}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function Home() {
  return (
    <HomePage />
  );
}
