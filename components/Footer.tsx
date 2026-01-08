'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t, isLoading } = useLanguage()
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Afficher le bouton après avoir scrollé de 300px
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  
  return (
    <>
      <footer className="footer">
        <div className="social">
          <a href="" className='bx bxl-linkedin'></a>
          <a href="" className='bx bxl-github'></a>
          <a href="" className='bx bxl-instagram'></a>
          <a href="" className='bx bxl-twitter'></a>
        </div>

      <ul className="list">
        <li>
          <Link href="/#home">{isLoading ? 'About me' : t('nav.home')}</Link>
        </li>
        <li>
          <Link href="/#services">{isLoading ? 'Skills' : t('nav.skills')}</Link>
        </li>
        <li>
          <Link href="/blog">{isLoading ? 'Blog' : t('nav.blog')}</Link>
        </li>
        <li>
          <Link href="/hire">{isLoading ? 'Hire' : t('home.hire')} Me</Link>
        </li>
        <li>
          <Link href="/#contact">{isLoading ? 'Contact' : t('nav.contact')}</Link>
        </li>
      </ul>
      <p className="copyright">
        Chakir <span>BOUSSARI</span> | {isLoading ? 'All Rights Reserved' : t('footer.rights')}
      </p>
      </footer>

      {/* Bouton Scroll to Top */}
      {showScrollTop && (
        <button 
          className="scroll-to-top-btn" 
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Back to top"
        >
          <i className='bx bx-up-arrow-alt'></i>
        </button>
      )}
    </>
  )
}

