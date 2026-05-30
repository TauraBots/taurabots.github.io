import { useState } from 'react';
import { Menu, User, X } from 'lucide-react';
import { useLanguage } from '../i18n';

export default function Navbar({ currentView, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  const labels = {
    about: language === 'pt' ? 'Sobre' : 'About',
    projects: language === 'pt' ? 'Projetos' : 'Projects',
    team: language === 'pt' ? 'Equipe' : 'Team',
    media: language === 'pt' ? 'Mídia' : 'Media',
    sponsors: language === 'pt' ? 'Patrocinadores' : 'Sponsors',
    talents: language === 'pt' ? 'Banco de Talentos' : 'Talent Pool',
    portal: 'Portal',
    memberPortal: language === 'pt' ? 'Portal do Membro' : 'Member Portal',
    language: language === 'pt' ? 'EN' : 'PT',
  };

  const handleHomeClick = (event) => {
    event.preventDefault();
    onNavigate('home');
    setIsMenuOpen(false);
  };

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

  const navLinks = [
    { href: '/#sobre', target: 'sobre', label: labels.about },
    { href: '/#projetos', target: 'projetos', label: labels.projects },
    { href: '/#equipe', target: 'equipe', label: labels.team },
    { href: '/#midia', target: 'midia', label: labels.media },
    { href: '/#patrocinadores', target: 'patrocinadores', label: labels.sponsors },
    { href: '/#talentos', target: 'talentos', label: labels.talents },
  ];

  return (
    <nav className="fixed z-50 w-full border-b border-[#e5e5e5] bg-[#fcfcfc]/90 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          <a href="/" onClick={handleHomeClick} className="group flex items-center">
            <img
              src="/assets/logo_noname.svg"
              alt="Taura Bots"
              className="h-10 w-auto transition-transform group-hover:scale-[1.02] md:h-11"
            />
          </a>

          <div className="hidden items-center space-x-6 font-tech text-lg font-bold uppercase tracking-wider md:flex">
            {navLinks.map((link) => (
              <a
                key={link.target}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.target)}
                className="transition-colors hover:text-[#888888]"
              >
                {link.label}
              </a>
            ))}

            <button
              type="button"
              onClick={toggleLanguage}
              className="border border-[#0a0a0a] px-2 py-1 text-sm transition-all hover:bg-[#0a0a0a] hover:text-[#fcfcfc]"
              aria-label={language === 'pt' ? 'Switch to English' : 'Mudar para português'}
            >
              {labels.language}
            </button>

            <button
              onClick={() => onNavigate('login')}
              className="group flex h-10 w-10 items-center justify-center border-2 border-[#0a0a0a] transition-all hover:bg-[#0a0a0a] hover:text-[#fcfcfc]"
              aria-label={labels.memberPortal}
            >
              <User className="h-5 w-5 transition-transform group-hover:scale-110" />
            </button>
          </div>

          <button
            className="text-[#0a0a0a] md:hidden"
            onClick={() => setIsMenuOpen((value) => !value)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute w-full border-b border-[#e5e5e5] bg-[#fcfcfc] md:hidden">
          <div className="flex flex-col space-y-4 px-6 pb-6 pt-2 font-tech text-xl font-bold uppercase tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.target}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.target)}
                className="block hover:text-[#888888]"
              >
                {link.label}
              </a>
            ))}

            <button
              type="button"
              onClick={toggleLanguage}
              className="block text-left hover:text-[#888888]"
              aria-label={language === 'pt' ? 'Switch to English' : 'Mudar para português'}
            >
              {labels.language}
            </button>

            <button
              onClick={() => onNavigate('login')}
              className="mt-4 flex w-full items-center justify-center gap-2 border-2 border-[#0a0a0a] p-3 transition-colors hover:bg-[#0a0a0a] hover:text-[#fcfcfc]"
            >
              <User className="h-5 w-5" />
              <span>{labels.memberPortal}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
