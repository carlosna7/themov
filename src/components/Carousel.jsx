'use client'
import { useEffect, useRef, useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import MovieCard from './MovieCard';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';

export default function Carousel({ movies, eyebrow, title }) {
  const scrollerRef = useRef(null);
  const fillRef = useRef(null);
  const drag = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = () => {
    const el = scrollerRef.current;
    const max = el.scrollWidth - el.clientWidth;
    const progress = max > 0 ? el.scrollLeft / max : 1;

    fillRef.current.style.transform = `scaleX(${Math.max(progress, 0.04)})`;
    setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft > max - 4 });
  };

  useEffect(update, [movies]);

  const scrollByPage = (dir) => {
    const el = scrollerRef.current;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  // arrastar com o mouse; no toque o scroll nativo já resolve
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse') return;
    drag.current = { x: e.clientX, left: scrollerRef.current.scrollLeft, moved: false };
    // o snap brigaria com o arraste; volta ao soltar
    scrollerRef.current.style.scrollSnapType = 'none';
  };

  const onPointerMove = (e) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 5) drag.current.moved = true;
    scrollerRef.current.scrollLeft = drag.current.left - dx;
  };

  const endDrag = () => {
    if (!drag.current) return;
    scrollerRef.current.style.scrollSnapType = '';
    setTimeout(() => { drag.current = null; }, 0);
  };

  // depois de arrastar, o clique que vem em seguida não deve abrir o filme
  const onClickCapture = (e) => {
    if (drag.current?.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const arrow = 'flex h-11 w-11 items-center justify-center rounded-full border border-leaf/60 text-leaf transition hover:bg-leaf hover:text-paper disabled:pointer-events-none disabled:opacity-30';

  return (
    <section className='py-16 md:py-24'>
      <div className='container-x'>
        <SectionHeader eyebrow={eyebrow} title={title}>
          <div className='flex gap-3'>
            <button className={arrow} onClick={() => scrollByPage(-1)} disabled={edges.start} aria-label='Anteriores'>
              <FiArrowLeft />
            </button>
            <button className={arrow} onClick={() => scrollByPage(1)} disabled={edges.end} aria-label='Próximos'>
              <FiArrowRight />
            </button>
          </div>
        </SectionHeader>

        <Reveal>
          <div
            ref={scrollerRef}
            onScroll={update}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onClickCapture={onClickCapture}
            onDragStart={(e) => e.preventDefault()}
            className='no-scrollbar -mx-6 flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto px-6 active:cursor-grabbing md:mx-0 md:gap-6 md:px-0'
          >
            {movies.map((movie) => (
              <div key={movie.id} className='w-[44vw] shrink-0 snap-start sm:w-[30vw] md:w-[22vw] lg:w-[17vw] xl:w-[220px]'>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>

          <div className='mt-8 h-[2px] max-w-[320px] overflow-hidden bg-line'>
            <div ref={fillRef} className='h-full origin-left bg-accent transition-transform duration-300' />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
