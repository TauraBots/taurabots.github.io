import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ExternalLink, Newspaper, Play, Youtube } from 'lucide-react';
import Reveal from '../Reveal';
import { useLanguage } from '../../i18n';

const videos = [
  { id: 'FiYM_j7Ucu8', type: { pt: 'Reportagem', en: 'Feature' }, url: 'https://www.youtube.com/watch?v=FiYM_j7Ucu8' },
  { id: 'gpyOyqnoPhA', type: { pt: 'Reportagem', en: 'Feature' }, url: 'https://www.youtube.com/watch?v=gpyOyqnoPhA' },
  { id: '58MA7gPQOwQ', type: { pt: 'Reportagem', en: 'Feature' }, url: 'https://www.youtube.com/watch?v=58MA7gPQOwQ' },
  { id: 'e2VzhdlH1W0', type: { pt: 'Reportagem', en: 'Feature' }, url: 'https://www.youtube.com/watch?v=e2VzhdlH1W0' },
  { id: 'JDse-sCsB6E', type: { pt: 'Reportagem', en: 'Feature' }, url: 'https://www.youtube.com/watch?v=JDse-sCsB6E' },
  { id: 'Xgca-4xIpI4', type: { pt: 'Reportagem', en: 'Feature' }, url: 'https://www.youtube.com/watch?v=Xgca-4xIpI4' },
  { id: 'c2OxFHQbtAo', type: 'Shorts', url: 'https://youtube.com/shorts/c2OxFHQbtAo' },
  { id: '1P8zFUw1KwE', type: { pt: 'Reportagem', en: 'Feature' }, url: 'https://www.youtube.com/watch?v=1P8zFUw1KwE' },
  { id: 'G7kON_4r8OM', type: { pt: 'Reportagem', en: 'Feature' }, url: 'https://www.youtube.com/watch?v=G7kON_4r8OM' },
  { id: '-wpAn9rp3qc', type: { pt: 'Reportagem', en: 'Feature' }, url: 'https://www.youtube.com/watch?v=-wpAn9rp3qc' },
  { id: 'cJqYRuYek8o', type: { pt: 'Reportagem', en: 'Feature' }, url: 'https://www.youtube.com/watch?v=cJqYRuYek8o' },
  { id: 'ITDC0Z0A7ew', type: { pt: 'Reportagem', en: 'Feature' }, url: 'https://www.youtube.com/watch?v=ITDC0Z0A7ew' },
  { id: 'PZ0JKS5am0Q', type: { pt: 'Reportagem', en: 'Feature' }, url: 'https://www.youtube.com/watch?v=PZ0JKS5am0Q' },
  { id: '6cNgv1f08hw', type: { pt: 'Reportagem', en: 'Feature' }, url: 'https://www.youtube.com/watch?v=6cNgv1f08hw' },
  { id: 'nAROn1nBl9k', type: { pt: 'Reportagem', en: 'Feature' }, url: 'https://www.youtube.com/watch?v=nAROn1nBl9k' },
];

