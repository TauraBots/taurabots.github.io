import { ExternalLink } from 'lucide-react';
import Reveal from '../Reveal';
import { useLanguage } from '../../i18n';

export default function Talents() {
  const { language } = useLanguage();
  const t = {
    eyebrow: language === 'pt' ? 'Venha fazer parte do nosso time!' : 'Join our team!',
    headingA: language === 'pt' ? 'Banco de' : 'Talent',
    headingB: language === 'pt' ? 'Talentos' : 'Pool',
    description:
      language === 'pt'
        ? 'Buscamos estudantes apaixonados por tecnologia, robótica e desafios. Se você estuda na UFSM e quer colocar a mão na massa em projetos reais, cadastre-se no nosso banco de talentos.'
        : 'We are looking for students passionate about technology, robotics and challenges. If you study at UFSM and want hands-on experience with real projects, join our talent pool.',
    cta: language === 'pt' ? 'Acesse FORMS' : 'Open form',
  };

  return (
    <section
      id="talentos"
      className="relative overflow-hidden bg-[#0a0a0a] py-32 text-[#fcfcfc]"
    >
      <div className="pointer-events-none absolute left-0 top-0 flex h-full w-full animate-spin-slow items-center justify-center opacity-20">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="h-[800px] w-[800px] rotate-90 transform"
        >
          <path
            fill="#ffffff"
            d="M48.4,-73.6C60.9,-61.8,67.8,-43.8,73.5,-25.9C79.2,-8,83.7,9.7,78.5,25.2C73.3,40.7,58.4,53.8,42.5,63.4C26.6,73,9.7,79.1,-6.6,80C-22.9,80.9,-38.6,76.6,-53.4,67.2C-68.2,57.8,-82.1,43.3,-86.3,26.4C-90.5,9.5,-85.1,-9.8,-75,-25.4C-64.9,-41,-50,-52.8,-35.1,-63.3C-20.2,-73.8,-5.2,-83,11.5,-85.5C28.2,-88,41.9,-83.8,48.4,-73.6Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="mb-4 font-tech text-xl uppercase tracking-[0.3em]">
            {t.eyebrow}
          </p>
          <h2 className="font-display mb-12 text-6xl font-bold uppercase md:text-8xl">
            {t.headingA}
            <br />
            {t.headingB}
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-[#888888]">{t.description}</p>
          <a
            href="https://forms.gle/p2TehafTePcjLoBr8"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 bg-[#fcfcfc] px-8 py-4 font-tech font-bold uppercase tracking-widest text-[#0a0a0a] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_10px_20px_rgba(255,255,255,0.1)]"
          >
            {t.cta}
            <ExternalLink className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
