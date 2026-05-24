import { ArrowLeft } from 'lucide-react';
import Reveal from '../Reveal';

const events = [
  {
    year: '2013',
    title: 'Fundação',
    desc: 'A equipe Taura Bots é criada no Centro de Tecnologia (CT) da UFSM, com o propósito de aplicar na prática a engenharia ensinada em sala de aula.',
  },
  {
    year: '2015-2016',
    title: 'RoboCup na Alemanha',
    desc: 'A equipe ganha destaque internacional e viaja para a Alemanha para participar da RoboCup, a maior competição de robótica do mundo.',
  },
  {
    year: '2018',
    title: 'HuroCup no Irã',
    desc: 'A saga do robô arqueiro! A equipe projeta um robô capaz de atirar com arco e flecha e disputa um torneio de ponta no Irã.',
  },
  {
    year: '2022',
    title: 'Projeto Dimitri',
    desc: 'A equipe dá um salto tecnológico e lança seu primeiro robô humanoide, com inteligência artificial desenvolvida para interagir e exportar tecnologia local.',
  },
  {
    year: '2025',
    title: 'Pódio Nacional',
    desc: 'Consolidação como uma das melhores equipes do país: conquista do 3º lugar na Competição Brasileira de Robótica (Small Size League).',
  },
];

export default function HistoryTimeline({ onBack }) {
  return (
    <div className="bg-pattern flex-grow bg-[#fcfcfc] pb-24 pt-32 text-[#0a0a0a]">
      <div className="mx-auto max-w-4xl px-6 lg:px-12">
        <button
          onClick={onBack}
          className="group mb-12 flex items-center gap-2 font-tech font-bold uppercase tracking-widest text-[#888888] transition-colors hover:text-[#0a0a0a]"
        >
          <ArrowLeft className="h-6 w-6 transition-transform group-hover:-translate-x-2" />
          Voltar para o Início
        </button>

        <Reveal>
          <h1 className="font-display mb-16 text-6xl font-bold uppercase leading-none md:text-8xl">
            Nossa
            <br />
            Linha do Tempo
          </h1>
        </Reveal>

        <div className="relative ml-4 space-y-16 border-l-2 border-[#e5e5e5] py-8 md:ml-12">
          {events.map((event, index) => (
            <Reveal
              key={event.year}
              delay={index * 150}
              direction="up"
              className="relative pl-8 md:pl-12"
            >
              <div className="absolute -left-[9px] top-2 h-4 w-4 rounded-full bg-[#0a0a0a] shadow-[0_0_0_6px_#fcfcfc]" />
              <div className="group cursor-default">
                <span className="bg-[#e5e5e5] px-3 py-1 font-tech text-xl font-bold tracking-widest text-[#0a0a0a] transition-colors duration-300 group-hover:bg-[#0a0a0a] group-hover:text-[#fcfcfc]">
                  {event.year}
                </span>
                <h3 className="font-display mt-4 text-4xl font-bold uppercase transition-all duration-300 group-hover:text-outline">
                  {event.title}
                </h3>
                <p className="text-lg leading-relaxed text-[#888888]">{event.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
