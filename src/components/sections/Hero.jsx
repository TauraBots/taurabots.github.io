import { ArrowDownCircle } from 'lucide-react';
import Reveal from '../Reveal';
import { useLanguage } from '../../i18n';

export default function Hero() {
  const { language } = useLanguage();

  return (
    <header
      id="hero"
      className="bg-pattern relative flex min-h-screen flex-grow items-center overflow-hidden pb-20 pt-32 lg:pb-32 lg:pt-48"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 animate-float opacity-10">
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full -translate-y-1/4 translate-x-1/4 transform"
        >
          <path
            fill="#000000"
            d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.1,-46.3C90.4,-33.5,96.1,-18,95.5,-2.9C94.8,12.2,87.9,26.9,78.2,39.6C68.5,52.3,56.1,63,42.4,71.2C28.7,79.4,14.3,85.1,0.2,84.7C-13.9,84.3,-27.8,77.9,-40.4,69.5C-53,61.1,-64.3,50.7,-73.4,38.3C-82.5,25.9,-89.4,11.5,-88.7,-2.4C-88,-16.3,-79.8,-29.7,-70.2,-41C-60.6,-52.3,-49.6,-61.5,-37.1,-69.5C-24.6,-77.5,-12.3,-84.3,1.3,-86.6C14.9,-88.9,29.8,-86.7,44.7,-76.4Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 text-center lg:px-12">
        <Reveal delay={100}>
          <p className="mb-4 font-tech text-xl font-bold uppercase tracking-widest text-[#888888] md:text-2xl">
            {language === 'pt' ? 'Conheça a equipe' : 'Meet the team'}
          </p>
        </Reveal>

        <Reveal delay={300}>
          <h1 className="font-display mb-12 cursor-default text-7xl font-bold uppercase leading-none tracking-tighter transition-transform duration-700 hover:scale-105 md:text-9xl lg:text-[12rem]">
            taura<span className="text-outline">bots</span>
          </h1>
        </Reveal>

        <Reveal delay={500}>
          <a href="#sobre" className="group inline-flex cursor-pointer flex-col items-center">
            <div className="bg-[#0a0a0a] px-12 py-4 text-sm font-bold uppercase tracking-[0.2em] text-[#fcfcfc] shadow-[8px_8px_0px_0px_#888888] transition-all hover:translate-x-2 hover:translate-y-2 hover:shadow-none">
              Start
            </div>
            <div className="mt-8 animate-bounce text-[#0a0a0a]">
              <ArrowDownCircle className="h-8 w-8" />
            </div>
          </a>
        </Reveal>
      </div>

      <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 -rotate-90 font-mono text-xs tracking-widest text-[#888888] lg:block">
        EST. 2013 - UFSM
      </div>
      <div className="absolute bottom-12 right-6 hidden font-mono text-xs tracking-widest text-[#888888] lg:block">
        DESIGN: @TAURABOTS
      </div>
    </header>
  );
}
