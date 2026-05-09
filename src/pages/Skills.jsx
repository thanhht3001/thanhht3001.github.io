import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import ScrollReveal from '../components/ui/ScrollReveal'
import { skills } from '../data/skills'
import './Skills.css'

const TOTAL_BLOCKS = 20

const TIERS = [
  { key: 'expert', min: 85, cls: 'level-expert' },
  { key: 'advanced', min: 70, cls: 'level-advanced' },
  { key: 'proficient', min: 55, cls: 'level-proficient' },
  { key: 'learning', min: 0, cls: 'level-learning' },
]

function getTier(level) {
  return TIERS.find(t => level >= t.min)
}

function TerminalSkill({ name, level }) {
  const filled = Math.round(level / (100 / TOTAL_BLOCKS))
  const empty = TOTAL_BLOCKS - filled
  const { cls } = getTier(level)

  return (
    <div className="term-skill-row">
      <span className="term-skill-name">{name}</span>
      <span className={`term-skill-bar ${cls}`}>
        <span className="bar-filled">{'█'.repeat(filled)}</span>
        <span className="bar-empty">{'░'.repeat(empty)}</span>
      </span>
    </div>
  )
}

export default function Skills() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  // Flatten all skills, sort by level descending, group by tier
  const grouped = useMemo(() => {
    const all = [
      ...skills.languages,
      ...skills.frameworks,
      ...skills.databases,
      ...skills.tools,
    ].sort((a, b) => b.level - a.level)

    return TIERS
      .map(tier => ({
        ...tier,
        items: all.filter(s => s.level >= tier.min && (tier.min === 0 || s.level < (TIERS[TIERS.indexOf(tier) - 1]?.min ?? 101))),
      }))
      .filter(tier => tier.items.length > 0)
  }, [])

  return (
    <div className="page container skills-page">
      <ScrollReveal>
        <h1 className="page-title">{t('skills.title')}</h1>
        <p className="page-subtitle">{t('skills.subtitle')}</p>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div className="term-window term-main">
          <div className="term-titlebar">
            <span className="term-dot term-dot-red" />
            <span className="term-dot term-dot-yellow" />
            <span className="term-dot term-dot-green" />
            <span className="term-titlebar-text">thanhht — skills</span>
          </div>
          <div className="term-body">
            <div className="term-command">
              <span className="term-prompt">thanhht@dev</span>
              <span className="term-colon">:</span>
              <span className="term-path">~</span>
              <span className="term-dollar">$</span>
              <span className="term-cmd">skills --sort-by=proficiency</span>
            </div>

            <div className="term-output">
              {grouped.map((tier, i) => (
                <div key={tier.key} className={`term-tier ${tier.cls} ${i === 0 ? 'term-tier-first' : ''}`}>
                  <div className={`term-tier-header ${tier.cls}`}>
                    <span className="term-tier-icon">
                      {tier.key === 'expert' ? '★' : tier.key === 'advanced' ? '◆' : tier.key === 'proficient' ? '▸' : '○'}
                    </span>
                    <span className="term-tier-label">{t(`skills.${tier.key}`).toUpperCase()}</span>
                    <span className="term-tier-count">{tier.items.length}</span>
                  </div>
                  {tier.items.map(skill => (
                    <TerminalSkill key={skill.name} name={skill.name} level={skill.level} />
                  ))}
                </div>
              ))}
            </div>

            <div className="term-command term-cursor-line">
              <span className="term-prompt">thanhht@dev</span>
              <span className="term-colon">:</span>
              <span className="term-path">~</span>
              <span className="term-dollar">$</span>
              <span className="terminal-cursor">_</span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={250}>
        <div className="term-window term-soft">
          <div className="term-titlebar">
            <span className="term-dot term-dot-red" />
            <span className="term-dot term-dot-yellow" />
            <span className="term-dot term-dot-green" />
            <span className="term-titlebar-text">soft-skills</span>
          </div>
          <div className="term-body">
            <div className="term-command">
              <span className="term-prompt">thanhht@dev</span>
              <span className="term-colon">:</span>
              <span className="term-path">~</span>
              <span className="term-dollar">$</span>
              <span className="term-cmd">cat ~/.soft-skills</span>
            </div>
            <div className="term-output soft-skills-output">
              {(skills.softSkills[lang] || skills.softSkills.en).map(skill => (
                <span key={skill} className="soft-skill-chip">
                  <span className="soft-skill-arrow">▸</span> {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}
