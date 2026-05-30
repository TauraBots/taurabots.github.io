import { ArrowLeft, Box, Cpu, ExternalLink, Plane, Trophy, Users, Wrench } from 'lucide-react';
import Reveal from '../Reveal';
import { useLanguage } from '../../i18n';

const projectBase = {
  ssl: {
    name: 'Small Size League',
    shortName: 'SSL',
    icon: Cpu,
    image: '/assets/Bots/20160629-IMG_0283_1.jpg',
    links: [{ label: { pt: 'Site oficial da SSL', en: 'Official SSL website' }, href: 'https://ssl.robocup.org/' }],
  },
  vsss: {
    name: 'Very Small Size Soccer',
    shortName: 'VSSS',
    icon: Box,
    image: '/assets/Bots/77994559.jpg',
    links: [{ label: { pt: 'Site oficial da VSSS', en: 'Official VSSS website' }, href: 'https://vsssleague.github.io/vss/index.html' }],
  },
  drone: {
    name: 'Desafio de Drones',
    enName: 'Drone Challenge',
    shortName: 'Drone',
    icon: Plane,
    image: '/assets/Bots/F450-swarm2-jpg.webp',
    links: [
      { label: { pt: 'Wiki RoboCup Brasil', en: 'RoboCup Brazil Wiki' }, href: 'https://robocup.org.br/wiki/doku.php?id=flying' },
      {
        label: { pt: 'Regras do desafio', en: 'Challenge rules' },
        href: 'https://cbr.robocup.org.br/wp-content/uploads/2024/05/RegrasDesafioDrones_v2.9-1.pdf',
      },
    ],
  },
};

const copy = {
  pt: {
    back: 'Voltar para o Início',
    project: 'Projeto',
    how: 'Como o',
    works: 'projeto atua',
    references: 'Referências',
    official: 'oficiais',
    also: 'Ver também',
    alt: 'Projeto',
    projects: {
      ssl: {
        intro:
          'A SSL é uma categoria da RoboCup Soccer com robôs móveis autônomos, visão computacional externa e estratégias coletivas em tempo real.',
        focus:
          'Na Taura Bots, o projeto aproxima mecânica de precisão, eletrônica embarcada, controle, software de estratégia e processamento de imagem para criar um time completo de futebol robótico.',
        highlights: [
          'Robôs omnidirecionais de alta velocidade',
          'Visão computacional para rastrear bola e robôs',
          'Planejamento de trajetórias, controle e inteligência de jogo',
        ],
        stats: [
          { label: 'Categoria', value: 'RoboCup Soccer' },
          { label: 'Campo', value: 'Partida 3x3, 6x6 ou 11x11' },
          { label: 'Base técnica', value: 'Mecânica, IA e embarcados' },
        ],
      },
      vsss: {
        intro:
          'A VSSS é uma liga de futebol de robôs pequenos em que a equipe precisa integrar robôs compactos, visão global e tomada de decisão rápida.',
        focus:
          'O projeto é uma porta de entrada muito forte para competição: envolve montagem de robôs de 7,5 cm, desenvolvimento de hardware, controle de movimento e estratégias ágeis de jogo.',
        highlights: [
          'Robôs compactos em formato de cubo',
          'Sistema de visão para localizar bola e jogadores',
          'Estratégias coordenadas para ataque, defesa e reposicionamento',
        ],
        stats: [
          { label: 'Categoria', value: 'Futebol de robôs' },
          { label: 'Robô', value: 'Até 7,5 cm' },
          { label: 'Base técnica', value: 'Visão, controle e eletrônica' },
        ],
      },
      drone: {
        intro:
          'O projeto de drones trabalha com aeronaves autônomas para desafios de navegação, percepção do ambiente e execução de missões.',
        focus:
          'A equipe desenvolve estruturas leves, sistemas embarcados, controle de voo e algoritmos para cumprir tarefas de forma estável, precisa e segura.',
        highlights: [
          'Navegação autônoma em ambientes de competição',
          'Estruturas leves e integração eletrônica',
          'Controle, sensores e reconhecimento de ambiente',
        ],
        stats: [
          { label: 'Categoria', value: 'RoboCup Brasil' },
          { label: 'Plataforma', value: 'Aeronaves autônomas' },
          { label: 'Base técnica', value: 'Controle, sensores e software' },
        ],
      },
    },
  },
  en: {
    back: 'Back to Home',
    project: 'Project',
    how: 'How the',
    works: 'project works',
    references: 'Official',
    official: 'references',
    also: 'See also',
    alt: 'Project',
    projects: {
      ssl: {
        intro:
          'SSL is a RoboCup Soccer category with autonomous mobile robots, external computer vision and real-time collective strategies.',
        focus:
          'At Taura Bots, this project connects precision mechanics, embedded electronics, control, strategy software and image processing to build a complete robotic soccer team.',
        highlights: [
          'High-speed omnidirectional robots',
          'Computer vision to track the ball and robots',
          'Trajectory planning, control and game intelligence',
        ],
        stats: [
          { label: 'Category', value: 'RoboCup Soccer' },
          { label: 'Field', value: '3v3, 6v6 or 11v11 match' },
          { label: 'Technical base', value: 'Mechanics, AI and embedded systems' },
        ],
      },
      vsss: {
        intro:
          'VSSS is a small robot soccer league where teams integrate compact robots, global vision and fast decision-making.',
        focus:
          'This project is a strong entry point into competition: 7.5 cm robots, hardware development, motion control and agile game strategies.',
        highlights: [
          'Compact cube-shaped robots',
          'Vision system to locate the ball and players',
          'Coordinated attack, defense and repositioning strategies',
        ],
        stats: [
          { label: 'Category', value: 'Robot soccer' },
          { label: 'Robot', value: 'Up to 7.5 cm' },
          { label: 'Technical base', value: 'Vision, control and electronics' },
        ],
      },
      drone: {
        intro:
          'The drone project works with autonomous aircraft for navigation, environment perception and mission execution challenges.',
        focus:
          'The team develops lightweight structures, embedded systems, flight control and algorithms to complete tasks with stability, precision and safety.',
        highlights: [
          'Autonomous navigation in competition environments',
          'Lightweight structures and electronics integration',
          'Control, sensors and environment recognition',
        ],
        stats: [
          { label: 'Category', value: 'RoboCup Brazil' },
          { label: 'Platform', value: 'Autonomous aircraft' },
          { label: 'Technical base', value: 'Control, sensors and software' },
        ],
      },
    },
  },
};

