'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const pathname = usePathname()

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' || 'dark'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

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

  return (
    <header className="header">
      <Link href="/" className="logo">
        Chakir <span>BOUSSARI</span>
      </Link>

      <div className="header-icons">
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

      <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
        <Link href="/" className={isActive('/') ? 'active' : ''} onClick={closeMenu}>
          Home
        </Link>
        <Link href="/#education" className={pathname === '/' ? '' : ''} onClick={closeMenu}>
          Education
        </Link>
        <Link href="/#services" className={pathname === '/' ? '' : ''} onClick={closeMenu}>
          Skills
        </Link>
        <Link href="/blog" className={isActive('/blog') ? 'active' : ''} onClick={closeMenu}>
          Blog
        </Link>
        <Link href="/#contact" className={pathname === '/' ? '' : ''} onClick={closeMenu}>
          Contact
        </Link>
      </nav>
    </header>
  )
}

