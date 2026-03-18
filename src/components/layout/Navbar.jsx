import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X, Globe } from 'lucide-react'
import './Navbar.css'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi')
  }

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/timeline', label: t('nav.timeline') },
    { path: '/skills', label: t('nav.skills') },
    { path: '/contact', label: t('nav.contact') },
    { path: '/cv', label: t('nav.cv') },
  ]

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo">
          <span className="logo-bracket">&lt;</span>
          thanhht
          <span className="logo-bracket"> /&gt;</span>
        </Link>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="navbar-actions">
          <button className="lang-toggle" onClick={toggleLang} title="Toggle language">
            <Globe size={18} />
            <span>{i18n.language === 'vi' ? 'EN' : 'VI'}</span>
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  )
}
