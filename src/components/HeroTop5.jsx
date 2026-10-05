'use client'
import { useState } from 'react';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { imageUrl } from '@/lib/tmdb';
import ShapeGrid from './ShapeGrid';

const SLIDE_MS = 7000;

export default function HeroTop5({ movies }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const movie = movies[active];
  const next = () => setActive((i) => (i + 1) % movies.length);

  return (
    <section
      className='relative h-[100svh] min-h-[640px] overflow-hidden'
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {movies.map((m, i) => (
        <img
          key={m.id}
          src={imageUrl(m.backdrop_path, 'w1280')}
          alt=''
          className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1400ms] ease-out ${i === active ? 'scale-100 opacity-60' : 'scale-110 opacity-0'}`}
        />
      ))}

      <div className='absolute inset-0 bg-gradient-to-r from-paper via-paper/70 to-transparent' />
      <div className='absolute inset-0 bg-gradient-to-t from-paper via-transparent to-paper/40' />

      <div className='absolute inset-0 [mask-image:linear-gradient(to_right,#000_0%,#000_40%,transparent_75%)]'>
        <ShapeGrid />
      </div>

      <span
        key={`glyph-${active}`}
        aria-hidden
        className='animate-fade-up pointer-events-none absolute right-[clamp(-20px,3vw,40px)] top-[90px] select-none text-[clamp(160px,22vw,380px)] font-medium leading-none tracking-[-0.04em] text-accent/20'
      >
        {String(active + 1).padStart(2, '0')}
      </span>

      <div className='container-x relative z-10 flex h-full flex-col justify-end pb-14 md:pb-20'>
        <div key={movie.id} className='max-w-2xl'>
          <p className='label animate-fade-up mb-5'>
            <span className='text-accent'>Top 5</span> &mdash; mais vistos da semana
          </p>

          <h1 className='display animate-fade-up text-[clamp(48px,7.5vw,112px)] [animation-delay:80ms]'>
            {movie.title}
          </h1>

          <p className='animate-fade-up mt-6 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs uppercase tracking-[0.18em] text-muted [animation-delay:160ms]'>
            <span>{movie.release_date?.slice(0, 4)}</span>
            <span className='text-accent'>&#9733; {movie.vote_average?.toFixed(1)}</span>
            <span>{movie.original_language}</span>
          </p>

          {movie.overview && (
            <p className='animate-fade-up mt-5 line-clamp-3 max-w-xl text-base font-light leading-relaxed text-ink/80 md:text-lg [animation-delay:240ms]'>
              {movie.overview}
            </p>
          )}

          <div className='animate-fade-up mt-8 [animation-delay:320ms]'>
            <Link href={`/pages/movie/${movie.id}`} className='btn-solid'>
              Ver ficha completa <FiArrowUpRight />
            </Link>
          </div>
        </div>

        <ol className='mt-12 grid grid-cols-5 gap-3 md:gap-6'>
          {movies.map((m, i) => (
            <li key={m.id}>
              <button onClick={() => setActive(i)} className='group w-full text-left' aria-label={`Ir para ${m.title}`}>
                <span className='relative block h-[2px] overflow-hidden bg-white/15'>
                  {i === active && (
                    <span
                      key={active}
                      onAnimationEnd={next}
                      className='absolute inset-0 origin-left bg-accent'
                      style={{ animation: `progress ${SLIDE_MS}ms linear forwards`, animationPlayState: paused ? 'paused' : 'running' }}
                    />
                  )}
                </span>
                <span className={`mt-3 hidden font-mono text-[11px] tracking-[0.16em] md:block ${i === active ? 'text-ink' : 'text-muted group-hover:text-ink'} transition-colors`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={`mt-1 hidden truncate text-sm md:block ${i === active ? 'text-ink' : 'text-muted group-hover:text-ink'} transition-colors`}>
                  {m.title}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function HeroSkeleton() {
  return <section className='h-[100svh] min-h-[640px] animate-pulse bg-surface' />;
}
