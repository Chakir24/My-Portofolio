'use client'

import { useEffect } from 'react'

export function useScrollActive() {
  useEffect(() => {
    // Wait for DOM to be ready
    const initScrollActive = () => {
      const sections = document.querySelectorAll('section')
      const navLinks = document.querySelectorAll('.navbar a')

      if (sections.length === 0 || navLinks.length === 0) {
        return
      }

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

      // Initial call
      handleScroll()
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }

    // Use requestAnimationFrame to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const cleanup = initScrollActive()
      return cleanup
    }, 100)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])
}

