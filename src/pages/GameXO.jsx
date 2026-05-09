import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import ScrollReveal from '../components/ui/ScrollReveal'
import GameMenu from '../components/game/GameMenu'
import GameBoard from '../components/game/GameBoard'
import GameResult from '../components/game/GameResult'
import WinnerForm from '../components/game/WinnerForm'
import './GameXO.css'

export default function GameXO() {
  const { t } = useTranslation()
  const [phase, setPhase] = useState('menu') // menu | playing | result | form
  const [target, setTarget] = useState(null)
  const [winner, setWinner] = useState(null)
  const [gameId, setGameId] = useState(0)

  const handleSelectTarget = (t) => {
    setTarget(t)
    setGameId(id => id + 1)
    setPhase('playing')
  }

  const handleGameEnd = useCallback((w) => {
    setWinner(w)
    setPhase('result')
  }, [])

  const handlePlayAgain = () => {
    setWinner(null)
    setGameId(id => id + 1)
    setPhase('playing')
  }

  const handleBackMenu = () => {
    setTarget(null)
    setWinner(null)
    setPhase('menu')
  }

  const handleClaimReward = () => {
    setPhase('form')
  }

  return (
    <div className="page container game-page">
      <ScrollReveal>
        <h1 className="page-title">{t('game.xo_title')}</h1>
        <p className="page-subtitle">{t('game.xo_subtitle')}</p>
      </ScrollReveal>

      <div className="game-content">
        {phase === 'menu' && (
          <GameMenu onSelect={handleSelectTarget} />
        )}

        {phase === 'playing' && (
          <GameBoard
            key={gameId}
            target={target}
            onGameEnd={handleGameEnd}
          />
        )}

        {phase === 'result' && (
          <GameResult
            winner={winner}
            target={target}
            onPlayAgain={handlePlayAgain}
            onBackMenu={handleBackMenu}
            onClaimReward={handleClaimReward}
          />
        )}

        {phase === 'form' && (
          <WinnerForm target={target} onBack={handleBackMenu} />
        )}
      </div>
    </div>
  )
}
