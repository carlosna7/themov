'use client'
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight } from 'react-icons/fi';
import { imageUrl } from '@/lib/tmdb';
import SectionHeader from './SectionHeader';

gsap.registerPlugin(ScrollTrigger);

/*
 * Mesmo efeito da seção de projetos do portfólio: ao chegar na seção ela fica fixa na tela
 * e o scroll vertical desliza os cards para o lado. A página só continua descendo
 * depois que o último card aparece.
 */
export default function PinnedRow({ movies, eyebrow, title }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const countRef = useRef(null);
  const fillRef = useRef(null);
  const [horizontal, setHorizontal] = useState(false);

  // sem "reduzir movimento" ativa o modo fixado; caso contrário fica uma fileira com scroll normal
  useEffect(() => {
    setHorizontal(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (!horizontal) return;

    const section = sectionRef.current;
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('[data-card]', track);

      // quanto a trilha precisa andar para o último card encostar na margem direita
      const distance = () => {
        const inner = track.parentElement;
        const styles = getComputedStyle(inner);
        const contentWidth = inner.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
        return Math.max(0, track.scrollWidth - contentWidth);
      };

      const scrollTween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
          onUpdate: (self) => {
            const index = Math.round(self.progress * (cards.length - 1)) + 1;
            countRef.current.textContent = String(index).padStart(2, '0');
            fillRef.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      cards.forEach((card) => {
        // parallax: a imagem anda mais devagar que o card
        gsap.fromTo(card.querySelector('[data-cover]'), { xPercent: -6 }, {
          xPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: 'left right',
            end: 'right left',
            scrub: true,
          },
        });

        // o texto do card sobe conforme ele entra na tela
        gsap.from(card.querySelector('[data-info]'), {
          y: 40,
          opacity: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: 'left 85%',
            end: 'left 45%',
            scrub: true,
          },
        });
      });
    }, section);

    // a fonte muda a altura do cabeçalho, então os cálculos são refeitos quando ela carrega
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, [horizontal]);

  return (
    <div>
      <section
        ref={sectionRef}
        className={horizontal ? 'flex h-[100svh] flex-col justify-center overflow-hidden pb-8 pt-[96px]' : 'py-20'}
      >
        <div className='container-x'>
          <SectionHeader eyebrow={eyebrow} title={title}>
            <p className='max-w-xs text-base font-light leading-relaxed text-muted'>
              Continue rolando para passar pelos filmes. A página segue depois do último.
            </p>
          </SectionHeader>

          <div className={horizontal ? '' : 'no-scrollbar -mx-6 overflow-x-auto px-6'}>
            <div ref={trackRef} className='flex w-max gap-4 md:gap-7'>
              {movies.map((movie, i) => (
                <Link
                  key={movie.id}
                  href={`/pages/movie/${movie.id}`}
                  data-card
                  className='group relative block h-[min(52vh,380px)] w-[82vw] shrink-0 overflow-hidden rounded-[20px] bg-surface md:h-[min(56vh,480px)] md:w-[min(64vw,680px)]'
                >
                  {movie.backdrop_path && (
                    <img
                      data-cover
                      src={imageUrl(movie.backdrop_path, 'w1280')}
                      alt=''
                      className='absolute inset-y-0 -left-[8%] h-full w-[116%] max-w-none object-cover transition duration-700 group-hover:brightness-110'
                    />
                  )}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent' />

                  <span className='absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-lg backdrop-blur-md transition duration-500 group-hover:rotate-45 group-hover:bg-leaf group-hover:text-paper'>
                    <FiArrowUpRight />
                  </span>

                  <div data-info className='absolute inset-x-0 bottom-0 p-6 md:p-8'>
                    <p className='font-mono text-[13px] tracking-[0.14em] text-accent'>{String(i + 1).padStart(2, '0')}</p>
                    <h3 className='mt-2 text-2xl font-semibold leading-tight tracking-[-0.03em] md:text-4xl'>{movie.title}</h3>
                    <p className='mt-3 font-mono text-[13px] uppercase tracking-[0.12em] text-white/75'>
                      {movie.release_date?.slice(0, 4)} &nbsp;&middot;&nbsp; &#9733; {movie.vote_average?.toFixed(1)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {horizontal && (
            <div className='mt-[clamp(24px,4vh,40px)] flex items-center gap-4 font-mono text-[13px] tracking-[0.16em] text-muted'>
              <span><b ref={countRef} className='font-semibold text-ink'>01</b> / {String(movies.length).padStart(2, '0')}</span>
              <span className='relative h-[2px] max-w-[320px] flex-1 overflow-hidden bg-line'>
                <span ref={fillRef} className='absolute inset-0 origin-left scale-x-0 bg-accent' />
              </span>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
