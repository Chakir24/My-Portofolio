'use client'

import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Background from '@/components/Background'
import { useScrollActive } from '@/hooks/useScrollActive'

export default function Home() {
  useScrollActive()

  const handleDownloadCV = () => {
    // Option 1: Si vous avez un fichier CV dans le dossier public
    // const link = document.createElement('a')
    // link.href = '/cv.pdf'
    // link.download = 'Chakir_BOUSSARI_CV.pdf'
    // link.click()

    // Option 2: Pour l'instant, on peut ouvrir un lien ou afficher un message
    // Vous pouvez remplacer cette URL par le lien vers votre CV
    window.open('/cv.pdf', '_blank')
    
    // Ou si vous n'avez pas encore de CV, vous pouvez afficher un message
    // alert('CV download will be available soon!')
  }

  return (
    <>
      <Header />
      <Background />
      
      <button 
        className="download-cv-btn" 
        id="download-cv" 
        title="Download CV as PDF"
        onClick={handleDownloadCV}
      >
        <i className='bx bx-download'></i>
        <span className="download-cv-text">Download CV</span>
      </button>

      <section className="home" id="home">
        <div className="home-content">
          <h1>Hi, It&apos;s <span>Chakir</span></h1>
          <h3 className="text-animation">I&apos;m a <span></span></h3>
          
          <p>
            I&apos;m a passionate developer and designer who loves creating digital solutions 
            that make a difference. With a keen eye for design and a strong foundation in 
            development, I bring ideas to life through clean code and intuitive user interfaces.
            When I&apos;m not coding, you can find me exploring new technologies, contributing to 
            open-source projects, or sharing knowledge with the developer community.
          </p>

          <div className="social-icons">
            <a href="" className='bx bxl-linkedin'></a>
            <a href="" className='bx bxl-github'></a>
            <a href="" className='bx bxl-instagram'></a>
            <a href="" className='bx bxl-twitter'></a>
          </div>
          <div className="btn-group">
            <Link href="/hire" className="btn">Hire</Link>
            <a href="#contact" className="btn">Contact</a>
          </div>
        </div>
        
        <div className="home-img">
          <Image 
            src="/image2.jpg" 
            alt="Chakir BOUSSARI" 
            width={600}
            height={600}
            style={{ borderRadius: '50%' }}
          />
        </div>
      </section>

      <section className="education" id="education">
        <h2 className="heading">Education</h2>
            
        <div className="timeline-items">
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-date">2021</div>
            <div className="timeline-content">
              <h3>High School</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                 Nihil explicabo quidem autem quas dolorum perferendis 
                aspernatur quis quia sapiente, unde non, voluptatibus 
                deserunt tenetur commodi animi rem incidunt ipsa dolore!</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-date">2022</div>
            <div className="timeline-content">
              <h3>University</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                 Nihil explicabo quidem autem quas dolorum perferendis 
                aspernatur quis quia sapiente, unde non, voluptatibus 
                deserunt tenetur commodi animi rem incidunt ipsa dolore!</p>
            </div>
          </div> 
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-date">2023</div>
            <div className="timeline-content">
              <h3>Internship</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                 Nihil explicabo quidem autem quas dolorum perferendis 
                aspernatur quis quia sapiente, unde non, voluptatibus 
                deserunt tenetur commodi animi rem incidunt ipsa dolore!</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-date">2024</div>
            <div className="timeline-content">
              <h3>Job 1</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                 Nihil explicabo quidem autem quas dolorum perferendis 
                aspernatur quis quia sapiente, unde non, voluptatibus 
                deserunt tenetur commodi animi rem incidunt ipsa dolore!</p>
            </div>
          </div>  
        </div>
      </section>

      <section className="services" id="services">
        <h2 className="heading">Skills</h2>

        <div className="services-container">
          <div className="service-box">
            <div className="service-info">
              <h4>UI Design</h4>
              <p>Creating intuitive and visually appealing user interfaces that enhance user experience. 
              I specialize in designing modern, responsive layouts using design principles, color theory, 
              and typography. Proficient in tools like Figma, Adobe XD, and Sketch to bring concepts 
              to life with pixel-perfect precision.</p>
            </div>
          </div>

          <div className="service-box">
            <div className="service-info">
              <h4>Frontend Development</h4>
              <p>Building responsive and interactive web applications using modern technologies like React, 
              Vue.js, and Angular. Experienced in HTML5, CSS3, JavaScript (ES6+), and TypeScript. 
              I create fast, accessible, and SEO-friendly websites that work seamlessly across all 
              devices and browsers.</p>
            </div>
          </div>

          <div className="service-box">
            <div className="service-info">
              <h4>Backend Development</h4>
              <p>Developing robust server-side applications and RESTful APIs using Node.js, Python, 
              and Java. Experienced in database design (SQL and NoSQL), authentication systems, 
              and cloud services. I build scalable, secure, and efficient backend solutions that 
              power modern web applications.</p>
            </div>
          </div>

          <div className="service-box">
            <div className="service-info">
              <h4>Testing</h4>
              <p>Ensuring code quality and reliability through comprehensive testing strategies. 
              Proficient in unit testing, integration testing, and end-to-end testing using 
              frameworks like Jest, Mocha, and Cypress. I write maintainable test cases that 
              catch bugs early and ensure smooth deployments.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <h2 className="heading">Contact <span>Me</span></h2>

        <form action="">
          <div className="input-group">
            <div className="input-box">
              <input type="text" placeholder="Full Name" />
              <input type="email" name="" id="" placeholder="Email" />
            </div>
            <div className="input-box">
              <input type="tel" name="" id="" placeholder="Phone Number" />
              <input type="text" placeholder="Subject" />
            </div>
          </div>
          <div className="input-group-2">
            <textarea name="" id="" cols={30} rows={10} placeholder="Your Message"></textarea>
            <input type="submit" value="Send Message" className="btn" />
          </div>
        </form>
      </section>

      <Footer />
    </>
  )
}

