import Link from 'next/link';
import { imageUrl } from '@/lib/tmdb';

const MovieCard = ({ movie }) => {
  const poster = imageUrl(movie.poster_path, 'w342');
  const year = movie.release_date?.slice(0, 4);

  return (
    <Link href={`/pages/movie/${movie.id}`} className='group block select-none'>
      <div className='relative aspect-[2/3] overflow-hidden rounded-[14px] bg-surface'>
        {poster ? (
          <img
            src={poster}
            alt={movie.title}
            loading='lazy'
            draggable={false}
            className='h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]'
          />
        ) : (
          <div className='flex h-full items-end p-4 text-lg font-semibold text-muted'>{movie.title}</div>
        )}

        {movie.vote_average > 0 && (
          <span className='absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[13px] text-ink backdrop-blur-md'>
            <span className='text-accent'>&#9733;</span> {movie.vote_average.toFixed(1)}
          </span>
        )}
      </div>

      <h3 className='mt-4 truncate text-base font-medium tracking-[-0.01em] transition-colors group-hover:text-accent'>
        {movie.title}
      </h3>
      <p className='mt-1 font-mono text-[13px] uppercase tracking-[0.12em] text-muted'>{year || 'Sem data'}</p>
    </Link>
  )
}

export default MovieCard
