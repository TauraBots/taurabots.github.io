import { ArrowLeft } from 'lucide-react';
import Reveal from '../Reveal';

export default function About({ onNavigate }) {
  return (
    <section id="sobre" className="overflow-hidden bg-[#0a0a0a] py-24 text-[#fcfcfc]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <Reveal direction="right">
            <h2 className="font-display mb-6 text-5xl font-bold uppercase leading-none md:text-7xl">
              A Engenharia
              <br />
              <span className="text-[#888888]">em Campo</span>
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-[#e5e5e5]">
              A Taura Bots é a equipe de robótica do Centro de Tecnologia da
              Universidade Federal de Santa Maria (UFSM). Nascemos com o propósito de
              aplicar, na prática, os conhecimentos teóricos adquiridos em sala de
              aula, desde a mecânica e eletrônica até a visão computacional e
              inteligência artificial.
            </p>
            <p className="mb-8 text-lg leading-relaxed text-[#e5e5e5]">
              Ao longo de mais de 10 anos de história, construímos uma trajetória de
              inovação e presença global. Fomos destaque na RoboCup (Alemanha),
              viajamos ao Irã para a disputa da HuroCup com nosso robô arqueiro,
              desenvolvemos o humanoide Dimitri e, recentemente, conquistamos o 3º
              lugar na Competição Brasileira de Robótica (CBR 2025) na categoria
              Small Size League.
            </p>
            <div className="mb-8 flex gap-4">
              <div className="flex-1 border border-[#888888] p-4 text-center transition-colors duration-300 hover:bg-[#1a1a1a]">
                <h3 className="font-display text-4xl font-bold">+10</h3>
                <p className="font-tech text-xs uppercase tracking-widest text-[#888888]">
                  Anos de História
                </p>
              </div>
              <div className="flex-1 border border-[#888888] p-4 text-center transition-colors duration-300 hover:bg-[#1a1a1a]">
                <h3 className="font-display text-4xl font-bold">3º</h3>
                <p className="font-tech text-xs uppercase tracking-widest text-[#888888]">
                  Lugar CBR 2025
                </p>
              </div>
              <div className="flex-1 border border-[#888888] p-4 text-center transition-colors duration-300 hover:bg-[#1a1a1a]">
                <h3 className="font-display mt-1 text-3xl font-bold leading-tight">
                  Global
                </h3>
                <p className="mt-1 font-tech text-xs uppercase tracking-widest text-[#888888]">
                  Alemanha e Irã
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
              Saber mais da nossa história
              <ArrowLeft className="h-5 w-5 rotate-180 transition-transform group-hover:translate-x-1" />
            </button>
          </Reveal>

          <Reveal direction="left" delay={200}>
            <div className="group relative aspect-square w-full overflow-hidden border-4 border-[#888888] transition-colors duration-500 hover:border-[#fcfcfc]">
              <img
                src="/assets/IMG_0035.jpg"
                alt="Equipe Taura Bots"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/65 via-[#0a0a0a]/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 z-10 p-6 text-left">
                <p className="font-tech text-xs font-bold uppercase tracking-[0.35em] text-[#fcfcfc]">
                  Equipe Taura Bots
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
