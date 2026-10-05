'use client'
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { tmdb } from '@/lib/tmdb';
import { MovieGrid, MovieGridSkeleton } from '@/components/MovieGrid';

const Search = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    setMovies(null);
    setError(null);

    tmdb('/search/movie', { query })
      .then((data) => setMovies(data.results))
      .catch((err) => setError(err.message));
  }, [query])

  const count = movies && `${movies.length} ${movies.length === 1 ? 'resultado' : 'resultados'}`;

  return (
    <div className='mx-auto max-w-[1400px] px-4 sm:px-8'>
      <header className='border-b border-line py-12 md:py-16'>
        <p className='label mb-4'>Busca{count && ` · ${count}`}</p>
        <h1 className='font-serif text-[clamp(40px,7vw,88px)] italic leading-none'>
          &ldquo;{query}&rdquo;
        </h1>
      </header>

      <section className='pt-10'>
        {error && <p className='font-mono text-sm text-accent'>Erro na busca: {error}</p>}
        {!error && !movies && <MovieGridSkeleton />}
        {movies?.length === 0 && (
          <p className='max-w-md font-serif text-xl italic text-ink/70'>
            Nada encontrado. Tente o título original ou menos palavras.
          </p>
        )}
        {movies?.length > 0 && <MovieGrid movies={movies} />}
      </section>
    </div>
  )
}

export default Search
