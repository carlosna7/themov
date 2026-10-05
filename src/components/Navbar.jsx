'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';

export default function Navbar() {
  const [search, setSearch] = useState("")
  const [scrolled, setScrolled] = useState(false)

  const router = useRouter();

  // transparente sobre o banner, ganha fundo depois que a página desce
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault()

    const term = search.trim();
    if (!term) return;

    router.push(`/pages/search?q=${encodeURIComponent(term)}`);
    setSearch("");
  };

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled ? 'border-b border-line bg-paper/90 backdrop-blur-md' : 'border-b border-transparent'}`}>
      <div className='container-x h-[72px] flex items-center justify-between gap-6'>
        <Link href="/" className='text-2xl font-bold tracking-[-0.04em] hover:text-accent transition-colors'>
          themov<span className='text-accent'>.</span>
        </Link>

        <form onSubmit={handleSubmit} className='flex w-full max-w-[280px] items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 transition-colors focus-within:border-accent'>
          <FiSearch className='h-4 w-4 shrink-0 text-muted' />
          <input
            className='w-full bg-transparent py-2 text-sm placeholder:text-muted focus:outline-none'
            type='text'
            placeholder='Buscar um filme'
            aria-label='Buscar um filme'
            onChange={(evt) => setSearch(evt.target.value)}
            value={search}
          />
        </form>
      </div>
    </nav>
  )
}
