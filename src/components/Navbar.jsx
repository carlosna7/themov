'use client'
import Link from 'next/link'
import { BiMoviePlay, BiSearch } from 'react-icons/bi'

export default function Navbar() {
  return (
    <nav id='navbar' className='flex justify-between items-center px-16 py-4 bg-black'>
      <div>
        <Link className='flex items-center gap-4 text-4xl font-bold text-sky-300 hover:text-blue-400 duration-500 ' href="/"><BiMoviePlay className='w-12 h-12'/>THEMOV</Link>
      </div>

      <form className='flex gap-4'>
        <input className='p-2 rounded-lg bg-sky-950 focus:outline-none focus:text-white placeholder:text-slate-300' type='text' placeholder='Busque um filme...' />

        <button className='flex justify-center items-center cursor-pointer bg-sky-300 border-2 border-sky-300 rounded-lg w-10 h-10 text-black hover:bg-transparent hover:border-blue-400 hover:text-blue-400 duration-500' type='submit'>
          <BiSearch className='w-8 h-8'/>
        </button>
      </form>
    </nav>
  )
}