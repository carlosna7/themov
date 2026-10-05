'use client'
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';
import { tmdb, imageUrl } from '@/lib/tmdb';
import Carousel from '@/components/Carousel';
import Reveal from '@/components/Reveal';
import { Blue, Green } from '@/components/Highlight';

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
  const router = useRouter()
  const [movie, setMovie] = useState(null)
  const [similar, setSimilar] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    tmdb(`/movie/${id}`)
      .then(setMovie)
      .catch((err) => setError(err.message));

    tmdb(`/movie/${id}/recommendations`)
      .then((data) => setSimilar(data.results.filter((m) => m.poster_path)))
      .catch(() => setSimilar([]));
  }, [id]);

  if (error) {
    return (
      <div className='container-x pt-40 font-mono text-sm text-accent'>
        Não deu para carregar o filme: {error}
      </div>
    )
  }

  if (!movie) return <div className='h-[100svh] animate-pulse bg-surface' />;

  const backdrop = imageUrl(movie.backdrop_path, 'w1280');
  const poster = imageUrl(movie.poster_path, 'w500');
  const year = movie.release_date?.slice(0, 4);
  const showOriginal = movie.original_title && movie.original_title !== movie.title;

  const facts = [
    ['Nota', movie.vote_average ? `${movie.vote_average.toFixed(1)} / 10` : '—'],
    ['Votos', movie.vote_count ? movie.vote_count.toLocaleString('pt-BR') : '—'],
    ['Estreia', date(movie.release_date)],
    ['Duração', runtime(movie.runtime)],
    ['Orçamento', money(movie.budget)],
    ['Bilheteria', money(movie.revenue)],
    ['Idioma original', movie.original_language?.toUpperCase() || '—'],
  ];

  return (
    <article>
      {/* 01 — banner */}
      <section className='relative flex min-h-[86svh] items-end overflow-hidden'>
        {backdrop && (
          <img src={backdrop} alt='' className='absolute inset-0 h-full w-full object-cover opacity-50' />
        )}
        <div className='absolute inset-0 bg-gradient-to-t from-paper via-paper/50 to-paper/30' />
        <div className='absolute inset-0 bg-gradient-to-r from-paper/80 to-transparent' />

        <div className='container-x relative pb-14 pt-40 md:pb-20'>
          <button onClick={() => (window.history.length > 1 ? router.back() : router.push('/'))} className='label animate-fade-up mb-10 inline-flex items-center gap-2 transition-colors hover:text-accent'>
            <FiArrowLeft /> Voltar
          </button>

          <p className='label animate-fade-up mb-5 [animation-delay:60ms]'>
            <span className='text-accent'>{year}</span>
            {movie.genres?.length > 0 && <> &mdash; {movie.genres.map((g) => g.name).join(' / ')}</>}
          </p>

          <h1 className='display animate-fade-up max-w-5xl text-[clamp(48px,8vw,128px)] [animation-delay:120ms]'>{movie.title}</h1>

          {showOriginal && (
            <p className='animate-fade-up mt-4 text-lg font-light italic text-muted [animation-delay:180ms]'>{movie.original_title}</p>
          )}

          {movie.tagline && (
            <p className='animate-fade-up mt-8 max-w-2xl border-l-2 border-accent pl-5 text-xl font-light leading-snug text-ink/85 md:text-2xl [animation-delay:240ms]'>
              {movie.tagline}
            </p>
          )}
        </div>
      </section>

      {/* 02 — sinopse e ficha */}
      <section className='container-x grid gap-12 py-16 md:grid-cols-[280px_1fr] md:py-24 lg:grid-cols-[320px_1fr_320px] lg:gap-16'>
        <Reveal>
          {poster && <img src={poster} alt={movie.title} className='w-48 rounded-[16px] md:w-full' />}
        </Reveal>

        <Reveal delay={100}>
          <p className='label mb-5 font-semibold text-accent'>Sinopse</p>
          <p className='max-w-[60ch] text-lg font-light leading-relaxed text-ink/90 md:text-xl'>
            {movie.overview || 'Sem sinopse em português para este filme.'}
          </p>
        </Reveal>

        <Reveal delay={200} className='md:col-span-2 lg:col-span-1'>
          <p className='label mb-5 font-semibold text-accent'>Ficha técnica</p>
          <dl className='border-t border-line'>
            {facts.map(([term, value]) => (
              <div key={term} className='flex justify-between gap-4 border-b border-line py-3.5 text-sm'>
                <dt className='text-muted'>{term}</dt>
                <dd className={`text-right font-medium ${term === 'Nota' ? 'text-accent' : ''}`}>{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* 03 — recomendações */}
      {similar.length > 0 && (
        <Carousel eyebrow='Recomendações' title={<>Se você <Blue>gostou</Blue> <Green>deste</Green></>} movies={similar} />
      )}
    </article>
  )
}

export default Movie
