"use client";
import Link from "next/link";
import { NavItem } from "./NavItem";
import { ThemeToggler } from "./ThemeToggler";
import { TormentaFont } from "../Fonts/Tormenta";
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu as MenuIcon, X, Home, Github, Info } from 'lucide-react';
import { GradientIcon } from "./Logo";
import { PROJECT_CONFIG } from "@/config/links";
import CurrentYear from "@/components/CurrentYear";
import { FaDiscord } from "react-icons/fa6";

const MenuItems = [
  {
    name: "Início",
    href: "/",
    icon: Home,
  },
  {
    name: "Sobre",
    href: "/about",
    icon: Info,
  }
]

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-purple-200/50 dark:border-slate-700/50 shadow-lg shadow-purple-500/5 dark:shadow-slate-900/20 w-lvw">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className={`text-slate-900 dark:text-slate-100 text-xl md:text-2xl font-bold gap-2 ${TormentaFont.className} flex items-center transition-all duration-300 group relative overflow-hidden rounded-xl px-3 py-2 hover:scale-105 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-purple-600/10 dark:hover:from-purple-400/10 dark:hover:to-purple-500/10`}>
              <GradientIcon
                className="hover:animate-[spin_3s_linear_infinite] w-8 h-8 transition-transform duration-300 antialiased relative z-10"
                gradientDirection="to-bottom"
                gradientColors={["#8b5cf6", "#a855f7"]}
              />
              <span className="bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-400 dark:to-purple-500 bg-clip-text text-transparent relative z-10">
                {PROJECT_CONFIG.name}
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <ul className="flex space-x-1 text-sm">
              {MenuItems.map((item) => (
                <NavItem
                  name={item.name}
                  href={item.href}
                  icon={item.icon}
                  key={item.name}
                  isActive={item.href === pathname}
                />
              ))}
            </ul>
            
            {/* External Links */}
            <div className="flex items-center space-x-1 ml-4 pl-4 border-l border-purple-200/50 dark:border-slate-600/50">
              <Link 
                href={PROJECT_CONFIG.project.repository} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-slate-800 transition-all duration-200"
                title="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link 
                href={PROJECT_CONFIG.community.discord} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all duration-200"
                title="Discord"
              >
                <FaDiscord className="h-5 w-5" />
              </Link>
              <div className="ml-2 pl-2 border-l border-purple-200/50 dark:border-slate-600/50">
                <ThemeToggler />
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggler />
            <button
              onClick={toggleMenu}
              className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 rounded-lg p-2 transition-all duration-200 hover:bg-purple-50 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-in slide-in-from-top-2 duration-300">
            <div className="mx-2 mt-3 p-4 space-y-3 bg-white/95 dark:bg-slate-800/95 rounded-xl shadow-xl border border-purple-200/50 dark:border-slate-600/50 backdrop-blur-md">
              
              {/* Navigation Items */}
              <ul className="space-y-2">
                {MenuItems.map((item) => (
                  <div key={item.name} onClick={() => setIsMenuOpen(false)}>
                    <NavItem
                      name={item.name}
                      href={item.href}
                      icon={item.icon}
                      isActive={item.href === pathname}
                    />
                  </div>
                ))}
              </ul>
              
              {/* Mobile External Links */}
              <div className="pt-3 mt-4 border-t border-purple-200/50 dark:border-slate-600/50">
                <div className="flex items-center justify-center space-x-4">
                  <Link 
                    href={PROJECT_CONFIG.project.repository} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-slate-700 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Github className="h-4 w-4" />
                    <span className="text-sm">GitHub</span>
                  </Link>
                  <Link 
                    href={PROJECT_CONFIG.community.discord} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaDiscord className="h-4 w-4" />
                    <span className="text-sm">Discord</span>
                  </Link>
                </div>
              </div>
              
              {/* Mobile Footer */}
              <div className="pt-3 mt-4 border-t border-purple-200/50 dark:border-slate-600/50">
                <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                  {PROJECT_CONFIG.name} © <CurrentYear />
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}