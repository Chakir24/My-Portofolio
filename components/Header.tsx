'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Header() {
  const getInitialTheme = (): 'dark' | 'light' => {
    if (typeof window === 'undefined') return 'dark'
    const htmlTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light'
    if (htmlTheme) return htmlTheme
    try {
      return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
    } catch {
      return 'dark'
    }
  }

  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { language, setLanguage, t, isLoading } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Ensure theme is applied
    const savedTheme = getInitialTheme()
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.language-selector')) {
        setLangMenuOpen(false)
      }
    }

    if (langMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [langMenuOpen])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname === path
  }

  const handleLanguageChange = (lang: 'en' | 'fr') => {
    setLanguage(lang)
    setLangMenuOpen(false)
  }

  return (
    <header className="header">
      <Link href="/" className="logo">
        Chakir <span>BOUSSARI</span>
      </Link>

      <div className="header-icons">
        <div className="language-selector">
          <button 
            className="language-btn"
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            title={mounted && language === 'en' ? 'English' : 'Français'}
            suppressHydrationWarning
          >
            {mounted ? (language === 'en' ? 'EN' : 'FR') : 'EN'}
          </button>
          {langMenuOpen && (
            <div className="language-menu">
              <button 
                className={language === 'en' ? 'active' : ''}
                onClick={() => handleLanguageChange('en')}
              >
                English
              </button>
              <button 
                className={language === 'fr' ? 'active' : ''}
                onClick={() => handleLanguageChange('fr')}
              >
                Français
              </button>
            </div>
          )}
        </div>
        <i 
          className={theme === 'dark' ? 'bx bx-moon' : 'bx bx-sun'} 
          id="theme-toggle"
          onClick={toggleTheme}
          style={{ cursor: 'pointer' }}
        />
        <i 
          className={`bx ${menuOpen ? 'bx-x' : 'bx-menu'}`}
          id="menu-icon"
          onClick={toggleMenu}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <nav className={`navbar ${menuOpen ? 'active' : ''}`} aria-label="Main navigation">
        <Link href="/" className={isActive('/') ? 'active' : ''} onClick={closeMenu}>
          {isLoading ? 'About me' : t('nav.home')}
        </Link>
        <Link href="/#education" className={pathname === '/' ? '' : ''} onClick={closeMenu}>
          {isLoading ? 'Education' : t('nav.education')}
        </Link>
        <Link href="/#services" className={pathname === '/' ? '' : ''} onClick={closeMenu}>
          {isLoading ? 'Skills' : t('nav.skills')}
        </Link>
        <Link href="/blog" className={isActive('/blog') ? 'active' : ''} onClick={closeMenu}>
          {isLoading ? 'Blog' : t('nav.blog')}
        </Link>
        <Link href="/#contact" className={pathname === '/' ? '' : ''} onClick={closeMenu}>
          {isLoading ? 'Contact' : t('nav.contact')}
        </Link>
      </nav>
    </header>
  )
}

