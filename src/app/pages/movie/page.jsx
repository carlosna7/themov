'use client'
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import MovieCard from '@/components/MovieCard';
import { BsFillFileEarmarkTextFill, BsGraphUp, BsHourglassSplit, BsWallet2 } from 'react-icons/Bs';

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

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?api_key=${apiKey}`
    getMovie(movieUrl)
  }, []);

  return (
    <div>
      {movie && (
        <>
          <MovieCard movie={movie} showLink={false} />

          <p className="tagline">{movie.tagline}</p>

          <div className="info">
            <h3>
              <BsWallet2 /> Orçamento:
            </h3>
            <p>{movie.budget}</p>
          </div>

          <div className="info">
            <h3>
              <BsGraphUp /> Receita:
            </h3>
            <p>{movie.revenue}</p>
          </div>

          <div className="info">
            <h3>
              <BsHourglassSplit /> Duração:
            </h3>
            <p>{movie.runtime} minutos</p>
          </div>

          <div className="info description">
            <h3>
              <BsFillFileEarmarkTextFill /> Descrição:
            </h3>
            <p>{movie.overview}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default Movie