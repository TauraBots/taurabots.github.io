import { ArrowLeft } from 'lucide-react';
import Reveal from '../Reveal';
import { useLanguage } from '../../i18n';

const events = {
  pt: [
    {
      year: '2013-2015',
      title: 'Origens e formalização',
      desc: 'As fontes públicas registram diferentes marcos de origem entre 2013 e 2015. O primeiro registro institucional preciso encontrado é de 02/03/2015, com o projeto Taura Bots - computação aplicada a RoboCup na UFSM.',
    },
    {
      year: '2015',
      title: 'RoboCup com WF Wolves',
      desc: 'Em parceria com a equipe alemã WF Wolves, a Taura Bots disputa a RoboCup em Hefei e obtém 2º lugar nos desafios técnicos KidSize e TeenSize da Humanoid League.',
    },
    {
      year: '2015',
      title: 'Bender, Juarez e pódio latino-americano',
      desc: 'Bender e Juarez entram em cena na LARC/CBR. A equipe conquista 3º lugar na Liga Humanoide e consolida sua primeira fase competitiva na América Latina.',
    },
    {
      year: '2015-2017',
      title: 'Dimitri e cooperação internacional',
      desc: 'Dimitri é construído no fim de 2015 dentro de uma cooperação com a KAIST. O humanoide participa da RoboCup 2016 em Leipzig e marca uma fase de pesquisa avançada em robótica cognitiva.',
    },
    {
      year: '2017',
      title: 'RoboCup em Nagoya',
      desc: 'A parceria WF Wolves & Taura Bots segue na RoboCup Humanoid League em Nagoya, com destaque em TeenSize e no ranking Drop-In.',
    },
    {
      year: '2018',
      title: 'Arco e flecha robótico',
      desc: 'A equipe compete na HuroCup no Irã e recebe convite para Taiwan. Com Juarez, conquista 1º lugar mundial em Archery na FIRA RoboWorld Cup Taiwan.',
    },
    {
      year: '2018',
      title: 'Colin e veículos autônomos',
      desc: 'A Taura Bots inicia uma frente de veículos autônomos e conquista 3º lugar na Robocar Race com o protótipo Colin.',
    },
    {
      year: '2019',
      title: 'Vitória no Irã e DoRIS na LARC',
      desc: 'Daniel Nesvera conquista 1º lugar em Carros Autônomos na FIRA RoboWorld Cup do Irã. No mesmo ciclo, DoRIS aparece na LARC 2019 em robótica doméstica, ao lado de VSSS e HRR.',
    },
    {
      year: '2022',
      title: 'RoboCup@Home em Bangkok',
      desc: 'A colaboração UFSM-FURG amadurece no ciclo BUTIA/FBOT, com participação na RoboCup@Home OPL em Bangkok e pódio internacional registrado nessa trilha.',
    },
    {
      year: '2023',
      title: 'Primeira Maria Cup',
      desc: 'A Taura Bots organiza a primeira Maria Cup no CTISM/UFSM, reunindo equipes do Rio Grande do Sul e do Uruguai em modalidades de robótica educacional e competitiva.',
    },
    {
      year: '2024',
      title: 'Reconstrução pós-pandemia',
      desc: 'Após um período de descontinuidade, a equipe é reconstruída com foco em SSL, VSSS e drones autônomos, retomando competições, pesquisa e ações de extensão.',
    },
    {
      year: '2024',
      title: 'Argentina, IFFar e CBR Goiânia',
      desc: 'A equipe participa da JAR em Buenos Aires, ministra capacitação na UNAM Misiones, realiza palestra no IFFar Jaguari e leva um robô SSL construído em oito meses para a CBR 2024.',
    },
    {
      year: '2025',
      title: 'Pódio nacional em SSL',
      desc: 'Na CBR 2025, em Vitória, a Taura Bots conquista 3º lugar na Small Size League Entry Level e consolida a nova fase da equipe em SSL, VSSS e drones.',
    },
    {
      year: '2026',
      title: 'Stack aberto e reorganização técnica',
      desc: 'A organização pública no GitHub ganha força com repositórios de hardware, firmware, comunicação e visão, sinalizando uma fase mais modular e aberta para SSL/VSSS.',
    },
  ],
  en: [
    {
      year: '2013-2015',
      title: 'Origins and formalization',
      desc: 'Public sources point to different origin milestones between 2013 and 2015. The earliest precise institutional record found is from March 2, 2015, with the UFSM project Taura Bots - applied computing for RoboCup.',
    },
    {
      year: '2015',
      title: 'RoboCup with WF Wolves',
      desc: 'In partnership with the German team WF Wolves, Taura Bots competes at RoboCup in Hefei and earns 2nd place in the KidSize and TeenSize technical challenges.',
    },
    {
      year: '2015',
      title: 'Bender, Juarez and a Latin American podium',
      desc: 'Bender and Juarez enter the LARC/CBR stage. The team earns 3rd place in the Humanoid League and consolidates its first competitive phase in Latin America.',
    },
    {
      year: '2015-2017',
      title: 'Dimitri and international cooperation',
      desc: 'Dimitri is built in late 2015 through cooperation with KAIST. The humanoid competes at RoboCup 2016 in Leipzig and marks a phase of advanced cognitive robotics research.',
    },
    {
      year: '2017',
      title: 'RoboCup in Nagoya',
      desc: 'The WF Wolves & Taura Bots partnership continues in the RoboCup Humanoid League in Nagoya, with relevant TeenSize and Drop-In results.',
    },
    {
      year: '2018',
      title: 'Robotic archery',
      desc: 'The team competes at HuroCup in Iran and receives an invitation to Taiwan. With Juarez, Taura Bots wins 1st place in Archery at the FIRA RoboWorld Cup Taiwan.',
    },
    {
      year: '2018',
      title: 'Colin and autonomous vehicles',
      desc: 'Taura Bots starts an autonomous vehicle track and earns 3rd place at Robocar Race with the Colin prototype.',
    },
    {
      year: '2019',
      title: 'Victory in Iran and DoRIS at LARC',
      desc: 'Daniel Nesvera wins 1st place in Autonomous Cars at the FIRA RoboWorld Cup in Iran. In the same cycle, DoRIS appears at LARC 2019 in domestic robotics, alongside VSSS and HRR.',
    },
    {
      year: '2022',
      title: 'RoboCup@Home in Bangkok',
      desc: 'The UFSM-FURG collaboration matures through the BUTIA/FBOT cycle, with RoboCup@Home OPL participation in Bangkok and an international podium in this track.',
    },
    {
      year: '2023',
      title: 'First Maria Cup',
      desc: 'Taura Bots organizes the first Maria Cup at CTISM/UFSM, bringing together teams from Rio Grande do Sul and Uruguay in educational and competitive robotics categories.',
    },
    {
      year: '2024',
      title: 'Post-pandemic rebuild',
      desc: 'After a period of discontinuity, the team is rebuilt with focus on SSL, VSSS and autonomous drones, returning to competitions, research and outreach activities.',
    },
    {
      year: '2024',
      title: 'Argentina, IFFar and CBR Goiânia',
      desc: 'The team joins JAR in Buenos Aires, teaches at UNAM Misiones, gives a talk at IFFar Jaguari and brings an SSL robot built in eight months to CBR 2024.',
    },
    {
      year: '2025',
      title: 'National podium in SSL',
      desc: 'At CBR 2025 in Vitória, Taura Bots earns 3rd place in Small Size League Entry Level and consolidates its new phase across SSL, VSSS and drones.',
    },
    {
      year: '2026',
      title: 'Open stack and technical reorganization',
      desc: 'The public GitHub organization gains momentum with hardware, firmware, communication and vision repositories, signaling a more modular and open SSL/VSSS phase.',
    },
  ],
};

export default function HistoryTimeline({ onBack }) {
  const { language } = useLanguage();

  return (
    <div className="bg-pattern flex-grow bg-[#fcfcfc] pb-24 pt-32 text-[#0a0a0a]">
      <div className="mx-auto max-w-4xl px-6 lg:px-12">
        <button
          onClick={onBack}
          className="group mb-12 flex items-center gap-2 font-tech font-bold uppercase tracking-widest text-[#888888] transition-colors hover:text-[#0a0a0a]"
        >
          <ArrowLeft className="h-6 w-6 transition-transform group-hover:-translate-x-2" />
          {language === 'pt' ? 'Voltar para o Início' : 'Back to Home'}
        </button>

        <Reveal>
          <h1 className="font-display mb-16 text-6xl font-bold uppercase leading-none md:text-8xl">
            {language === 'pt' ? 'Nossa' : 'Our'}
            <br />
            {language === 'pt' ? 'Linha do Tempo' : 'Timeline'}
          </h1>
        </Reveal>

        <div className="relative ml-4 space-y-16 border-l-2 border-[#e5e5e5] py-8 md:ml-12">
          {events[language].map((event, index) => (
            <Reveal
              key={`${event.year}-${event.title}`}
              delay={index * 100}
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
