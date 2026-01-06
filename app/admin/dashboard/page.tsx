'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Stats {
  totalContacts: number
  totalProjects: number
  recentContacts: number
  recentProjects: number
  total: number
}

interface Contact {
  id: number
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  createdAt: string
}

interface Project {
  id: number
  fullName: string
  email: string
  phone: string | null
  company: string | null
  projectType: string
  projectTitle: string
  projectDescription: string
  budget: string | null
  timeline: string | null
  createdAt: string
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [activeTab, setActiveTab] = useState<'contacts' | 'projects'>('contacts')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchData()
    }
  }, [session])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [statsRes, contactsRes, projectsRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/contacts'),
        fetch('/api/admin/projects')
      ])

      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData)
      }

      if (contactsRes.ok) {
        const contactsData = await contactsRes.json()
        setContacts(contactsData)
      }

      if (projectsRes.ok) {
        const projectsData = await projectsRes.json()
        setProjects(projectsData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="admin-loading">
        <i className='bx bx-loader-alt bx-spin'></i>
        <p>Loading dashboard...</p>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>Admin Dashboard</h1>
          <div className="admin-header-actions">
            <button onClick={() => fetchData()} className="btn-refresh">
              <i className='bx bx-refresh'></i> Refresh
            </button>
            <button onClick={() => signOut({ callbackUrl: '/admin/login' })} className="btn-logout">
              <i className='bx bx-log-out'></i> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="admin-content">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(0, 238, 238, 0.1)' }}>
              <i className='bx bx-message-dots' style={{ color: 'var(--main-color)' }}></i>
            </div>
            <div className="stat-info">
              <h3>{stats?.totalContacts || 0}</h3>
              <p>Total Contacts</p>
              <span className="stat-recent">+{stats?.recentContacts || 0} this week</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(0, 238, 238, 0.1)' }}>
              <i className='bx bx-briefcase' style={{ color: 'var(--main-color)' }}></i>
            </div>
            <div className="stat-info">
              <h3>{stats?.totalProjects || 0}</h3>
              <p>Total Projects</p>
              <span className="stat-recent">+{stats?.recentProjects || 0} this week</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(0, 238, 238, 0.1)' }}>
              <i className='bx bx-bar-chart-alt-2' style={{ color: 'var(--main-color)' }}></i>
            </div>
            <div className="stat-info">
              <h3>{stats?.total || 0}</h3>
              <p>Total Submissions</p>
              <span className="stat-recent">All time</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          <button
            className={`tab-button ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            <i className='bx bx-message-dots'></i> Contacts ({contacts.length})
          </button>
          <button
            className={`tab-button ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <i className='bx bx-briefcase'></i> Projects ({projects.length})
          </button>
        </div>

        {/* Tables */}
        <div className="admin-table-container">
          {activeTab === 'contacts' && (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="no-data">No contacts yet</td>
                  </tr>
                ) : (
                  contacts.map((contact) => (
                    <tr key={contact.id}>
                      <td>{contact.name}</td>
                      <td>
                        <a href={`mailto:${contact.email}`}>{contact.email}</a>
                      </td>
                      <td>{contact.phone || '-'}</td>
                      <td>{contact.subject || '-'}</td>
                      <td className="message-cell">{contact.message}</td>
                      <td>{formatDate(contact.createdAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {activeTab === 'projects' && (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Project Type</th>
                  <th>Title</th>
                  <th>Budget</th>
                  <th>Timeline</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="no-data">No projects yet</td>
                  </tr>
                ) : (
                  projects.map((project) => (
                    <tr key={project.id}>
                      <td>{project.fullName}</td>
                      <td>
                        <a href={`mailto:${project.email}`}>{project.email}</a>
                      </td>
                      <td>{project.company || '-'}</td>
                      <td>
                        <span className="badge">{project.projectType}</span>
                      </td>
                      <td className="title-cell">{project.projectTitle}</td>
                      <td>{project.budget || '-'}</td>
                      <td>{project.timeline || '-'}</td>
                      <td>{formatDate(project.createdAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

