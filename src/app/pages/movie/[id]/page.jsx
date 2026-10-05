'use client'
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { tmdb, imageUrl } from '@/lib/tmdb';

const money = (value) =>
  value
    ? value.toLocaleString('pt-BR', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
    : '—';

const runtime = (minutes) =>
  minutes ? `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, '0')}min` : '—';

const date = (iso) =>
  iso ? new Date(`${iso}T12:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

const Movie = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    tmdb(`/movie/${id}`)
      .then(setMovie)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <div className='mx-auto max-w-[1400px] px-4 sm:px-8 py-16 font-mono text-sm text-accent'>
        Não deu para carregar o filme: {error}
      </div>
    )
  }

  if (!movie) {
    return (
      <div className='animate-pulse'>
        <div className='h-[38vh] bg-line/60' />
        <div className='mx-auto max-w-[1400px] px-4 sm:px-8 py-10 space-y-4'>
          <div className='h-4 w-40 bg-line' />
          <div className='h-20 w-2/3 bg-line' />
        </div>
      </div>
    )
  }

  const backdrop = imageUrl(movie.backdrop_path, 'w1280');
  const poster = imageUrl(movie.poster_path, 'w500');
  const year = movie.release_date?.slice(0, 4);
  const showOriginal = movie.original_title && movie.original_title !== movie.title;

  const facts = [
    ['Nota', movie.vote_average ? `${movie.vote_average.toFixed(1)} / 10  (${movie.vote_count.toLocaleString('pt-BR')} votos)` : '—'],
    ['Estreia', date(movie.release_date)],
    ['Duração', runtime(movie.runtime)],
    ['Orçamento', money(movie.budget)],
    ['Bilheteria', money(movie.revenue)],
    ['Idioma original', movie.original_language?.toUpperCase() || '—'],
  ];

  return (
    <article>
      <div className='relative h-[38vh] min-h-[240px] overflow-hidden bg-line'>
        {backdrop && (
          <img src={backdrop} alt='' className='h-full w-full object-cover object-top opacity-70 saturate-[0.85]' />
        )}
        <div className='absolute inset-0 bg-gradient-to-t from-paper via-paper/30 to-transparent' />
      </div>

      <div className='relative mx-auto -mt-28 grid max-w-[1400px] gap-10 px-4 sm:px-8 md:-mt-40 md:grid-cols-[minmax(0,300px)_1fr] lg:gap-16'>
        <div className='w-40 sm:w-52 md:w-full'>
          {poster && (
            <img src={poster} alt={movie.title} className='w-full shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)]' />
          )}
        </div>

        <div className='md:pt-44'>
          <Link href='/' className='label hover:text-accent transition-colors'>&larr; Voltar</Link>

          <p className='label mt-8'>
            {[year, movie.genres?.map((g) => g.name).join(' / ')].filter(Boolean).join('  ·  ')}
          </p>

          <h1 className='display mt-3 text-[clamp(48px,8vw,120px)]'>{movie.title}</h1>

          {showOriginal && (
            <p className='mt-3 font-serif text-xl italic text-muted'>{movie.original_title}</p>
          )}

          {movie.tagline && (
            <p className='mt-8 max-w-2xl border-l-2 border-accent pl-5 font-serif text-2xl italic leading-snug'>
              {movie.tagline}
            </p>
          )}

          <div className='mt-12 grid gap-12 lg:grid-cols-[1fr_340px]'>
            <section>
              <h2 className='label mb-4'>Sinopse</h2>
              <p className='max-w-[62ch] font-serif text-lg leading-relaxed text-ink/90'>
                {movie.overview || 'Sem sinopse em português para este filme.'}
              </p>
            </section>

            <section>
              <h2 className='label mb-4'>Ficha técnica</h2>
              <dl className='border-t border-line'>
                {facts.map(([term, value]) => (
                  <div key={term} className='flex justify-between gap-4 border-b border-line py-3 text-sm'>
                    <dt className='text-muted'>{term}</dt>
                    <dd className='text-right font-mono'>{value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Movie
