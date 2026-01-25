import type { Metadata } from 'next'
import './globals.css'
import Providers from './providers'
import StructuredData from '@/components/StructuredData'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chakir.dev'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Chakir BOUSSARI - Full Stack Developer & Designer',
    template: '%s | Chakir BOUSSARI'
  },
  description: 'Bienvenue sur le portfolio de Chakir BOUSSARI, Développeur Full Stack et Designer. Spécialisé en React, Next.js, Node.js, et création d\'interfaces utilisateur modernes. Disponible pour projets freelance et collaborations.',
  keywords: [
    'Chakir BOUSSARI',
    'Full Stack Developer',
    'Web Developer',
    'React Developer',
    'Next.js Developer',
    'Frontend Developer',
    'Backend Developer',
    'UI/UX Designer',
    'Portfolio',
    'Développeur Web',
    'Développeur Full Stack',
    'Freelance Developer',
    'Web Design',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'PostgreSQL'
  ],
  authors: [{ name: 'Chakir BOUSSARI' }],
  creator: 'Chakir BOUSSARI',
  publisher: 'Chakir BOUSSARI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Chakir BOUSSARI Portfolio',
    title: 'Chakir BOUSSARI - Full Stack Developer & Designer',
    description: 'Portfolio professionnel de Chakir BOUSSARI, développeur Full Stack et designer. Spécialisé en React, Next.js, Node.js, et création d\'interfaces utilisateur modernes.',
    images: [
      {
        url: `${siteUrl}/image2.jpg`,
        width: 1200,
        height: 630,
        alt: 'Chakir BOUSSARI - Full Stack Developer & Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chakir BOUSSARI - Full Stack Developer & Designer',
    description: 'Portfolio professionnel de Chakir BOUSSARI, développeur Full Stack et designer.',
    images: [`${siteUrl}/image2.jpg`],
    creator: '@chakirboussari',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/myfav.png', sizes: 'any', type: 'image/png' },
      { url: '/myfav.png', type: 'image/png', sizes: '16x16' },
      { url: '/myfav.png', type: 'image/png', sizes: '32x32' },
      { url: '/myfav.png', type: 'image/png', sizes: '192x192' },
      { url: '/myfav.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/myfav.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/myfav.png',
  },
  verification: {
    // Ajoutez votre clé de vérification Google Search Console ici
    // google: 'votre-clé-de-vérification',
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-US': `${siteUrl}?lang=en`,
      'fr-FR': `${siteUrl}?lang=fr`,
    },
  },
  category: 'Portfolio',
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
        <StructuredData />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

