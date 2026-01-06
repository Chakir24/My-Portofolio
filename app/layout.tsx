import type { Metadata } from 'next'
import './globals.css'
import Providers from './providers'

export const metadata: Metadata = {
  title: 'My Portfolio - Chakir BOUSSARI',
  description: 'Portfolio website of Chakir BOUSSARI - Full Stack Developer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  var language = localStorage.getItem('language') || 'en';
                  document.documentElement.setAttribute('data-theme', theme);
                  document.documentElement.setAttribute('data-language', language);
                  
                  // Appliquer le thème immédiatement au body
                  document.documentElement.style.backgroundColor = theme === 'dark' ? 'black' : '#f5f5f5';
                  
                  // Cacher le navbar sur mobile immédiatement avec style inline critique
                  if (window.innerWidth <= 768) {
                    var style = document.createElement('style');
                    style.id = 'critical-navbar-hide';
                    style.textContent = '.navbar:not(.active) { display: none !important; opacity: 0 !important; visibility: hidden !important; }';
                    document.head.insertBefore(style, document.head.firstChild);
                  }
                } catch (e) {
                  // Fallback si localStorage n'est pas disponible
                  document.documentElement.setAttribute('data-theme', 'dark');
                  document.documentElement.setAttribute('data-language', 'en');
                }
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

