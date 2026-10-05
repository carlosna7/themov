'use client'
import { useState, useEffect } from 'react';
import { tmdb } from '@/lib/tmdb';
import { MovieGrid, MovieGridSkeleton } from '@/components/MovieGrid';

export default function Home() {
  const [topMovies, setTopMovies] = useState([]);
  const [error, setError] = useState(null);
  const [today, setToday] = useState('');

  useEffect(() => {
    setToday(new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }));

    tmdb('/movie/popular')
      .then((data) => setTopMovies(data.results))
      .catch((err) => setError(err.message));
  }, [])

  return (
    <div className='mx-auto max-w-[1400px] px-4 sm:px-8'>
      <header className='grid gap-6 border-b border-line py-12 md:grid-cols-[1fr_320px] md:items-end md:py-16'>
        <div>
          <p className='label mb-4'>Programação{today && ` · ${today}`}</p>
          <h1 className='display text-[clamp(56px,11vw,150px)]'>
            Em cartaz<span className='text-accent'>.</span>
          </h1>
        </div>

        <p className='font-serif text-lg italic leading-relaxed text-ink/80'>
          Os vinte filmes mais procurados da semana segundo o TMDB. Escolha um pôster para abrir a ficha técnica.
        </p>
      </header>

      <section className='pt-10'>
        {error && <p className='font-mono text-sm text-accent'>Não deu para carregar os filmes: {error}</p>}
        {!error && topMovies.length === 0 && <MovieGridSkeleton />}
        {topMovies.length > 0 && <MovieGrid movies={topMovies} numbered />}
      </section>
    </div>
  )
};
