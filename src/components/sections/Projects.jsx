import { Bot, Box, Cpu, Plane } from 'lucide-react';
import Reveal from '../Reveal';

export default function Projects() {
  return (
    <section
      id="projetos"
      className="overflow-hidden border-b-2 border-[#0a0a0a] bg-[#fcfcfc] py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal direction="down">
          <div className="mb-16">
            <h2 className="font-display text-6xl font-bold uppercase leading-none md:text-8xl">
              Nossos
              <br />
              Projetos
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          <Reveal delay={100} direction="right">
            <div className="group cursor-pointer">
              <div className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden border-2 border-transparent bg-[#e5e5e5] p-8 transition-all duration-500 group-hover:border-[#0a0a0a] group-hover:bg-[#0a0a0a] group-hover:text-[#fcfcfc] group-hover:shadow-2xl">
                <div className="relative z-10 transition-transform duration-500 group-hover:translate-x-4">
                  <p className="mb-2 font-tech font-bold uppercase tracking-widest">
                    Conheça o Projeto
                  </p>
                  <h3 className="font-display text-5xl uppercase leading-none">
                    Small Size
                    <br />
                    League
                  </h3>
                </div>
                <div className="relative z-10 mt-8 self-end transition-transform duration-500 group-hover:scale-125">
                  <Cpu className="h-20 w-20 text-[#0a0a0a] transition-colors group-hover:text-[#fcfcfc]" />
                </div>
                <div className="absolute -bottom-10 -right-10 opacity-5 transition-all duration-700 group-hover:-rotate-12 group-hover:opacity-10">
                  <Bot className="h-64 w-64" />
                </div>
              </div>
              <p className="mt-4 text-[#888888]">
                Futebol de robôs totalmente autônomos. A equipe desenvolve mecânica,
                hardware e algoritmos baseados em visão computacional.
              </p>
            </div>
          </Reveal>

          <Reveal delay={300} direction="left">
            <div className="group cursor-pointer">
              <div className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden border-2 border-transparent bg-[#e5e5e5] p-8 transition-all duration-500 group-hover:border-[#0a0a0a] group-hover:bg-[#0a0a0a] group-hover:text-[#fcfcfc] group-hover:shadow-2xl">
                <div className="relative z-10 transition-transform duration-500 group-hover:translate-x-4">
                  <p className="mb-2 font-tech font-bold uppercase tracking-widest">
                    Conheça o
                  </p>
                  <h3 className="text-outline font-display text-6xl uppercase leading-none transition-all group-hover:text-outline-none">
                    DRONE
                  </h3>
                </div>
                <div className="relative z-10 mt-8 self-end transition-transform duration-500 group-hover:scale-125">
                  <Plane className="-rotate-45 h-20 w-20 transform text-[#0a0a0a] transition-colors group-hover:text-[#fcfcfc]" />
                </div>
              </div>
              <p className="mt-4 text-[#888888]">
                Desenvolvimento de drones autônomos super leves focados em navegação
                avançada e reconhecimento de ambiente.
              </p>
            </div>
          </Reveal>

          <Reveal delay={500} direction="left">
            <div className="group cursor-pointer">
              <div className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden border-2 border-transparent bg-[#e5e5e5] p-8 transition-all duration-500 group-hover:border-[#0a0a0a] group-hover:bg-[#0a0a0a] group-hover:text-[#fcfcfc] group-hover:shadow-2xl">
                <div className="relative z-10 transition-transform duration-500 group-hover:translate-x-4">
                  <p className="mb-2 font-tech font-bold uppercase tracking-widest">
                    Conheça o Projeto
                  </p>
                  <h3 className="font-display text-5xl uppercase leading-none">
                    Very Small
                    <br />
                    Size
                  </h3>
                </div>
                <div className="relative z-10 mt-8 self-end transition-transform duration-500 group-hover:scale-125">
                  <Box className="h-20 w-20 text-[#0a0a0a] transition-colors group-hover:text-[#fcfcfc]" />
                </div>
                <div className="absolute -bottom-10 -right-10 opacity-5 transition-all duration-700 group-hover:rotate-12 group-hover:opacity-10">
                  <Bot className="h-64 w-64" />
                </div>
              </div>
              <p className="mt-4 text-[#888888]">
                Futebol com robôs em formato de cubo de 7,5cm. O desafio envolve
                visão computacional, eletrónica de precisão e estratégias ágeis de
                jogo em equipa.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
