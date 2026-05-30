import { Plus } from 'lucide-react';
import Reveal from '../Reveal';
import { useLanguage } from '../../i18n';

const sponsors = [
  {
    name: 'EasyEDA',
    logo: '/assets/Sponsor/EasyEDA_logo.svg.png',
    delay: 100,
  },
  {
    name: 'JLCPCB',
    logo: '/assets/Sponsor/jlcpcb.svg',
    delay: 150,
  },
  {
    name: 'Allegro MicroSystems',
    logo: '/assets/Sponsor/Allegro_MicroSystems_logo.svg',
    delay: 200,
  },
  {
    name: 'SolidWorks',
    logo: '/assets/Sponsor/SolidWorks_Logo.svg.png',
    delay: 250,
  },
  {
    name: 'NVIDIA',
    logo: '/assets/Sponsor/NVIDIA_logo.svg.png',
    delay: 300,
  },
  {
    name: 'Altium',
    logo: '/assets/Sponsor/altium-logo.png',
    delay: 350,
  },
];

export default function Sponsors() {
  const { language } = useLanguage();

  return (
    <section id="patrocinadores" className="overflow-hidden border-b-2 border-[#0a0a0a] bg-[#fcfcfc] py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <Reveal direction="right">
            <div>
              <p className="highlight-text mb-2 font-tech text-base font-bold uppercase tracking-widest text-[#888888]">
                {language === 'pt' ? 'Apoio técnico' : 'Technical support'}
              </p>
              <h2 className="font-display text-5xl font-bold uppercase leading-none md:text-7xl">
                {language === 'pt' ? 'Patrocinadores' : 'Sponsors'}
              </h2>
            </div>
          </Reveal>

          <Reveal delay={120} direction="left">
            <a
              href="#contato"
              className="group inline-flex items-center gap-3 border-2 border-[#0a0a0a] px-5 py-3 font-tech font-bold uppercase tracking-wider transition-all hover:bg-[#0a0a0a] hover:text-[#fcfcfc]"
            >
              <Plus className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
              {language === 'pt' ? 'Seja patrocinador' : 'Become a sponsor'}
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sponsors.map((sponsor) => (
            <Reveal key={sponsor.name} delay={sponsor.delay}>
              <div className="group flex h-32 flex-col items-center justify-center border-2 border-[#e5e5e5] bg-[#fcfcfc] px-6 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#0a0a0a]">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="max-h-14 w-full object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
                />
                <p className="mt-3 text-center font-tech text-[10px] font-bold uppercase tracking-[0.18em] text-[#888888] transition-colors duration-300 group-hover:text-[#0a0a0a]">
                  {sponsor.name}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
