import { Bot, Box, Cpu, Plane } from 'lucide-react';
import Reveal from '../Reveal';
import { useLanguage } from '../../i18n';

const projectBase = [
  {
    id: 'ssl',
    title: (
      <>
        Small Size
        <br />
        League
      </>
    ),
    icon: Cpu,
    decoration: Bot,
    delay: 100,
    direction: 'right',
  },
  {
    id: 'drone',
    title: 'DRONE',
    icon: Plane,
    delay: 300,
    direction: 'left',
    outline: true,
  },
  {
    id: 'vsss',
    title: (
      <>
        Very Small
        <br />
        Size
      </>
    ),
    icon: Box,
    decoration: Bot,
    delay: 500,
    direction: 'left',
  },
];

const copy = {
  pt: {
    headingA: 'Nossos',
    headingB: 'Projetos',
    eyebrowProject: 'Conheça o Projeto',
    eyebrowDrone: 'Conheça o',
    descriptions: {
      ssl: 'Futebol de robôs totalmente autônomos. A equipe desenvolve mecânica, hardware e algoritmos baseados em visão computacional.',
      drone:
        'Desenvolvimento de drones autônomos super leves focados em navegação avançada e reconhecimento de ambiente.',
      vsss: 'Futebol com robôs em formato de cubo de 7,5cm. O desafio envolve visão computacional, eletrônica de precisão e estratégias ágeis de jogo em equipe.',
    },
    aria: 'Abrir página do projeto',
  },
  en: {
    headingA: 'Our',
    headingB: 'Projects',
    eyebrowProject: 'Explore Project',
    eyebrowDrone: 'Explore',
    descriptions: {
      ssl: 'Fully autonomous robot soccer. The team develops mechanics, hardware and computer-vision-based algorithms.',
      drone:
        'Development of lightweight autonomous drones focused on advanced navigation and environment recognition.',
      vsss: 'Soccer with 7.5 cm cube-shaped robots. The challenge combines computer vision, precision electronics and agile game strategies.',
    },
    aria: 'Open project page',
  },
};

export default function Projects({ onNavigate }) {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section
      id="projetos"
      className="overflow-hidden border-b-2 border-[#0a0a0a] bg-[#fcfcfc] py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal direction="down">
          <div className="mb-16">
            <h2 className="font-display text-6xl font-bold uppercase leading-none md:text-8xl">
              {t.headingA}
              <br />
              {t.headingB}
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {projectBase.map((project) => {
            const Icon = project.icon;
            const Decoration = project.decoration;
            const eyebrow = project.id === 'drone' ? t.eyebrowDrone : t.eyebrowProject;

            return (
              <Reveal key={project.id} delay={project.delay} direction={project.direction}>
                <button
                  type="button"
                  onClick={() => onNavigate?.(`project-${project.id}`)}
                  className="group block w-full cursor-pointer text-left"
                  aria-label={`${t.aria} ${project.id.toUpperCase()}`}
                >
                  <div className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden border-2 border-transparent bg-[#e5e5e5] p-8 transition-all duration-500 group-hover:border-[#0a0a0a] group-hover:bg-[#0a0a0a] group-hover:text-[#fcfcfc] group-hover:shadow-2xl">
                    <div className="relative z-10 transition-transform duration-500 group-hover:translate-x-4">
                      <p className="mb-2 font-tech font-bold uppercase tracking-widest">
                        {eyebrow}
                      </p>
                      <h3
                        className={`font-display uppercase leading-none ${
                          project.outline
                            ? 'text-outline text-6xl transition-all group-hover:text-outline-none'
                            : 'text-5xl'
                        }`}
                      >
                        {project.title}
                      </h3>
                    </div>
                    <div className="relative z-10 mt-8 self-end transition-transform duration-500 group-hover:scale-125">
                      <Icon
                        className={`h-20 w-20 text-[#0a0a0a] transition-colors group-hover:text-[#fcfcfc] ${
                          project.id === 'drone' ? '-rotate-45 transform' : ''
                        }`}
                      />
                    </div>
                    {Decoration && (
                      <div className="absolute -bottom-10 -right-10 opacity-5 transition-all duration-700 group-hover:rotate-12 group-hover:opacity-10">
                        <Decoration className="h-64 w-64" />
                      </div>
                    )}
                  </div>
                  <p className="mt-4 text-[#888888]">{t.descriptions[project.id]}</p>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
