'use client'
import React, { useState, useEffect} from 'react';

const moviesURL = "https://api.themoviedb.org/3/movie/";
const apiKey =  "590fe327d68ab66718c93cde9cecca3b";

export default function Home() {

  const [topMovies, setTopMovies] = useState([]);

  const getTopRatedMovies = async (url) => {
    const response = await fetch(url)
    const data = await response.json()

    setTopMovies(data.results);
  };

  useEffect(() => {
    const topRatedUrl = `${moviesURL}top_rated?api_key=${apiKey}`
    getTopRatedMovies(topRatedUrl)
    console.log(topRatedUrl)
  }, [])
  

  return (
    <div className='text-white'>
      {topMovies.length === 0 && <p>Carregando...</p>}
      {topMovies && topMovies.map((movie) => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  )
};
