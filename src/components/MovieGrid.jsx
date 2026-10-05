import MovieCard from './MovieCard';

const gridClasses = 'grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:grid-cols-5';

export function MovieGrid({ movies, numbered = false }) {
  return (
    <div className={gridClasses}>
      {movies.map((movie, i) => (
        <MovieCard key={movie.id} movie={movie} index={numbered ? i : undefined} />
      ))}
    </div>
  )
}

export function MovieGridSkeleton({ count = 10 }) {
  return (
    <div className={gridClasses}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className='animate-pulse'>
          <div className='aspect-[2/3] bg-line' />
          <div className='mt-3 h-3 w-1/3 bg-line' />
          <div className='mt-2 h-4 w-3/4 bg-line' />
        </div>
      ))}
    </div>
  )
}
