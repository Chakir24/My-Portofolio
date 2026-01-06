import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="social">
        <a href="" className='bx bxl-linkedin'></a>
        <a href="" className='bx bxl-github'></a>
        <a href="" className='bx bxl-instagram'></a>
        <a href="" className='bx bxl-twitter'></a>
      </div>

      <ul className="list">
        <li>
          <Link href="/#home">Home</Link>
        </li>
        <li>
          <Link href="/#services">Skills</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        <li>
          <Link href="/hire">Hire Me</Link>
        </li>
        <li>
          <Link href="/#contact">Contact</Link>
        </li>
      </ul>
      <p className="copyright">
        Chakir <span>BOUSSARI</span> | All Rights Reserved
      </p>
    </footer>
  )
}

