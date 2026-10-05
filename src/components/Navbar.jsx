'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';

export default function Navbar() {
  const [search, setSearch] = useState("")

  const router = useRouter();

  const handleSubmit = (evt) => {
    evt.preventDefault()

    const term = search.trim();
    if (!term) return;

    router.push(`/pages/search?q=${encodeURIComponent(term)}`);
    setSearch("");
  };

  return (
    <nav className='sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm'>
      <div className='mx-auto max-w-[1400px] px-4 sm:px-8 h-16 flex items-center justify-between gap-6'>
        <Link href="/" className='group flex items-center gap-2'>
          <span className='h-2.5 w-2.5 rounded-full bg-accent group-hover:animate-pulse' />
          <span className='display text-[28px] leading-none tracking-wide'>Themov</span>
        </Link>

        <form onSubmit={handleSubmit} className='flex items-center gap-2 border-b border-muted/50 focus-within:border-ink transition-colors w-full max-w-[260px]'>
          <input
            className='w-full bg-transparent py-1.5 font-mono text-sm placeholder:text-muted focus:outline-none'
            type='text'
            placeholder='buscar um filme'
            aria-label='Buscar um filme'
            onChange={(evt) => setSearch(evt.target.value)}
            value={search}
          />

          <button type='submit' aria-label='Buscar' className='text-muted hover:text-accent transition-colors'>
            <BiSearch className='w-5 h-5' />
          </button>
        </form>
      </div>
    </nav>
  )
}
