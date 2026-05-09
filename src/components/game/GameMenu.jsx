import { useTranslation } from 'react-i18next'
import { Trophy, Ghost } from 'lucide-react'
import GlowCard from '../ui/GlowCard'
import './GameMenu.css'

const targets = [
  { key: 'win', icon: Trophy, badge: 'badge_hard', badgeClass: 'badge-hard' },
  { key: 'lose', icon: Ghost, badge: 'badge_easy', badgeClass: 'badge-easy' },
]

export default function GameMenu({ onSelect }) {
  const { t } = useTranslation()

  return (
    <div className="game-menu">
      <div className="game-menu-terminal">
        <span className="terminal-prompt">{t('game.terminal_header')}</span>
        <span className="terminal-cursor">_</span>
      </div>

      <p className="game-menu-rule">{t('game.rule_hint')}</p>

      <h2 className="game-menu-heading">{t('game.choose_target')}</h2>

      <div className="game-menu-cards">
        {targets.map(({ key, icon: Icon, badge, badgeClass }, i) => (
          <GlowCard key={key} delay={i * 120} className="game-target-card">
            <button className="game-target-btn" onClick={() => onSelect(key)}>
              <span className={`game-badge ${badgeClass}`}>{t(`game.${badge}`)}</span>
              <Icon size={40} className={`game-target-icon icon-${key}`} />
              <h3>{t(`game.target_${key}`)}</h3>
              <p>{t(`game.target_${key}_desc`)}</p>
            </button>
          </GlowCard>
        ))}
      </div>
    </div>
  )
}
