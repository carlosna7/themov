import Link from 'next/link';
import { imageUrl } from '@/lib/tmdb';

const MovieCard = ({ movie, index }) => {
  const poster = imageUrl(movie.poster_path, 'w342');
  const year = movie.release_date?.slice(0, 4);

  return (
    <Link href={`/pages/movie/${movie.id}`} className='group block'>
      <div className='relative aspect-[2/3] overflow-hidden bg-line'>
        {poster ? (
          <img
            src={poster}
            alt={movie.title}
            loading='lazy'
            className='h-full w-full object-cover transition duration-500 group-hover:scale-[1.03] group-hover:brightness-110'
          />
        ) : (
          <div className='flex h-full items-end p-3 display text-2xl text-muted'>{movie.title}</div>
        )}

        {index !== undefined && (
          <span className='absolute left-0 top-0 bg-paper px-2 py-1 font-mono text-[11px] text-ink'>
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
      </div>

      <div className='mt-3 flex items-baseline justify-between gap-3 label'>
        <span>{year || 's/ data'}</span>
        <span className={movie.vote_average >= 7 ? 'text-accent' : ''}>
          {movie.vote_average ? movie.vote_average.toFixed(1) : '–'}
        </span>
      </div>

      <h3 className='mt-1 text-[15px] font-semibold leading-snug decoration-accent decoration-2 underline-offset-4 group-hover:underline'>
        {movie.title}
      </h3>
    </Link>
  )
}

export default MovieCard