const articles = [
  {
    title: 'Taura Bots vence competição internacional de arco e flecha em Taiwan',
    source: 'UFSM CT',
    date: '04/09/2018',
    priority: true,
    url: 'https://www.ufsm.br/unidades-universitarias/ct/2018/09/04/taura-bots-vence-no-taiwan',
  },
  {
    title: 'Integrante do Taura Bots conquista o primeiro lugar em competição no Irã',
    source: 'UFSM CT',
    date: '10/04/2019',
    priority: true,
    url: 'https://www.ufsm.br/unidades-universitarias/ct/2019/04/10/integrante-do-taura-bots-conquista-o-primeiro-lugar-em-competicao-no-ira',
  },
  {
    title: 'Equipe da UFSM, em parceria com a FURG, participa de torneio mundial de robótica na Tailândia',
    source: 'UFSM',
    date: '05/07/2022',
    priority: true,
    url: 'https://www.ufsm.br/2022/07/05/equipe-da-ufsm-em-parceria-com-a-furg-participa-de-torneio-mundial-de-robotica-na-tailandia',
  },
  {
    title: 'Equipe de robótica da FURG é classificada para o mundial na Tailândia',
    source: 'FURG',
    date: '10/06/2022',
    priority: true,
    url: 'https://furg.br/noticias/noticias-pesquisa-e-inovacao/equipe-de-robotica-da-furg-e-classificada-para-o-mundial-na-tailandia',
  },
  {
    title: 'Professores e estudantes do CT participam da Jornada Argentina de Robótica em Buenos Aires',
    source: 'UFSM CT',
    date: '24/06/2024',
    priority: true,
    url: 'https://www.ufsm.br/unidades-universitarias/ct/2024/06/24/professores-e-estudantes-do-ct-participam-da-jornada-argentina-de-robotica-jar-em-buenos-aires',
  },
  {
    title: 'Equipe Taura Bots ministra capacitação na Argentina',
    source: 'UFSM CT',
    date: '12/07/2024',
    priority: true,
    url: 'https://www.ufsm.br/unidades-universitarias/ct/2024/07/12/equipe-taura-bots-ministra-capacitacao-na-argentina',
  },
  {
    title: 'Robô projetado no CT disputa a RoboCup na Alemanha',
    source: 'UFSM',
    date: '01/07/2016',
    priority: true,
    url: 'https://www.ufsm.br/2016/07/01/robo-projetado-no-ct-disputa-a-robocup-na-alemanha',
  },
  {
    title: 'Alunos do CT irão à Alemanha em preparação para a RoboCup',
    source: 'UFSM',
    date: '23/02/2016',
    priority: true,
    url: 'https://www.ufsm.br/2016/02/23/alunos-do-ct-irao-a-alemanha-em-preparacao-para-a-robocup',
  },
  {
    title: 'Equipe do CT fica em terceiro lugar em Olimpíada de robótica no Irã',
    source: 'UFSM CT',
    date: '09/03/2018',
    priority: true,
    url: 'https://www.ufsm.br/unidades-universitarias/ct/2018/03/09/equipe-do-ct-fica-em-terceiro-lugar-em-olimpiada-de-robotica-no-ira',
  },
  {
    title: 'Equipe Taura Bots conquista terceiro lugar na Competição Brasileira de Robótica 2025',
    source: 'UFSM CT',
    date: '31/10/2025',
    url: 'https://www.ufsm.br/unidades-universitarias/ct/2025/10/31/taura-bots-conquista-o-terceiro-lugar-na-competicao-brasileira-de-robotica-2025',
  },
  {
    title: 'PRE/UFSM: Taura Bots celebra trajetória de inovação e 3º lugar na CBR 2025',
    source: 'PRE UFSM',
    date: '18/11/2025',
    url: 'https://www.ufsm.br/pro-reitorias/pre/2025/11/18/taura-bots-conquista-terceiro-lugar-na-competicao-brasileira-de-robotica-2025-e-celebra-trajetoria-de-inovacao-no-ct-da-ufsm',
  },
  {
    title: 'Equipe Taura Bots, da UFSM, conquista terceiro lugar nacional em competição de robótica',
    source: 'Diário SM',
    date: '28/11/2025',
    url: 'https://diariosm.com.br/noticias/educacao/equipe-taura-bots-da-ufsm-conquista-terceiro-lugar-nacional-em-competicao-de-robotica.15437835',
  },
  {
    title: 'Equipe Taura Bots representa a UFSM na Competição Brasileira de Robótica 2024 em Goiânia',
    source: 'UFSM CT',
    date: '10/12/2024',
    url: 'https://www.ufsm.br/unidades-universitarias/ct/2024/12/10/equipe-taura-bots-representa-a-ufsm-na-competicao-brasileira-de-robotica-2024-em-goiania',
  },
  {
    title: 'Representantes do grupo Taura Bots do CT-UFSM ministraram palestra no IFFar-Jaguari',
    source: 'UFSM CT',
    date: '26/08/2024',
    url: 'https://www.ufsm.br/unidades-universitarias/ct/2024/08/26/representantes-do-grupo-taura-bots-do-ct-ufsm-ministraram-palestra-no-iffar-jaguari',
  },
  {
    title: 'Maria Cup: competição de robótica organizada pela Taura Bots',
    source: 'UFSM CT',
    date: '06/12/2023',
    url: 'https://www.ufsm.br/unidades-universitarias/ct/2023/12/06/maria-cup',
  },
  {
    title: 'Alunos da UFSM apresentam trabalhos na Conferência Internacional de Robótica Avançada',
    source: 'UFSM CT',
    date: '12/12/2019',
    url: 'https://www.ufsm.br/unidades-universitarias/ct/2019/12/12/alunos-da-ufsm-apresentam-trabalhos-na-conferencia-internacional-de-robotica-avancada-icar',
  },
  {
    title: 'Equipe Taura Bots participa de Competição de Robótica da América Latina',
    source: 'UFSM CT',
    date: '29/11/2019',
    url: 'https://www.ufsm.br/unidades-universitarias/ct/2019/11/29/equipe-taura-bots-participa-de-competicao-de-robotica-da-america-latina',
  },
  {
    title: 'Equipe do Taura Bots é premiada durante Robocar Race',
    source: 'UFSM CT',
    date: '28/11/2018',
    url: 'https://www.ufsm.br/unidades-universitarias/ct/2018/11/28/equipe-do-taura-bots-e-premiada-durante-robocar-race',
  },
  {
    title: 'A saga do robô arqueiro',
    source: 'Revista Arco',
    date: '2018',
    url: 'https://www.ufsm.br/midias/arco/a-saga-do-robo-arqueiro',
  },
  {
    title: 'Inteligência artificial para exportação',
    source: 'Revista Arco',
    date: '10/05/2017',
    url: 'https://www.ufsm.br/midias/arco/inteligencia-artificial-para-exportacao',
  },
  {
    title: 'Robô projetado na UFSM, da Taura Bots, está na maior competição robótica do mundo',
    source: 'Claudemir Pereira',
    date: '07/2016',
    url: 'https://claudemirpereira.com.br/2016/07/tecnologia-robo-projetado-na-ufsm-da-taura-bots-esta-na-maior-competicao-robotica-do-mundo/',
  },
  {
    title: 'UFSM se destaca em Campeonato Latino-Americano de Robótica',
    source: 'UFSM CT',
    date: '05/11/2015',
    url: 'https://www.ufsm.br/unidades-universitarias/ct/2015/11/05/tauraa',
  },
  {
    title: 'Taura Bots participará da competição latino-americana e brasileira de robótica',
    source: 'UFSM CT',
    date: '19/10/2015',
    url: 'https://www.ufsm.br/unidades-universitarias/ct/2015/10/19/taura-bots-ufsm-participara-de-competicao-latino-americana-e-brasileira-de-robotica-2015',
  },
];

