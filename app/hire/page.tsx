'use client'

import Link from 'next/link'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Background from '@/components/Background'

export default function Hire() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const form = e.currentTarget
    const formData = new FormData(form)
    const data: Record<string, string> = {}
    formData.forEach((value, key) => {
      data[key] = value.toString()
    })
    
    setIsSubmitting(true)
    const submitBtn = form.querySelector('.btn-submit') as HTMLButtonElement
    const originalText = submitBtn.innerHTML
    
    submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Submitting...'
    submitBtn.disabled = true
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      console.log('Form submitted:', data)
      
      alert('Thank you! Your project request has been submitted successfully. I will get back to you within 24 hours.')
      
      form.reset()
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
      setIsSubmitting(false)
      
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 1500)
  }

  return (
    <>
      <Header />
      <Background />

      <section className="hire-hero" id="hire">
        <div className="hire-hero-content">
          <h1>Let&apos;s Work <span>Together</span></h1>
          <p className="hire-subtitle">Transform your ideas into exceptional digital experiences</p>
          <p className="hire-description">
            I&apos;m a passionate full-stack developer and designer ready to bring your vision to life. 
            Whether you need a complete web application, a redesign, or technical expertise, I&apos;m here to help you succeed.
          </p>
          <div className="btn-group">
            <Link href="/#contact" className="btn">Get Started</Link>
            <Link href="/#services" className="btn">View My Skills</Link>
          </div>
        </div>
      </section>

      <section className="hire-why">
        <h2 className="heading">Why <span>Choose Me</span></h2>
        
        <div className="why-container">
          <div className="why-item">
            <div className="why-icon">
              <i className='bx bx-check-circle'></i>
            </div>
            <h3>Proven Experience</h3>
            <p>Years of experience building web applications and digital solutions for various industries. 
            I&apos;ve worked on projects ranging from small startups to enterprise-level applications.</p>
          </div>

          <div className="why-item">
            <div className="why-icon">
              <i className='bx bx-time-five'></i>
            </div>
            <h3>Timely Delivery</h3>
            <p>I understand the importance of deadlines. You can count on me to deliver your project 
            on time without compromising on quality. Clear communication and regular updates keep you informed.</p>
          </div>

          <div className="why-item">
            <div className="why-icon">
              <i className='bx bx-code-curly'></i>
            </div>
            <h3>Clean Code</h3>
            <p>I write maintainable, well-documented code following industry best practices. 
            Your project will be easy to understand, extend, and maintain long after delivery.</p>
          </div>

          <div className="why-item">
            <div className="why-icon">
              <i className='bx bx-support'></i>
            </div>
            <h3>Ongoing Support</h3>
            <p>My relationship with clients doesn&apos;t end at project delivery. I provide ongoing support, 
            maintenance, and updates to ensure your project continues to perform optimally.</p>
          </div>

          <div className="why-item">
            <div className="why-icon">
              <i className='bx bx-devices'></i>
            </div>
            <h3>Responsive Design</h3>
            <p>Every project I build is fully responsive and optimized for all devices. 
            Your users will have a seamless experience whether they&apos;re on desktop, tablet, or mobile.</p>
          </div>

          <div className="why-item">
            <div className="why-icon">
              <i className='bx bx-shield-quarter'></i>
            </div>
            <h3>Security First</h3>
            <p>Security is a top priority. I implement best practices for data protection, 
            authentication, and secure coding to keep your application and users safe.</p>
          </div>
        </div>
      </section>

      <section className="hire-process">
        <h2 className="heading">My <span>Process</span></h2>
        
        <div className="process-timeline">
          <div className="process-step">
            <div className="process-number">01</div>
            <div className="process-content">
              <h3>Discovery & Planning</h3>
              <p>We start by understanding your goals, target audience, and project requirements. 
              I&apos;ll ask questions, analyze your needs, and create a detailed project plan.</p>
            </div>
          </div>

          <div className="process-step">
            <div className="process-number">02</div>
            <div className="process-content">
              <h3>Design & Prototyping</h3>
              <p>I create wireframes and prototypes to visualize your project before development. 
              This ensures we&apos;re aligned on the design and functionality before writing code.</p>
            </div>
          </div>

          <div className="process-step">
            <div className="process-number">03</div>
            <div className="process-content">
              <h3>Development</h3>
              <p>Using modern technologies and best practices, I build your project with clean, 
              maintainable code. You&apos;ll receive regular updates and can provide feedback throughout.</p>
            </div>
          </div>

          <div className="process-step">
            <div className="process-number">04</div>
            <div className="process-content">
              <h3>Testing & Quality Assurance</h3>
              <p>Thorough testing ensures your project works flawlessly across all devices and browsers. 
              I test for functionality, performance, and user experience.</p>
            </div>
          </div>

          <div className="process-step">
            <div className="process-number">05</div>
            <div className="process-content">
              <h3>Deployment & Launch</h3>
              <p>I handle the deployment process and ensure everything is set up correctly. 
              Your project goes live smoothly with proper documentation and support.</p>
            </div>
          </div>

          <div className="process-step">
            <div className="process-number">06</div>
            <div className="process-content">
              <h3>Support & Maintenance</h3>
              <p>After launch, I provide ongoing support, bug fixes, and updates. 
              I&apos;m here to help your project grow and evolve with your needs.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="hire-form-section" id="project-form">
        <h2 className="heading">Submit Your <span>Project</span></h2>
        <p className="form-intro">Fill out the form below to get started. I&apos;ll review your project details and get back to you within 24 hours.</p>
        
        <form className="hire-form" id="project-submission-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3 className="form-section-title"><i className='bx bx-user'></i> Your Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="full-name">Full Name <span className="required">*</span></label>
                <input type="text" id="full-name" name="full-name" placeholder="John Doe" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address <span className="required">*</span></label>
                <input type="email" id="email" name="email" placeholder="john@example.com" required />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" placeholder="+1 (555) 123-4567" />
              </div>
              
              <div className="form-group">
                <label htmlFor="company">Company/Organization</label>
                <input type="text" id="company" name="company" placeholder="Your Company Name" />
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h3 className="form-section-title"><i className='bx bx-briefcase'></i> Project Details</h3>
            
            <div className="form-group">
              <label htmlFor="project-type">Project Type <span className="required">*</span></label>
              <select id="project-type" name="project-type" required>
                <option value="">Select a project type</option>
                <option value="web-development">Web Development</option>
                <option value="web-design">Web Design</option>
                <option value="full-stack">Full-Stack Application</option>
                <option value="frontend">Frontend Development</option>
                <option value="backend">Backend Development</option>
                <option value="ui-ux-design">UI/UX Design</option>
                <option value="redesign">Website Redesign</option>
                <option value="consulting">Technical Consulting</option>
                <option value="maintenance">Maintenance & Support</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="project-title">Project Title <span className="required">*</span></label>
              <input type="text" id="project-title" name="project-title" placeholder="e.g., E-commerce Website Development" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="project-description">Project Description <span className="required">*</span></label>
              <textarea 
                id="project-description" 
                name="project-description" 
                rows={6} 
                placeholder="Describe your project in detail. What are your goals? What features do you need? What problems are you trying to solve?" 
                required 
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="budget">Budget Range</label>
                <select id="budget" name="budget">
                  <option value="">Select budget range</option>
                  <option value="under-5k">Under $5,000</option>
                  <option value="5k-10k">$5,000 - $10,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k-plus">$50,000+</option>
                  <option value="discuss">Prefer to discuss</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="timeline">Preferred Timeline</label>
                <select id="timeline" name="timeline">
                  <option value="">Select timeline</option>
                  <option value="asap">As soon as possible</option>
                  <option value="1-month">Within 1 month</option>
                  <option value="2-3-months">2-3 months</option>
                  <option value="3-6-months">3-6 months</option>
                  <option value="6-months-plus">6+ months</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h3 className="form-section-title"><i className='bx bx-list-check'></i> Additional Information</h3>
            
            <div className="form-group">
              <label htmlFor="features">Key Features/Requirements</label>
              <textarea 
                id="features" 
                name="features" 
                rows={4} 
                placeholder="List the main features or requirements for your project (e.g., User authentication, Payment integration, Admin dashboard, etc.)" 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="technologies">Preferred Technologies (if any)</label>
              <input 
                type="text" 
                id="technologies" 
                name="technologies" 
                placeholder="e.g., React, Node.js, MongoDB, etc. (Leave blank if unsure)" 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="reference">Reference/Inspiration</label>
              <input 
                type="url" 
                id="reference" 
                name="reference" 
                placeholder="https://example.com (Links to similar projects or inspiration)" 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="additional-info">Additional Information</label>
              <textarea 
                id="additional-info" 
                name="additional-info" 
                rows={4} 
                placeholder="Any other details, questions, or information you'd like to share" 
              />
            </div>
          </div>
          
          <div className="form-submit">
            <button type="submit" className="btn btn-submit" disabled={isSubmitting}>
              <i className='bx bx-paper-plane'></i> Submit Project Request
            </button>
            <p className="form-note">By submitting this form, you agree to be contacted regarding your project inquiry.</p>
          </div>
        </form>
      </section>

      <Footer />
    </>
  )
}

