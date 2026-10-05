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
    <>
      <header className='border-b border-line pb-14 pt-40 md:pb-20 md:pt-48'>
        <div className='container-x'>
          <p className='label animate-fade-up mb-5'>
            <span className='text-accent'>Busca</span>{count && <> &mdash; {count}</>}
          </p>
          <h1 key={query} className='display animate-fade-up text-[clamp(44px,8vw,120px)]'>
            {query}
          </h1>
        </div>
      </header>

      <section className='container-x pt-14'>
        {error && <p className='font-mono text-sm text-accent'>Erro na busca: {error}</p>}
        {!error && !movies && <MovieGridSkeleton />}
        {movies?.length === 0 && (
          <p className='max-w-md text-xl font-light text-muted'>
            Nada encontrado. Tente o título original ou menos palavras.
          </p>
        )}
        {movies?.length > 0 && <MovieGrid movies={movies} />}
      </section>
    </>
  )
}

export default Search
