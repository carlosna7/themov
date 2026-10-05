'use client'
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Título que sobe palavra por palavra, igual ao [data-animate-text] do portfólio
export default function AnimatedHeading({ as: Tag = 'h2', className = '', children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const split = SplitText.create(ref.current, {
      type: 'lines, words',
      mask: 'lines',
      autoSplit: true,
      onSplit: (self) => gsap.from(self.words, {
        yPercent: 110,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.06,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          once: true,
        },
      }),
    });

    return () => split.revert();
  }, []);

  return <Tag ref={ref} className={className}>{children}</Tag>;
}
