'use client'

import { useEffect } from 'react'

export function useScrollActive() {
  useEffect(() => {
    const sections = document.querySelectorAll('section')
    const navLinks = document.querySelectorAll('.navbar a')

    const handleScroll = () => {
      const top = window.scrollY

      sections.forEach((sec) => {
        const offset = (sec as HTMLElement).offsetTop - 150
        const height = sec.offsetHeight
        const id = sec.getAttribute('id')

        if (top >= offset && top < offset + height) {
          navLinks.forEach((link) => {
            link.classList.remove('active')
            const href = link.getAttribute('href')
            if (href === `#${id}` || (href === '/' && id === 'home')) {
              link.classList.add('active')
            }
          })
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
}

