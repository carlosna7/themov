'use client'
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import MovieCard from '@/components/MovieCard';

const moviesURL = "https://api.themoviedb.org/3/movie/";
const apiKey =  "590fe327d68ab66718c93cde9cecca3b";

const Movie = () => {

  const {id} = useParams()
  const [movie, setmovie] = useState(null)

  const getMovie = async(url) {
    const response = await fetch(url)
    const data = await response.json()

    setmovie(data);
  }

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?api_key=${apiKey}`
    getMovie(movieUrl)
  })

  return (
    <div>
      {movie && (
        <>{movie.title}</>
      )}
    </div>
  )
}

export default Movie