const priorityArticles = articles.filter((article) => article.priority);
const regularArticles = articles.filter((article) => !article.priority);

function getThumbnail(videoId) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

function getEmbedUrl(videoId) {
  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
}

function getOEmbedUrl(videoUrl) {
  return `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`;
}

export default function Media() {
  const { language } = useLanguage();
  const [activeVideoId, setActiveVideoId] = useState(videos[0].id);
  const [titles, setTitles] = useState({});
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [showAllPriorityArticles, setShowAllPriorityArticles] = useState(false);

  const activeVideo = useMemo(
    () => videos.find((video) => video.id === activeVideoId) ?? videos[0],
    [activeVideoId],
  );
  const visibleRegularArticles = showAllArticles ? regularArticles : regularArticles.slice(0, 3);
  const visiblePriorityArticles = showAllPriorityArticles
    ? priorityArticles
    : priorityArticles.slice(0, 4);
  const fallbackTitle = language === 'pt' ? 'Taura Bots em vídeo' : 'Taura Bots video';
  const loadingTitle = language === 'pt' ? 'Carregando título...' : 'Loading title...';

  useEffect(() => {
    let isMounted = true;

    async function loadTitles() {
      const entries = await Promise.all(
        videos.map(async (video) => {
          try {
            const response = await fetch(getOEmbedUrl(video.url));

            if (!response.ok) {
              throw new Error('YouTube title unavailable');
            }

            const data = await response.json();
            return [video.id, data.title];
          } catch {
            return [video.id, fallbackTitle];
          }
        }),
      );

      if (isMounted) {
        setTitles(Object.fromEntries(entries));
      }
    }

    loadTitles();

    return () => {
      isMounted = false;
    };
  }, [fallbackTitle]);

  return (
    <section
      id="midia"
      className="overflow-hidden border-b-2 border-[#0a0a0a] bg-[#111111] py-24 text-[#fcfcfc]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.75fr_1fr] lg:items-end">
          <Reveal direction="right">
            <p className="mb-3 inline-flex items-center gap-2 bg-[#fcfcfc] px-3 py-1 font-tech text-sm font-bold uppercase tracking-widest text-[#0a0a0a]">
              <Youtube className="h-4 w-4 text-[#ff0033]" />
              {language === 'pt' ? 'Taura Bots na mídia' : 'Taura Bots in the media'}
            </p>
            <h2 className="font-display text-6xl font-bold uppercase leading-none md:text-8xl">
              {language === 'pt' ? 'Notícias' : 'News'}
              <br />
              {language === 'pt' ? 'e vídeos' : 'and videos'}
            </h2>
          </Reveal>

          <Reveal delay={150} direction="left">
            <p className="max-w-2xl text-lg leading-relaxed text-[#bdbdbd]">
              {language === 'pt'
                ? 'Reportagens, entrevistas e registros em vídeo mostrando os projetos, competições e bastidores da equipe.'
                : 'Features, interviews and videos showing the team projects, competitions and behind the scenes.'}
            </p>
          </Reveal>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal direction="up">
            <div className="overflow-hidden border-2 border-[#fcfcfc] bg-[#0a0a0a]">
              <div className="aspect-video bg-[#0a0a0a]">
                <iframe
                  key={activeVideo.id}
                  src={getEmbedUrl(activeVideo.id)}
                  title={titles[activeVideo.id] ?? 'Vídeo da Taura Bots'}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <p className="font-tech text-sm font-bold uppercase tracking-[0.25em] text-[#ff4d6d]">
                    {activeVideo.type[language] ?? activeVideo.type.pt}
                  </p>
                  <h3 className="mt-2 text-xl font-bold leading-tight md:text-2xl">
                    {titles[activeVideo.id] ?? loadingTitle}
                  </h3>
                </div>

                <a
                  href={activeVideo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex shrink-0 items-center justify-center gap-3 border-2 border-[#fcfcfc] px-4 py-3 font-tech font-bold uppercase tracking-wider transition-all hover:bg-[#fcfcfc] hover:text-[#0a0a0a]"
                >
                  YouTube
                  <ExternalLink className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </Reveal>

          <div className="grid max-h-[720px] gap-4 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-1">
            {videos.map((video, index) => {
              const isActive = video.id === activeVideo.id;

              return (
                <Reveal key={video.id} delay={Math.min(index * 45, 300)} direction="up">
                  <button
                    type="button"
                    onClick={() => setActiveVideoId(video.id)}
                    className={`group flex min-h-[92px] w-full overflow-hidden border-2 text-left transition-all ${
                      isActive
                        ? 'border-[#fcfcfc] bg-[#fcfcfc] text-[#0a0a0a]'
                        : 'border-[#2a2a2a] bg-[#171717] hover:border-[#fcfcfc] hover:bg-[#fcfcfc] hover:text-[#0a0a0a]'
                    }`}
                  >
                    <div className="relative h-[92px] w-[128px] shrink-0 overflow-hidden bg-[#0a0a0a]">
                      <img
                        src={getThumbnail(video.id)}
                        alt={`Thumbnail do vídeo ${index + 1} sobre a Taura Bots`}
                        className="h-full w-full object-cover opacity-80 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-10 w-10 items-center justify-center bg-[#fcfcfc] text-[#0a0a0a]">
                          <Play className="h-5 w-5 fill-current" />
                        </div>
                      </div>
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col justify-center px-3 py-2">
                      <p className="font-tech text-[10px] font-bold uppercase tracking-[0.16em] text-[#ff4d6d]">
                        {video.type[language] ?? video.type.pt}
                      </p>
                      <p className="mt-1 line-clamp-2 min-w-0 break-words text-sm font-semibold leading-snug">
                        {titles[video.id] ?? loadingTitle}
                      </p>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="mt-20 border-t-2 border-[#2a2a2a] pt-16">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <Reveal direction="right">
              <div>
                <p className="mb-3 inline-flex items-center gap-2 bg-[#fcfcfc] px-3 py-1 font-tech text-sm font-bold uppercase tracking-widest text-[#0a0a0a]">
                  <Newspaper className="h-4 w-4" />
                  {language === 'pt' ? 'Na imprensa' : 'In the press'}
                </p>
                <h3 className="font-display text-5xl font-bold uppercase leading-none md:text-7xl">
                  {language === 'pt' ? 'Notícias' : 'Published'}
                  <br />
                  {language === 'pt' ? 'publicadas' : 'news'}
                </h3>
              </div>
            </Reveal>

            <Reveal delay={120} direction="left">
              <p className="max-w-xl text-lg leading-relaxed text-[#bdbdbd]">
                {language === 'pt'
                  ? 'Uma linha do tempo de conquistas, viagens, premiações e aparições da equipe em veículos institucionais e jornalísticos.'
                  : 'A timeline of achievements, trips, awards and team appearances in institutional and journalistic outlets.'}
              </p>
            </Reveal>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {visiblePriorityArticles.map((article, index) => (
              <Reveal key={article.url} delay={index * 120} direction="up">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-h-[220px] flex-col justify-between border-2 border-[#fcfcfc] bg-[#fcfcfc] p-6 text-[#0a0a0a] transition-all hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_#ff4d6d]"
                >
                  <div>
                    <h4 className="font-display text-4xl uppercase leading-none md:text-5xl">
                      {article.title}
                    </h4>
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-4">
                    <p className="font-tech text-sm font-bold uppercase tracking-[0.2em] text-[#666666]">
                      {article.source} · {article.date}
                    </p>
                    <ExternalLink className="h-6 w-6 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          {priorityArticles.length > 4 && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllPriorityArticles((value) => !value)}
                className="group inline-flex items-center gap-3 border-2 border-[#fcfcfc] px-6 py-3 font-tech font-bold uppercase tracking-widest transition-all hover:bg-[#fcfcfc] hover:text-[#0a0a0a]"
              >
                {showAllPriorityArticles
                  ? language === 'pt'
                    ? 'Ver menos destaques'
                    : 'View fewer highlights'
                  : language === 'pt'
                    ? 'Ver mais destaques'
                    : 'View more highlights'}
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    showAllPriorityArticles ? 'rotate-180' : 'group-hover:translate-y-1'
                  }`}
                />
              </button>
            </div>
          )}

          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleRegularArticles.map((article, index) => (
              <Reveal key={article.url} delay={Math.min(index * 55, 300)} direction="up">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-h-[190px] flex-col justify-between border-2 border-[#2a2a2a] bg-[#171717] p-5 transition-all hover:border-[#fcfcfc] hover:bg-[#fcfcfc] hover:text-[#0a0a0a]"
                >
                  <div>
                    <p className="font-tech text-xs font-bold uppercase tracking-[0.22em] text-[#ff4d6d]">
                      {article.source} · {article.date}
                    </p>
                    <h4 className="mt-4 font-display text-3xl uppercase leading-none">
                      {article.title}
                    </h4>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="font-tech text-sm font-bold uppercase tracking-widest text-[#bdbdbd] group-hover:text-[#555555]">
                      {language === 'pt' ? 'Ler matéria' : 'Read article'}
                    </span>
                    <ExternalLink className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          {regularArticles.length > 3 && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllArticles((value) => !value)}
                className="group inline-flex items-center gap-3 border-2 border-[#fcfcfc] px-6 py-3 font-tech font-bold uppercase tracking-widest transition-all hover:bg-[#fcfcfc] hover:text-[#0a0a0a]"
              >
                {showAllArticles
                  ? language === 'pt'
                    ? 'Ver menos notícias'
                    : 'View fewer news'
                  : language === 'pt'
                    ? 'Ver mais notícias'
                    : 'View more news'}
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    showAllArticles ? 'rotate-180' : 'group-hover:translate-y-1'
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
