'use client'
import MovieCard from '@/components/MovieCard';
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
    const topRatedUrl = `${moviesURL}popular?api_key=${apiKey}`
    getTopRatedMovies(topRatedUrl)
  }, [])
  

  return (
    <div className='text-white'>
      {topMovies.length === 0 && <p className='flex items-center justify-center pt-32 text-6xl'>Carregando...</p>}

      {topMovies.length > 0 && (
        <div> 
          <div id='text'>
            <h2 className='flex items-center justify-center pt-8 text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-500'>Melhores filmes:</h2>
          </div>

          <div id='content' className='flex flex-wrap justify-between w-screen p-16'>
            {topMovies.map((movie) => 
              <MovieCard key={movie.id} movie={movie} /> 
            )}
          </div>
        </div>
      )}
    </div>
  )
};
