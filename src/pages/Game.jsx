import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Gamepad2, ArrowRight } from 'lucide-react'
import ScrollReveal from '../components/ui/ScrollReveal'
import GlowCard from '../components/ui/GlowCard'
import './Game.css'

const games = [
  {
    id: 'xo',
    path: '/game/xo',
    icon: '✕○',
    titleKey: 'game.xo_name',
    descKey: 'game.xo_desc',
    badgeKey: 'game.xo_badge',
  },
]

export default function Game() {
  const { t } = useTranslation()

  return (
    <div className="page container game-hub">
      <ScrollReveal>
        <h1 className="page-title">
          <Gamepad2 size={28} className="game-hub-icon" />
          {t('game.hub_title')}
        </h1>
        <p className="page-subtitle">{t('game.hub_subtitle')}</p>
      </ScrollReveal>

      <div className="game-hub-terminal">
        <span className="terminal-prompt">~$ ls ./games/</span>
        <span className="terminal-cursor">_</span>
      </div>

      <div className="game-hub-grid">
        {games.map((game, i) => (
          <GlowCard key={game.id} delay={i * 120} className="game-hub-card">
            <Link to={game.path} className="game-hub-link">
              <span className="game-hub-card-icon">{game.icon}</span>
              <div className="game-hub-card-info">
                <h3>
                  {t(game.titleKey)}
                  <span className="game-hub-badge">{t(game.badgeKey)}</span>
                </h3>
                <p>{t(game.descKey)}</p>
              </div>
              <ArrowRight size={20} className="game-hub-arrow" />
            </Link>
          </GlowCard>
        ))}
      </div>

      <p className="game-hub-coming">{t('game.hub_coming')}</p>
    </div>
  )
}