export default function ProjectDetails({ projectId, onBack, onNavigate }) {
  const { language } = useLanguage();
  const project = projectBase[projectId] ?? projectBase.ssl;
  const projectCopy = copy[language].projects[projectId] ?? copy[language].projects.ssl;
  const t = copy[language];
  const Icon = project.icon;
  const relatedProjects = Object.entries(projectBase).filter(([id]) => id !== projectId);
  const displayName = language === 'en' && project.enName ? project.enName : project.name;

  return (
    <main className="flex-grow bg-[#fcfcfc] pb-24 pt-32 text-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <button
          onClick={onBack}
          className="group mb-12 flex items-center gap-2 font-tech font-bold uppercase tracking-widest text-[#888888] transition-colors hover:text-[#0a0a0a]"
        >
          <ArrowLeft className="h-6 w-6 transition-transform group-hover:-translate-x-2" />
          {t.back}
        </button>

        <section className="grid gap-12 border-b-2 border-[#0a0a0a] pb-16 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <Reveal direction="right">
            <p className="mb-4 font-tech text-xl font-bold uppercase tracking-widest text-[#888888]">
              {t.project} {project.shortName}
            </p>
            <h1 className="font-display text-7xl font-bold uppercase leading-none md:text-9xl">
              {displayName}
            </h1>
            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-[#444444]">
              {projectCopy.intro}
            </p>
          </Reveal>

          <Reveal delay={150} direction="left">
            <div className="relative aspect-square overflow-hidden border-2 border-[#0a0a0a] bg-[#0a0a0a] text-[#fcfcfc] shadow-[12px_12px_0px_0px_#888888]">
              {project.image ? (
                <img
                  src={project.image}
                  alt={`${t.alt} ${project.shortName} Taura Bots`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Icon className="h-32 w-32 md:h-44 md:w-44" />
                </div>
              )}
            </div>
          </Reveal>
        </section>

        <section className="grid gap-12 py-16 lg:grid-cols-[0.8fr_1fr]">
          <Reveal direction="up">
            <div>
              <h2 className="font-display text-5xl font-bold uppercase leading-none">
                {t.how}
                <br />
                {t.works}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-[#555555]">{projectCopy.focus}</p>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {projectCopy.stats.map((item, index) => (
              <Reveal key={item.label} delay={index * 100} direction="up">
                <div className="border-2 border-[#e5e5e5] bg-[#fcfcfc] p-6 transition-colors hover:border-[#0a0a0a]">
                  <p className="font-tech text-sm font-bold uppercase tracking-widest text-[#888888]">
                    {item.label}
                  </p>
                  <p className="mt-3 font-display text-3xl uppercase leading-none">{item.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="grid gap-10 border-y-2 border-[#0a0a0a] py-16 lg:grid-cols-3">
          {projectCopy.highlights.map((highlight, index) => {
            const HighlightIcon = [Wrench, Trophy, Users][index];

            return (
              <Reveal key={highlight} delay={index * 120} direction="up">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#0a0a0a] text-[#fcfcfc]">
                    <HighlightIcon className="h-6 w-6" />
                  </div>
                  <p className="text-lg font-semibold leading-snug">{highlight}</p>
                </div>
              </Reveal>
            );
          })}
        </section>

        <section className="grid gap-10 pt-16 lg:grid-cols-[1fr_0.8fr]">
          <Reveal direction="right">
            <div>
              <h2 className="font-display text-5xl font-bold uppercase leading-none">
                {t.references}
                <br />
                {t.official}
              </h2>
              <div className="mt-8 flex flex-wrap gap-4">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 border-2 border-[#0a0a0a] px-5 py-3 font-tech font-bold uppercase tracking-wider transition-all hover:bg-[#0a0a0a] hover:text-[#fcfcfc]"
                  >
                    {link.label[language]}
                    <ExternalLink className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={150} direction="left">
            <div>
              <p className="mb-4 font-tech text-lg font-bold uppercase tracking-widest text-[#888888]">
                {t.also}
              </p>
              <div className="grid gap-3">
                {relatedProjects.map(([id, item]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onNavigate?.(`project-${id}`)}
                    className="flex items-center justify-between border-2 border-[#e5e5e5] bg-[#fcfcfc] p-4 text-left transition-all hover:border-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#fcfcfc]"
                  >
                    <span className="font-display text-3xl uppercase leading-none">
                      {language === 'en' && item.enName ? item.enName : item.name}
                    </span>
                    <item.icon className="h-7 w-7" />
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
