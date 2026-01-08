'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Background from '@/components/Background'
import { useScrollActive } from '@/hooks/useScrollActive'
import { useLanguage } from '@/contexts/LanguageContext'

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
  const { t, isLoading } = useLanguage()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    const form = e.currentTarget
    const formData = new FormData(form)
    
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        form.reset()
        setTimeout(() => {
          setSubmitStatus(null)
        }, 3000)
      } else {
        setSubmitStatus('error')
        console.error('Error:', result.error)
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <div className="input-box">
          <input type="text" name="name" placeholder={isLoading ? 'Full Name' : t('contact.fullName')} required disabled={isSubmitting} />
          <input type="email" name="email" placeholder={isLoading ? 'Email' : t('contact.email')} required disabled={isSubmitting} />
        </div>
        <div className="input-box">
          <input type="tel" name="phone" placeholder={isLoading ? 'Phone Number' : t('contact.phone')} disabled={isSubmitting} />
          <input type="text" name="subject" placeholder={isLoading ? 'Subject' : t('contact.subject')} disabled={isSubmitting} />
        </div>
      </div>
      <div className="input-group-2">
        <textarea name="message" cols={30} rows={10} placeholder={isLoading ? 'Your Message' : t('contact.message')} required disabled={isSubmitting}></textarea>
        <button 
          type="submit" 
          className="btn" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <i className='bx bx-loader-alt bx-spin' style={{ marginRight: '0.5rem' }}></i>
              {isLoading ? 'Sending...' : t('contact.sending')}
            </>
          ) : (
            isLoading ? 'Send Message' : t('contact.send')
          )}
        </button>
      </div>
      {isSubmitting && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <i className='bx bx-loader-alt bx-spin'></i>
            <p>{isLoading ? 'Sending your message...' : t('contact.sending')}</p>
          </div>
        </div>
      )}
      {submitStatus === 'success' && !isSubmitting && (
        <div className="success-message">
          <i className='bx bx-check-circle'></i>
          <p>{isLoading ? 'Message sent successfully! I\'ll get back to you soon.' : t('contact.success')}</p>
        </div>
      )}
      {submitStatus === 'error' && !isSubmitting && (
        <div className="error-message">
          <i className='bx bx-error-circle'></i>
          <p>{isLoading ? 'Error sending message. Please try again.' : t('contact.error')}</p>
        </div>
      )}
    </form>
  )
}

