import { useTranslation } from 'react-i18next'
import { RotateCcw, ArrowLeft, Gift } from 'lucide-react'
import './GameResult.css'

export default function GameResult({ winner, target, onPlayAgain, onBackMenu, onClaimReward }) {
  const { t } = useTranslation()

  const achieved =
    (target === 'win' && winner === 'X') ||
    (target === 'lose' && winner === 'O')

  const resultText =
    winner === 'X' ? t('game.result_win') : t('game.result_lose')

  return (
    <div className="game-result-overlay">
      {achieved && (
        <div className="confetti-container">
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="confetti-piece"
              style={{
                '--x': `${Math.random() * 100}%`,
                '--delay': `${Math.random() * 2}s`,
                '--duration': `${2 + Math.random() * 2}s`,
                '--color': ['var(--accent)', 'var(--terminal-green)', 'var(--terminal-yellow)', 'var(--terminal-red)'][i % 4],
              }}
            />
          ))}
        </div>
      )}

      <div className="game-result-card">
        <h2 className={`result-outcome ${achieved ? 'achieved' : 'failed'}`}>
          {resultText}
        </h2>
        <p className={`result-message ${achieved ? 'achieved' : 'failed'}`}>
          {achieved ? t('game.result_achieved') : t('game.result_failed')}
        </p>

        <div className="result-actions">
          {achieved && (
            <button className="btn btn-primary btn-glow" onClick={onClaimReward}>
              <Gift size={16} />
              {t('game.claim_reward')}
            </button>
          )}
          <button className="btn btn-outline" onClick={onPlayAgain}>
            <RotateCcw size={16} />
            {t('game.play_again')}
          </button>
          <button className="btn btn-outline" onClick={onBackMenu}>
            <ArrowLeft size={16} />
            {t('game.back_menu')}
          </button>
        </div>
      </div>
    </div>
  )
}
