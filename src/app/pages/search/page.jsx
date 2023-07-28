'use client'
import MovieCard from '@/components/MovieCard';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from "react"

const searchURL = "https://api.themoviedb.org/3/search/movie/";
const apiKey =  "590fe327d68ab66718c93cde9cecca3b";

const Search = () => {
  const searchParams = useSearchParams();  

  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q")

  const getSearchedMovies = async (url) => {
    const response = await fetch(url)
    const data = await response.json()

    setMovies(data.results);
  };

  useEffect(() => {
    if(query) {
      const searchQueryUrl = `${searchURL}?api_key=${apiKey}&query=${query}`
      console.log(searchQueryUrl)
      getSearchedMovies(searchQueryUrl)
    }
  }, [query])

  return (
    <div className='text-white'>
      {/* {movies === 0 && <p className='flex items-center justify-center pt-32 text-6xl'>Carregando...</p>} */}

      {/* {movies > [0] && ( */}
        <div> 
          <div id='text'>
            <h2 className='flex items-center justify-center pt-8 text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-500'> <span className='text-white'>Resultados para{query}</span> </h2>
          </div>

          <div id='content' className='flex flex-wrap justify-between w-screen p-16'>
            {movies.map((movie) => 
              <MovieCard key={movie.id} movie={movie} /> 
            )};
          </div>
        </div>
     {/* )} */}
    </div>
  )
}

export default Search