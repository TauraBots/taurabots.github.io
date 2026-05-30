import { Plus } from 'lucide-react';
import Reveal from '../Reveal';
import { useLanguage } from '../../i18n';

const sponsors = [
  {
    name: 'Allegro MicroSystems',
    logo: '/assets/Sponsor/Allegro_MicroSystems_logo.svg',
    delay: 100,
  },
  {
    name: 'SolidWorks',
    logo: '/assets/Sponsor/SolidWorks_Logo.svg.png',
    delay: 200,
  },
  {
    name: 'NVIDIA',
    logo: '/assets/Sponsor/NVIDIA_logo.svg.png',
    delay: 300,
  },
  {
    name: 'Altium',
    logo: '/assets/Sponsor/altium-logo.png',
    delay: 400,
  },
  {
    name: 'JLCPCB',
    logo: '/assets/Sponsor/jlcpcb.svg',
    delay: 500,
  },
  {
    name: 'EasyEDA',
    logo: '/assets/Sponsor/EasyEDA_logo.svg.png',
    delay: 600,
  },
];

export default function Sponsors() {
  const { language } = useLanguage();

  return (
    <section id="patrocinadores" className="overflow-hidden bg-[#fcfcfc] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col items-start gap-12 md:flex-row">
          <div className="md:w-1/3">
            <Reveal direction="right">
              <p className="highlight-text mb-2 font-tech text-xl font-bold uppercase tracking-widest text-[#888888]">
                New Sponsor
              </p>
              <h2
                className="font-display break-words text-5xl font-bold uppercase md:text-7xl"
                style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  transform: 'rotate(180deg)',
                }}
              >
                {language === 'pt' ? 'PATROCINADOR' : 'SPONSOR'}
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 items-center justify-center gap-8 sm:grid-cols-2 md:w-2/3">
            {sponsors.map((sponsor) => (
              <Reveal key={sponsor.name} delay={sponsor.delay}>
                <div className="group flex aspect-square flex-col items-center justify-center border-4 border-[#e5e5e5] bg-[#fcfcfc] p-10 transition-all duration-300 hover:-translate-y-2 hover:border-[#0a0a0a]">
                  <div className="flex h-full w-full items-center justify-center">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="max-h-20 w-full object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
                    />
                  </div>
                  <p className="mt-4 text-center font-tech text-xs font-bold uppercase tracking-[0.25em] text-[#888888] transition-colors duration-300 group-hover:text-[#0a0a0a]">
                    {sponsor.name}
                  </p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={700}>
              <a
                href="#contato"
                className="group flex aspect-square flex-col items-center justify-center bg-[#e5e5e5] p-12 text-center transition-all duration-300 hover:-translate-y-2 hover:bg-[#888888] hover:text-[#fcfcfc]"
              >
                <Plus className="mb-4 h-12 w-12 transition-transform duration-300 group-hover:rotate-90" />
                <h3 className="font-tech font-bold uppercase tracking-wider">
                  {language === 'pt' ? 'Seja um' : 'Become a'}
                  <br />
                  {language === 'pt' ? 'Patrocinador' : 'Sponsor'}
                </h3>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
