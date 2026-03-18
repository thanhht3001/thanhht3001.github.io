import { useTranslation } from 'react-i18next'
import { ExternalLink, Github } from 'lucide-react'
import TechTag from './TechTag'
import GlowCard from './GlowCard'
import './ProjectCard.css'

export default function ProjectCard({ project, delay = 0 }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  return (
    <GlowCard delay={delay}>
      <div className="project-card">
        <h3 className="project-card-title">{project.title[lang] || project.title.en}</h3>
        <p className="project-card-desc">{project.description[lang] || project.description.en}</p>
        <div className="project-card-tech">
          {project.tech.map(tech => (
            <TechTag key={tech} name={tech} />
          ))}
        </div>
        <div className="project-card-links">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
              <Github size={16} /> {t('projects.view_code')}
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
              <ExternalLink size={16} /> {t('projects.live_demo')}
            </a>
          )}
        </div>
      </div>
    </GlowCard>
  )
}