export default function Home() {
  useScrollActive()
  const { t, isLoading } = useLanguage()

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
        title={isLoading ? 'Download CV as PDF' : t('home.downloadCV')}
        onClick={handleDownloadCV}
      >
        <i className='bx bx-download'></i>
        <span className="download-cv-text">{isLoading ? 'Download CV' : t('home.downloadCV')}</span>
      </button>

      <section className="home" id="home">
        <div className="home-content">
          <h1>{t('home.title')} <span>Chakir</span></h1>
          <h3 className="text-animation">{t('home.subtitle')} <span></span></h3>
          
          <p>{t('home.description')}</p>

          <div className="social-icons">
            <a href="" className='bx bxl-linkedin'></a>
            <a href="https://github.com/Chakir24" target="_blank" rel="noopener noreferrer" className='bx bxl-github'></a>
            <a href="" className='bx bxl-instagram'></a>
            <a href="" className='bx bxl-twitter'></a>
          </div>
          <div className="btn-group">
            <Link href="/hire" className="btn">{t('home.hire')}</Link>
            <a href="#contact" className="btn">{t('home.contact')}</a>
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

      <section className="experience" id="experience">
        <h2 className="heading">{isLoading ? 'Experience' : t('experience.title')}</h2>
            
        <div className="timeline-items">
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-date">2024 - 2025</div>
            <div className="timeline-content">
              <h3>Frontend Engineer @ Foxtech</h3>
              <p>Maintenance of the Dispatch Suite, a web and mobile solution aimed at improving productivity on construction sites and optimizing resource management.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-date">2023 - 2025</div>
            <div className="timeline-content">
              <h3>Web Engineer @ Neolixe</h3>
              <p>Development of a web application for IT management of municipalities, including the creation of the town hall presentation website, increasing local administration visibility and facilitating online interaction with residents.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-date">2024 - 2025</div>
            <div className="timeline-content">
              <h3>Frontend Engineer @ Plannia</h3>
              <p>Development of an AI-automated web application for project plan updates, with algorithms calculating critical path, margin and remaining budget, as well as generating visual reports and interactive dashboards.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-date">2023 - 2024</div>
            <div className="timeline-content">
              <h3>Web Engineer @ Faseya</h3>
              <p>Design and development of an innovative CRM, structuring the fundamental architecture of the application and developing key modules such as human resources management, projects, dashboards, settings and a storage module (Drive).</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-date">2023 - 2024</div>
            <div className="timeline-content">
              <h3>Web Engineer @ MA-INFO</h3>
              <p>Development of an ERP application and implementation of key features in various modules, as well as the development of the institutional website and a showcase site dedicated to ERP commercialization.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-date">2022 - 2023</div>
            <div className="timeline-content">
              <h3>Web Engineer @ Findtech</h3>
              <p>Design and development of a dashboard for a carpooling mobile application, improving user experience and service visibility.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-date">2021 - 2023</div>
            <div className="timeline-content">
              <h3>Graphic Designer & Frontend Engineer @ MC&Co Agency</h3>
              <p>Development of the agency&apos;s showcase website, highlighting the services offered with an aesthetic and functional design, ensuring smooth navigation and optimal user experience.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <h2 className="heading">{isLoading ? 'Skills' : t('skills.title')}</h2>

        <div className="services-container">
          <div className="service-box">
            <div className="service-info">
              <h4>{isLoading ? 'UI Design' : t('skills.uiDesign.title')}</h4>
              <p>{isLoading ? 'Creating intuitive and visually appealing user interfaces that enhance user experience. I specialize in designing modern, responsive layouts using design principles, color theory, and typography. Proficient in tools like Figma, Adobe XD, and Sketch to bring concepts to life with pixel-perfect precision.' : t('skills.uiDesign.description')}</p>
            </div>
          </div>

          <div className="service-box">
            <div className="service-info">
              <h4>{isLoading ? 'Frontend Development' : t('skills.frontend.title')}</h4>
              <p>{isLoading ? 'Building responsive and interactive web applications using modern technologies like React, Vue.js, and Angular. Experienced in HTML5, CSS3, JavaScript (ES6+), and TypeScript. I create fast, accessible, and SEO-friendly websites that work seamlessly across all devices and browsers.' : t('skills.frontend.description')}</p>
            </div>
          </div>

          <div className="service-box">
            <div className="service-info">
              <h4>{isLoading ? 'Backend Development' : t('skills.backend.title')}</h4>
              <p>{isLoading ? 'Developing robust server-side applications and RESTful APIs using Node.js, Python, and Java. Experienced in database design (SQL and NoSQL), authentication systems, and cloud services. I build scalable, secure, and efficient backend solutions that power modern web applications.' : t('skills.backend.description')}</p>
            </div>
          </div>

          <div className="service-box">
            <div className="service-info">
              <h4>{isLoading ? 'Testing' : t('skills.testing.title')}</h4>
              <p>{isLoading ? 'Ensuring code quality and reliability through comprehensive testing strategies. Proficient in unit testing, integration testing, and end-to-end testing using frameworks like Jest, Mocha, and Cypress. I write maintainable test cases that catch bugs early and ensure smooth deployments.' : t('skills.testing.description')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <h2 className="heading">{isLoading ? 'Contact' : t('contact.title')} <span>{isLoading ? 'Me' : t('contact.me')}</span></h2>

        <ContactForm />
      </section>

      <Footer />
    </>
  )
}

