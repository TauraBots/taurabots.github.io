import { Camera, ChevronDown, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Reveal from '../Reveal';
import { useLanguage } from '../../i18n';

const teamPhotos = [
  '/assets/Team/475844744_1127345152724930_8596813847174998162_n.jpg',
  '/assets/Team/511267792_24497374096535682_2680470309270583784_n.jpg',
  '/assets/Team/513932504_24500439492895809_164986198352837353_n.jpg',
  '/assets/Team/514067465_24512580008348424_4184320752337434515_n.jpg',
  '/assets/Team/514597854_24521520014121090_9103426136653533518_n.jpg',
  '/assets/Team/514659436_24506165412323217_12104309567446114_n.jpg',
  '/assets/Team/516016877_24542555488684209_6335236551601822532_n.jpg',
  '/assets/Team/IMG_0016.jpg',
  '/assets/Team/IMG_0035.jpg',
  '/assets/Team/IMG_0050.jpg',
  '/assets/Team/IMG_0052.jpg',
  '/assets/Team/IMG_0134-1024x683.jpg',
  '/assets/Team/IMG_0185-1024x683.jpg',
  '/assets/Team/43383563_2210933262273084_4940939439699394560_n.jpg',
  '/assets/Team/43429768_2210933538939723_8098259534956462080_n.jpg',
  '/assets/Team/43500066_2210933365606407_6965471067506737152_n.jpg',
  '/assets/Team/WhatsApp-Image-2023-08-23-at-12.06.44-768x1024.jpeg',
];

export default function Team() {
  const { language } = useLanguage();
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [photoOffset, setPhotoOffset] = useState(0);
  const [isFadingPhotos, setIsFadingPhotos] = useState(false);
  const [isGalleryPaused, setIsGalleryPaused] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const visiblePhotos = useMemo(() => {
    if (showAllPhotos) {
      return teamPhotos;
    }

    return Array.from({ length: 8 }, (_, index) => {
      return teamPhotos[(photoOffset + index) % teamPhotos.length];
    });
  }, [photoOffset, showAllPhotos]);
  const t = {
    eyebrow: language === 'pt' ? 'Por trás dos robôs' : 'Behind the robots',
    headingA: language === 'pt' ? 'Nossa' : 'Our',
    headingB: language === 'pt' ? 'Equipe' : 'Team',
    description:
      language === 'pt'
        ? 'Gente de engenharia, computação, design, eletrônica e gestão trabalhando junto para transformar ideias em robôs competitivos.'
        : 'People from engineering, computing, design, electronics and management working together to turn ideas into competitive robots.',
    more: language === 'pt' ? 'Ver mais fotos' : 'View more photos',
    less: language === 'pt' ? 'Ver menos fotos' : 'View fewer photos',
    alt: language === 'pt' ? 'Foto da equipe Taura Bots' : 'Taura Bots team photo',
  };

  useEffect(() => {
    if (showAllPhotos || isGalleryPaused || selectedPhoto) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setIsFadingPhotos(true);

      window.setTimeout(() => {
        setPhotoOffset((value) => (value + 1) % teamPhotos.length);
        setIsFadingPhotos(false);
      }, 350);
    }, 3500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isGalleryPaused, selectedPhoto, showAllPhotos]);

  useEffect(() => {
    if (!selectedPhoto) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedPhoto(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPhoto]);

  return (
    <section id="equipe" className="overflow-hidden border-b-2 border-[#0a0a0a] bg-[#fcfcfc] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-end">
          <Reveal direction="right">
            <p className="mb-3 inline-flex items-center gap-2 bg-[#0a0a0a] px-3 py-1 font-tech text-sm font-bold uppercase tracking-widest text-[#fcfcfc]">
              <Camera className="h-4 w-4" />
              {t.eyebrow}
            </p>
            <h2 className="font-display text-6xl font-bold uppercase leading-none md:text-8xl">
              {t.headingA}
              <br />
              {t.headingB}
            </h2>
          </Reveal>

          <Reveal delay={150} direction="left">
            <p className="max-w-2xl text-lg leading-relaxed text-[#555555]">
              {t.description}
            </p>
          </Reveal>
        </div>

        <div
          className={`grid auto-rows-[150px] grid-cols-2 gap-4 transition-opacity duration-500 ease-in-out md:auto-rows-[190px] md:grid-cols-4 ${
            isFadingPhotos ? 'opacity-35' : 'opacity-100'
          }`}
          onMouseEnter={() => setIsGalleryPaused(true)}
          onMouseLeave={() => setIsGalleryPaused(false)}
          onTouchStart={() => setIsGalleryPaused(true)}
          onTouchEnd={() => setIsGalleryPaused(false)}
          onTouchCancel={() => setIsGalleryPaused(false)}
        >
          {visiblePhotos.map((photo, index) => (
            <Reveal
              key={photo}
              delay={Math.min(index * 80, 360)}
              direction={index % 2 === 0 ? 'up' : 'down'}
              className={[1, 4].includes(index) ? 'col-span-2 row-span-2' : ''}
            >
              <button
                type="button"
                onClick={() => setSelectedPhoto(photo)}
                className="group h-full w-full overflow-hidden border-2 border-[#0a0a0a] bg-[#e5e5e5]"
                aria-label={`${language === 'pt' ? 'Abrir foto' : 'Open photo'} ${index + 1}`}
              >
                <img
                  key={photo}
                  src={photo}
                  alt={`${t.alt} ${index + 1}`}
                  className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                />
              </button>
            </Reveal>
          ))}
        </div>

        {teamPhotos.length > 8 && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllPhotos((value) => !value)}
              className="group inline-flex items-center gap-3 border-2 border-[#0a0a0a] px-6 py-3 font-tech font-bold uppercase tracking-widest transition-all hover:bg-[#0a0a0a] hover:text-[#fcfcfc]"
            >
              {showAllPhotos ? t.less : t.more}
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  showAllPhotos ? 'rotate-180' : 'group-hover:translate-y-1'
                }`}
              />
            </button>
          </div>
        )}
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#0a0a0a]/90 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedPhoto(null)}
            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center border-2 border-[#fcfcfc] bg-[#0a0a0a] text-[#fcfcfc] transition-all hover:bg-[#fcfcfc] hover:text-[#0a0a0a]"
            aria-label={language === 'pt' ? 'Fechar imagem' : 'Close image'}
          >
            <X className="h-7 w-7" />
          </button>

          <img
            src={selectedPhoto}
            alt={language === 'pt' ? 'Foto ampliada da equipe Taura Bots' : 'Expanded Taura Bots team photo'}
            className="max-h-[88vh] max-w-[92vw] border-2 border-[#fcfcfc] object-contain shadow-[12px_12px_0px_0px_#888888]"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
