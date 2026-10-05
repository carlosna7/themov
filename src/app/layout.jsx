import localFont from 'next/font/local';
import Navbar from '@/components/Navbar';
import './globals.css'

const aeonik = localFont({
  src: [
    { path: '../fonts/AeonikProTRIAL-Light.otf', weight: '300', style: 'normal' },
    { path: '../fonts/AeonikProTRIAL-LightItalic.otf', weight: '300', style: 'italic' },
    { path: '../fonts/AeonikProTRIAL-Regular.otf', weight: '400', style: 'normal' },
    { path: '../fonts/AeonikProTRIAL-RegularItalic.otf', weight: '400', style: 'italic' },
    { path: '../fonts/AeonikProTRIAL-Medium.otf', weight: '500', style: 'normal' },
    { path: '../fonts/AeonikProTRIAL-SemiBold.otf', weight: '600', style: 'normal' },
    { path: '../fonts/AeonikProTRIAL-Bold.otf', weight: '700', style: 'normal' },
  ],
  variable: '--font-aeonik',
});

export const metadata = {
  title: 'Themov',
  description: 'Filmes populares, busca e ficha técnica, com dados do TMDB.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={aeonik.variable}>
      <body className='font-sans min-h-screen flex flex-col'>
        <Navbar />

        <main className='flex-1'>{children}</main>

        <footer className='border-t border-line mt-24'>
          <div className='container-x py-10 flex flex-col sm:flex-row justify-between gap-3 label'>
            <span>theMov &copy; {new Date().getFullYear()}</span>
            <span>Dados fornecidos pelo TMDB. Não endossado ou certificado pelo TMDB.</span>
          </div>
        </footer>
      </body>
    </html>
  )
};
