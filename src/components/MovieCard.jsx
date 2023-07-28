import Link from 'next/link'
import { BsStarFill } from 'react-icons/Bs'

const imageUrl = "https://image.tmdb.org/t/p/w500/"

const MovieCard = ({movie, showLink = true}) => {
  return (
    <div className='flex flex-col rounded-lg justify-center w-[23%] gap-2 mb-8 bg-slate-950'>
        <img className='max-w-full rounded-t-lg mb-2' src={imageUrl + movie.poster_path} alt={movie.title} />
        
        <h2 className='font-bold mx-3'>{movie.title}</h2>
        
        <p className='flex items-baseline gap-2 mx-3'><BsStarFill /> {movie.vote_average}</p>
        
        {showLink && <Link className='flex justify-center font-bold p-2 mb-3 mx-3 bg-sky-300 border-2 border-sky-300 rounded-lg text-black hover:bg-transparent hover:border-blue-400 hover:text-blue-400 duration-500' href={`/movie/${movie.id} `}>Ver mais</Link>}
    </div>
  )
}

export default MovieCard