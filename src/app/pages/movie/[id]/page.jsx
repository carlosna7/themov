'use client'
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import MovieCard from '@/components/MovieCard';
import { BsFillFileEarmarkTextFill, BsGraphUp, BsHourglassSplit, BsWallet2 } from 'react-icons/bs';

const moviesURL = "https://api.themoviedb.org/3/movie/";
const apiKey =  "590fe327d68ab66718c93cde9cecca3b";

const Movie = () => {

  const { id } = useParams()
  const [movie, setMovie] = useState(null)

  const getMovie = async (url) => {
    const response = await fetch(url)
    const data = await response.json()

    setMovie(data);
  };

  const format = ((number) => {
    return number.toLocaleString('pt-BR', {
      style: "currency",
      currency: "BRL"
    })
  })

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?api_key=${apiKey}`
    getMovie(movieUrl)
  }, []);

  return (
    <div className='text-white p-32 max-w-full'>
      {movie && (
        <>
        <div className='flex flex-col justify-center items-center'>
          <MovieCard movie={movie} showLink={false} cardSize='w-[50%]' />

          <p className="text-xl mb-6 ">{movie.tagline}</p>
        </div>
        
        <div className="mb-6">
          <h3 className='flex gap-4 items-center font-bold mb-2'>
            <BsWallet2 className='text-sky-300 h-8 w-8' /> Orçamento:
          </h3>
          <p className='text-justify'>{format(movie.budget)}</p>
        </div>

        <div className="mb-6">
          <h3 className='flex gap-4 items-center font-bold mb-2'>
            <BsGraphUp className='text-sky-300 h-8 w-8' /> Receita:
          </h3>
          <p className='text-justify'>{format(movie.revenue)}</p>
        </div>

        <div className="mb-6">
          <h3 className='flex gap-4 items-center font-bold mb-2'>
            <BsHourglassSplit className='text-sky-300 h-8 w-8' /> Duração:
          </h3>
          <p className='text-justify'>{movie.runtime} minutos</p>
        </div>

        <div className="6">
          <h3 className='flex gap-4 items-center font-bold mb-2'>
            <BsFillFileEarmarkTextFill className='text-sky-300 h-8 w-8' /> Descrição:
          </h3>
          <p className='text-justify'>{format(movie.overview)}</p>
        </div>
        </>
      )}
    </div>
  )
}

export default Movie