import MovieCard from './MovieCard';
import Reveal from './Reveal';

const gridClasses = 'grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:grid-cols-5';

export function MovieGrid({ movies }) {
  return (
    <div className={gridClasses}>
      {movies.map((movie, i) => (
        <Reveal key={movie.id} delay={(i % 5) * 60}>
          <MovieCard movie={movie} />
        </Reveal>
      ))}
    </div>
  )
}

export function MovieGridSkeleton({ count = 10 }) {
  return (
    <div className={gridClasses}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className='animate-pulse'>
          <div className='aspect-[2/3] rounded-[14px] bg-surface' />
          <div className='mt-4 h-4 w-3/4 rounded bg-surface' />
          <div className='mt-2 h-3 w-1/3 rounded bg-surface' />
        </div>
      ))}
    </div>
  )
}
