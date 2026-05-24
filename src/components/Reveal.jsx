import { useEffect, useRef, useState } from 'react';

const directionClasses = {
  up: 'translate-y-16',
  down: '-translate-y-16',
  left: '-translate-x-16',
  right: 'translate-x-16',
  none: '',
};

export default function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? 'translate-x-0 translate-y-0 opacity-100'
          : `opacity-0 ${directionClasses[direction]}`
      } ${className}`}
    >
      {children}
    </div>
  );
}
