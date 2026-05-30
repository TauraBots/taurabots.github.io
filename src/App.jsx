import { useEffect, useState } from 'react';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import Navbar from './components/Navbar';
import About from './components/sections/About';
import Footer from './components/sections/Footer';
import Hero from './components/sections/Hero';
import HistoryTimeline from './components/sections/HistoryTimeline';
import Media from './components/sections/Media';
import ProjectDetails from './components/sections/ProjectDetails';
import Projects from './components/sections/Projects';
import Sponsors from './components/sections/Sponsors';
import Talents from './components/sections/Talents';
import Team from './components/sections/Team';
import { useLanguage } from './i18n';

const metadataByView = {
  home: {
    pt: {
      title: 'Taura Bots | Equipe de Robótica da UFSM',
      description:
        'Conheça a Taura Bots, equipe de robótica da UFSM dedicada a SSL, VSSS, drones e projetos competitivos de engenharia.',
    },
    en: {
      title: 'Taura Bots | UFSM Robotics Team',
      description:
        'Meet Taura Bots, UFSM robotics team working on SSL, VSSS, drones and competitive engineering projects.',
    },
  },
  history: {
    pt: {
      title: 'História | Taura Bots',
      description:
        'Veja a trajetória da Taura Bots em competições nacionais e internacionais de robótica.',
    },
    en: {
      title: 'History | Taura Bots',
      description:
        'Explore Taura Bots history in national and international robotics competitions.',
    },
  },
  login: {
    pt: {
      title: 'Portal do Membro | Taura Bots',
      description: 'Acesse o portal interno da equipe Taura Bots.',
    },
    en: {
      title: 'Member Portal | Taura Bots',
      description: 'Access the internal Taura Bots team portal.',
    },
  },
  dashboard: {
    pt: {
      title: 'Dashboard | Taura Bots',
      description: 'Painel interno para gestão da equipe Taura Bots.',
    },
    en: {
      title: 'Dashboard | Taura Bots',
      description: 'Internal dashboard for Taura Bots team management.',
    },
  },
  'project-ssl': {
    pt: {
      title: 'Small Size League | Taura Bots',
      description:
        'Projeto SSL da Taura Bots: futebol de robôs autônomos com visão computacional, controle e estratégia em tempo real.',
    },
    en: {
      title: 'Small Size League | Taura Bots',
      description:
        'Taura Bots SSL project: autonomous robot soccer with computer vision, control and real-time strategy.',
    },
  },
  'project-vsss': {
    pt: {
      title: 'Very Small Size Soccer | Taura Bots',
      description:
        'Projeto VSSS da Taura Bots: futebol de robôs compactos com eletrônica, visão computacional e controle de movimento.',
    },
    en: {
      title: 'Very Small Size Soccer | Taura Bots',
      description:
        'Taura Bots VSSS project: compact robot soccer with electronics, computer vision and motion control.',
    },
  },
  'project-drone': {
    pt: {
      title: 'Desafio de Drones | Taura Bots',
      description:
        'Projeto de drones autônomos da Taura Bots para navegação, percepção do ambiente e execução de missões.',
    },
    en: {
      title: 'Drone Challenge | Taura Bots',
      description:
        'Taura Bots autonomous drone project for navigation, environment perception and mission execution.',
    },
  },
};

const pathByView = {
  home: '/',
  history: '/historia',
  login: '/portal',
  dashboard: '/dashboard',
  'project-ssl': '/projetos/ssl',
  'project-vsss': '/projetos/vsss',
  'project-drone': '/projetos/drone',
};

function getViewFromPath(pathname) {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const match = Object.entries(pathByView).find(([, path]) => path === normalizedPath);

  return match?.[0] ?? 'home';
}

function getPathForView(view) {
  return pathByView[view] ?? pathByView.home;
}

function getInitialView() {
  const redirectPath = new URLSearchParams(window.location.search).get('redirect');

  if (redirectPath) {
    window.history.replaceState({}, '', redirectPath);
    return getViewFromPath(redirectPath.split(/[?#]/)[0]);
  }

  return getViewFromPath(window.location.pathname);
}

function setMetaTag(selector, attributes) {
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement('meta');
    Object.entries(attributes.identity).forEach(([key, value]) => {
      tag.setAttribute(key, value);
    });
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', attributes.content);
}

export default function App() {
  const { language } = useLanguage();
  const [currentView, setCurrentView] = useState(getInitialView);
  const [isLoading, setIsLoading] = useState(true);
  const isProjectView = currentView.startsWith('project-');

  const navigate = (view, options = {}) => {
    const path = getPathForView(view);

    if (window.location.pathname !== path) {
      const method = options.replace ? 'replaceState' : 'pushState';
      window.history[method]({}, '', path);
    }

    setCurrentView(view);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getViewFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  useEffect(() => {
    const metadata = (metadataByView[currentView] ?? metadataByView.home)[language];
    const url = `${window.location.origin}${getPathForView(currentView)}`;
    const image = `${window.location.origin}/assets/icon.svg`;

    document.title = metadata.title;
    setMetaTag('meta[name="description"]', {
      identity: { name: 'description' },
      content: metadata.description,
    });
    setMetaTag('meta[property="og:title"]', {
      identity: { property: 'og:title' },
      content: metadata.title,
    });
    setMetaTag('meta[property="og:description"]', {
      identity: { property: 'og:description' },
      content: metadata.description,
    });
    setMetaTag('meta[property="og:type"]', {
      identity: { property: 'og:type' },
      content: 'website',
    });
    setMetaTag('meta[property="og:url"]', {
      identity: { property: 'og:url' },
      content: url,
    });
    setMetaTag('meta[property="og:image"]', {
      identity: { property: 'og:image' },
      content: image,
    });
    setMetaTag('meta[name="twitter:card"]', {
      identity: { name: 'twitter:card' },
      content: 'summary_large_image',
    });
  }, [currentView, language]);

  return (
    <div className="flex min-h-screen flex-col antialiased">
      {isLoading && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0a0a0a] text-[#fcfcfc]">
          <div className="flex flex-col items-center gap-6">
            <img
              src="/assets/icon.svg"
              alt="Taura Bots"
              className="h-24 w-24 animate-loader-pulse md:h-32 md:w-32"
            />
            <p className="font-tech text-sm font-bold uppercase tracking-[0.35em] text-[#888888]">
              {language === 'pt' ? 'Carregando' : 'Loading'}
            </p>
          </div>
        </div>
      )}

      {(currentView === 'home' || currentView === 'history' || isProjectView) && (
        <Navbar currentView={currentView} onNavigate={navigate} />
      )}

      {currentView === 'home' && (
        <>
          <Hero />
          <About onNavigate={navigate} />
          <Team />
          <Projects onNavigate={navigate} />
          <Media />
          <Sponsors />
          <Talents />
          <Footer />
        </>
      )}

      {currentView === 'history' && (
        <>
          <HistoryTimeline onBack={() => navigate('home')} />
          <Footer />
        </>
      )}

      {isProjectView && (
        <>
          <ProjectDetails
            projectId={currentView.replace('project-', '')}
            onBack={() => navigate('home')}
            onNavigate={navigate}
          />
          <Footer />
        </>
      )}

      {currentView === 'login' && (
        <Login
          onLogin={() => navigate('dashboard')}
          onBack={() => navigate('home')}
        />
      )}

      {currentView === 'dashboard' && (
        <Dashboard onLogout={() => navigate('home')} />
      )}
    </div>
  );
}
