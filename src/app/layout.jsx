import { Archivo, Newsreader, IBM_Plex_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  adjustFontFallback: false,
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
});

export const metadata = {
  title: 'Themov',
  description: 'Filmes populares, busca e ficha técnica, com dados do TMDB.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={`${archivo.variable} ${newsreader.variable} ${plexMono.variable}`}>
      <body className='font-sans min-h-screen flex flex-col'>
        <Navbar />

        <main className='flex-1'>{children}</main>

        <footer className='border-t border-line mt-24'>
          <div className='mx-auto max-w-[1400px] px-4 sm:px-8 py-8 flex flex-col sm:flex-row justify-between gap-2 label'>
            <span>Themov</span>
            <span>Dados fornecidos pelo TMDB. Não endossado ou certificado pelo TMDB.</span>
          </div>
        </footer>
      </body>
    </html>
  )
};
