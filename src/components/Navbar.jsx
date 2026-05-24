import { useState } from 'react';
import { Menu, User, X } from 'lucide-react';

export default function Navbar({ currentView, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (event, targetId) => {
    if (currentView !== 'home') {
      event.preventDefault();
      onNavigate('home');

      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed z-50 w-full border-b border-[#e5e5e5] bg-[#fcfcfc]/90 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          <a
            href="#"
            onClick={(event) => handleNavClick(event, 'hero')}
            className="group flex items-center"
          >
            <img
              src="/assets/logo.svg"
              alt="Taura Bots"
              className="h-10 w-auto transition-transform group-hover:scale-[1.02] md:h-11"
            />
          </a>

          <div className="hidden items-center space-x-8 font-tech text-lg font-bold uppercase tracking-wider md:flex">
            <a
              href="#sobre"
              onClick={(event) => handleNavClick(event, 'sobre')}
              className="transition-colors hover:text-[#888888]"
            >
              Sobre
            </a>
            <a
              href="#projetos"
              onClick={(event) => handleNavClick(event, 'projetos')}
              className="transition-colors hover:text-[#888888]"
            >
              Projetos
            </a>
            <a
              href="#patrocinadores"
              onClick={(event) => handleNavClick(event, 'patrocinadores')}
              className="transition-colors hover:text-[#888888]"
            >
              Patrocinadores
            </a>
            <a
              href="#talentos"
              onClick={(event) => handleNavClick(event, 'talentos')}
              className="transition-colors hover:text-[#888888]"
            >
              Banco de Talentos
            </a>
            <button
              onClick={() => onNavigate('login')}
              className="group flex items-center gap-2 border-2 border-[#0a0a0a] px-4 py-1.5 transition-all hover:bg-[#0a0a0a] hover:text-[#fcfcfc]"
            >
              <User className="h-5 w-5 transition-transform group-hover:scale-110" />
              <span className="text-sm">Portal</span>
            </button>
          </div>

          <button
            className="text-[#0a0a0a] md:hidden"
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute w-full border-b border-[#e5e5e5] bg-[#fcfcfc] md:hidden">
          <div className="flex flex-col space-y-4 px-6 pb-6 pt-2 font-tech text-xl font-bold uppercase tracking-wider">
            <a
              href="#sobre"
              onClick={(event) => handleNavClick(event, 'sobre')}
              className="block hover:text-[#888888]"
            >
              Sobre
            </a>
            <a
              href="#projetos"
              onClick={(event) => handleNavClick(event, 'projetos')}
              className="block hover:text-[#888888]"
            >
              Projetos
            </a>
            <a
              href="#patrocinadores"
              onClick={(event) => handleNavClick(event, 'patrocinadores')}
              className="block hover:text-[#888888]"
            >
              Patrocinadores
            </a>
            <a
              href="#talentos"
              onClick={(event) => handleNavClick(event, 'talentos')}
              className="block hover:text-[#888888]"
            >
              Banco de Talentos
            </a>
            <button
              onClick={() => onNavigate('login')}
              className="mt-4 flex w-full items-center justify-center gap-2 border-2 border-[#0a0a0a] p-3 transition-colors hover:bg-[#0a0a0a] hover:text-[#fcfcfc]"
            >
              <User className="h-5 w-5" />
              <span>Portal do Membro</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
