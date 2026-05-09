import { useState, useEffect, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { checkWinner, getAIMove, applyPlayerMove } from '../../utils/tictactoeAI'
import './GameBoard.css'

const difficultyMap = { win: 'hard', lose: 'easy' }

export default function GameBoard({ target, onGameEnd }) {
  const { t } = useTranslation()
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xMoves, setXMoves] = useState([])
  const [oMoves, setOMoves] = useState([])
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [winLine, setWinLine] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const aiTimerRef = useRef(null)

  const difficulty = difficultyMap[target]

  // Oldest pieces that will vanish on next move
  const fadingX = xMoves.length >= 3 ? xMoves[0] : null
  const fadingO = oMoves.length >= 3 ? oMoves[0] : null

  const handleGameEnd = useCallback((result) => {
    setGameOver(true)
    if (result.line) setWinLine(result.line)
    setTimeout(() => onGameEnd(result.winner), 600)
  }, [onGameEnd])

  // AI move
  useEffect(() => {
    if (isPlayerTurn || gameOver) return

    const delay = 400 + Math.random() * 200
    aiTimerRef.current = setTimeout(() => {
      const move = getAIMove(board, xMoves, oMoves, difficulty)
      if (move === -1) return

      const { board: newBoard, moves: newOMoves } = applyPlayerMove(board, oMoves, move, 'O')

      setBoard(newBoard)
      setOMoves(newOMoves)

      const result = checkWinner(newBoard)
      if (result) {
        handleGameEnd(result)
      } else {
        setIsPlayerTurn(true)
      }
    }, delay)

    return () => clearTimeout(aiTimerRef.current)
  }, [isPlayerTurn, gameOver, board, xMoves, oMoves, difficulty, handleGameEnd])

  const handleCellClick = (index) => {
    if (!isPlayerTurn || board[index] !== null || gameOver) return

    const { board: newBoard, moves: newXMoves } = applyPlayerMove(board, xMoves, index, 'X')

    setBoard(newBoard)
    setXMoves(newXMoves)

    const result = checkWinner(newBoard)
    if (result) {
      handleGameEnd(result)
    } else {
      setIsPlayerTurn(false)
    }
  }

  const badgeKey = target === 'win' ? 'badge_hard' : 'badge_easy'
  const badgeClass = target === 'win' ? 'badge-hard' : 'badge-easy'
  const targetLabel = t(`game.target_${target}`)

  return (
    <div className="game-board-wrapper">
      <div className="game-board-header">
        <span className="game-target-info">
          {t('game.target_label')}: <strong>{targetLabel}</strong>
          <span className={`game-badge ${badgeClass}`}>{t(`game.${badgeKey}`)}</span>
        </span>
      </div>

      <div className="game-status">
        <span className={`status-text ${!isPlayerTurn ? 'ai-turn' : ''}`}>
          {gameOver ? '' : isPlayerTurn ? t('game.your_turn') : t('game.ai_thinking')}
        </span>
      </div>

      <div className="game-rule-hint">
        {t('game.rule_short')}
      </div>

      <div className="game-board">
        {board.map((cell, i) => {
          const isFading = !gameOver && (i === fadingX || i === fadingO)
          const isWin = winLine?.includes(i)

          return (
            <button
              key={i}
              className={`game-cell ${cell ? `cell-${cell.toLowerCase()}` : ''} ${isWin ? 'cell-win' : ''} ${isFading ? 'cell-fading' : ''} ${!cell && isPlayerTurn && !gameOver ? 'cell-hoverable' : ''}`}
              onClick={() => handleCellClick(i)}
              disabled={!isPlayerTurn || !!cell || gameOver}
            >
              {cell && (
                <span className={`cell-mark mark-${cell.toLowerCase()}`}>
                  {cell}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="game-board-legend">
        <span className="legend-player"><span className="mark-x">X</span> = {t('game.you')}</span>
        <span className="legend-ai"><span className="mark-o">O</span> = {t('game.ai')}</span>
        <span className="legend-fading">{t('game.fading_legend')}</span>
      </div>

      <div className="game-piece-count">
        <span>X: {xMoves.length}/3</span>
        <span>O: {oMoves.length}/3</span>
      </div>
    </div>
  )
}
