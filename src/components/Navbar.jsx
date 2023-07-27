'use client'
import Link from 'next/link'
import { BiMoviePlay, BiSearch } from 'react-icons/bi'

export default function Navbar() {
  return (
    <nav id='navbar' className='flex justify-between mx-16 py-4'>
      <div>
        <Link className='flex items-center flex-column gap-4 text-4xl font-bold text-sky-300 hover:text-blue-400 duration-500 ' href="/"><BiMoviePlay className='w-12 h-12'/>LOGO</Link>
      </div>

      <form className='flex justify-end items-center gap-4'>
        <input type='text' placeholder='Busque um filme...' />
          
        <button type='submit'>
          <BiSearch className='font-5xl text-sky-300 hover:text-blue-400 w-8 h-8'/>
        </button>
      </form>
    </nav>
  )
}