import { useTranslation } from 'react-i18next'
import ProjectCard from '../components/ui/ProjectCard'
import ScrollReveal from '../components/ui/ScrollReveal'
import { projects } from '../data/projects'

export default function Projects() {
  const { t } = useTranslation()

  return (
    <div className="page container">
      <ScrollReveal>
        <h1 className="page-title">{t('projects.title')}</h1>
        <p className="page-subtitle">{t('projects.subtitle')}</p>
      </ScrollReveal>
      <div className="projects-grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} delay={i * 150} />
        ))}
      </div>
    </div>
  )
}
