import { useEffect } from 'react';
import { useIntersectionObserver } from './use-intersection-observer';

export function useScrollReveal<T extends HTMLElement = HTMLElement>(delay = 0) {
  const [ref, isIntersecting] = useIntersectionObserver<T>({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    freezeOnceVisible: true,
  });

  useEffect(() => {
    if (isIntersecting && ref.current) {
      const timer = setTimeout(() => {
        ref.current?.classList.add('active');
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isIntersecting, delay, ref]);

  return ref;
}
