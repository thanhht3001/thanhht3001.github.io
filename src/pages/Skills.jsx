import { useTranslation } from 'react-i18next'
import SkillBar from '../components/ui/SkillBar'
import GlowCard from '../components/ui/GlowCard'
import ScrollReveal from '../components/ui/ScrollReveal'
import { skills } from '../data/skills'
import './Skills.css'

export default function Skills() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  const categories = [
    { key: 'languages', label: t('skills.languages'), data: skills.languages },
    { key: 'frameworks', label: t('skills.frameworks'), data: skills.frameworks },
    { key: 'databases', label: t('skills.databases'), data: skills.databases },
    { key: 'tools', label: t('skills.tools'), data: skills.tools },
  ]

  return (
    <div className="page container">
      <ScrollReveal>
        <h1 className="page-title">{t('skills.title')}</h1>
        <p className="page-subtitle">{t('skills.subtitle')}</p>
      </ScrollReveal>

      <div className="skills-grid">
        {categories.map((cat, i) => (
          <GlowCard key={cat.key} delay={i * 150}>
            <div className="skills-category">
              <h2 className="skills-category-title">{cat.label}</h2>
              {cat.data.map(skill => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </div>
          </GlowCard>
        ))}
      </div>

      <ScrollReveal delay={400}>
        <div className="soft-skills-section">
          <h2 className="skills-category-title">{t('skills.soft_skills')}</h2>
          <div className="soft-skills-tags">
            {(skills.softSkills[lang] || skills.softSkills.en).map(skill => (
              <span key={skill} className="soft-skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}
