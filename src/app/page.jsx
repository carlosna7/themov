'use client'
import { useState, useEffect } from 'react';
import { tmdb } from '@/lib/tmdb';
import HeroTop5, { HeroSkeleton } from '@/components/HeroTop5';
import PinnedRow from '@/components/PinnedRow';
import Carousel from '@/components/Carousel';

export default function Home() {
  const [lists, setLists] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      tmdb('/trending/movie/week'),
      tmdb('/movie/popular'),
      tmdb('/movie/now_playing', { region: 'BR' }),
      tmdb('/movie/top_rated'),
      tmdb('/movie/upcoming', { region: 'BR' }),
    ])
      .then(([trending, popular, nowPlaying, topRated, upcoming]) => setLists({
        top5: trending.results.filter((m) => m.backdrop_path).slice(0, 5),
        popular: popular.results.slice(0, 10),
        nowPlaying: nowPlaying.results,
        topRated: topRated.results,
        upcoming: upcoming.results,
      }))
      .catch((err) => setError(err.message));
  }, [])

  if (error) {
    return (
      <div className='container-x pt-40 font-mono text-sm text-accent'>
        Não deu para carregar os filmes: {error}
      </div>
    )
  }

  if (!lists) return <HeroSkeleton />;

  return (
    <>
      <HeroTop5 movies={lists.top5} />

      <PinnedRow number='01' eyebrow='Populares' title='O que todo mundo está vendo' movies={lists.popular} />

      <Carousel number='02' eyebrow='Nos cinemas' title='Em cartaz agora' movies={lists.nowPlaying} />

      <Carousel number='03' eyebrow='Crítica e público' title='Os mais bem avaliados' movies={lists.topRated} />

      <Carousel number='04' eyebrow='Lançamentos' title='Chegando em breve' movies={lists.upcoming} />
    </>
  )
};
