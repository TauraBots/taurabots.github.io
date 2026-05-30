import { ArrowLeft } from 'lucide-react';
import Reveal from '../Reveal';
import { useLanguage } from '../../i18n';

const content = {
  pt: {
    titleA: 'A Engenharia',
    titleB: 'em Campo',
    p1: 'A Taura Bots é uma equipe universitária de robótica do Centro de Tecnologia da UFSM, criada para transformar sala de aula em engenharia aplicada. Desde os primeiros registros institucionais, em 2015, o grupo aproxima mecânica, eletrônica, software, visão computacional e inteligência artificial em robôs de competição.',
    p2: 'Nossa história começou nos humanoides Bender, Juarez e Dimitri, passou por RoboCup, HuroCup, Taiwan, carros autônomos, robótica doméstica e ações de extensão. Hoje, depois da retomada pós-pandemia, seguimos uma nova fase com SSL, VSSS, drones autônomos e o 3º lugar na CBR 2025 em Small Size League.',
    years: 'Anos de História',
    place: 'Lugar CBR 2025',
    global: 'Alemanha, Irã e Taiwan',
    cta: 'Saber mais da nossa história',
    caption: 'Equipe Taura Bots',
  },
  en: {
    titleA: 'Engineering',
    titleB: 'on the field',
    p1: 'Taura Bots is a university robotics team from UFSM’s Technology Center, created to turn classroom learning into applied engineering. Since its earliest institutional records in 2015, the team has connected mechanics, electronics, software, computer vision and artificial intelligence in competitive robots.',
    p2: 'Our history began with the humanoids Bender, Juarez and Dimitri, then expanded through RoboCup, HuroCup, Taiwan, autonomous vehicles, domestic robotics and outreach projects. Today, after a post-pandemic rebuild, we are in a new phase with SSL, VSSS, autonomous drones and 3rd place at CBR 2025 in Small Size League.',
    years: 'Years of History',
    place: 'CBR 2025 Place',
    global: 'Germany, Iran and Taiwan',
    cta: 'Explore our history',
    caption: 'Taura Bots Team',
  },
};

export default function About({ onNavigate }) {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <section id="sobre" className="overflow-hidden bg-[#0a0a0a] py-24 text-[#fcfcfc]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <Reveal direction="right">
            <h2 className="font-display mb-6 text-5xl font-bold uppercase leading-none md:text-7xl">
              {t.titleA}
              <br />
              <span className="text-[#888888]">{t.titleB}</span>
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-[#e5e5e5]">{t.p1}</p>
            <p className="mb-8 text-lg leading-relaxed text-[#e5e5e5]">{t.p2}</p>
            <div className="mb-8 flex gap-4">
              <div className="flex-1 border border-[#888888] p-4 text-center transition-colors duration-300 hover:bg-[#1a1a1a]">
                <h3 className="font-display text-4xl font-bold">+10</h3>
                <p className="font-tech text-xs uppercase tracking-widest text-[#888888]">
                  {t.years}
                </p>
              </div>
              <div className="flex-1 border border-[#888888] p-4 text-center transition-colors duration-300 hover:bg-[#1a1a1a]">
                <h3 className="font-display text-4xl font-bold">3º</h3>
                <p className="font-tech text-xs uppercase tracking-widest text-[#888888]">
                  {t.place}
                </p>
              </div>
              <div className="flex-1 border border-[#888888] p-4 text-center transition-colors duration-300 hover:bg-[#1a1a1a]">
                <h3 className="font-display mt-1 text-3xl font-bold leading-tight">
                  Global
                </h3>
                <p className="mt-1 font-tech text-xs uppercase tracking-widest text-[#888888]">
                  {t.global}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                onNavigate('history');
              }}
              className="group inline-flex items-center gap-3 bg-[#fcfcfc] px-8 py-4 font-tech font-bold uppercase tracking-widest text-[#0a0a0a] transition-all duration-300 hover:scale-105"
            >
              {t.cta}
              <ArrowLeft className="h-5 w-5 rotate-180 transition-transform group-hover:translate-x-1" />
            </button>
          </Reveal>

          <Reveal direction="left" delay={200}>
            <div className="group relative aspect-square w-full overflow-hidden border-4 border-[#888888] transition-colors duration-500 hover:border-[#fcfcfc]">
              <img
                src="/assets/Bots/IMG_2018.jpg"
                alt={t.caption}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/65 via-[#0a0a0a]/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 z-10 p-6 text-left">
                <p className="font-tech text-xs font-bold uppercase tracking-[0.35em] text-[#fcfcfc]">
                  {t.caption}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
