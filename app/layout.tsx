import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css'; // Global styles
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Birarpanjot Singh Kanwer | Full-Stack Developer',
  description: 'Portfolio of Birarpanjot Singh Kanwer, a full-stack developer specializing in React, Next.js, and React Native, with apps live on the App Store and Google Play, production AI features, and merged open-source PRs.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
};

// Runs before first paint so visitors who picked light mode don't get a dark flash.
// Mirrors applyTheme() in ThemeProvider; the server always renders the default (dark).
const themeInitScript = `try{if(localStorage.getItem('bk_portfolio_theme')==='light'){var r=document.documentElement;r.classList.remove('dark');r.classList.add('light');r.style.colorScheme='light'}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans antialiased bg-background text-foreground selection:bg-primary/30 selection:text-white" suppressHydrationWarning>
        <ThemeProvider>
          <div className="noise-bg"></div>
          <SmoothScroll>
            <CustomCursor />
            <Navbar />
            <main className="relative z-10 flex min-h-screen flex-col">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
