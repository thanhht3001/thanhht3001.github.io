/**
 * Infinite Tic-Tac-Toe AI — Each player max 3 pieces, oldest vanishes.
 * Player = 'X', AI = 'O'. No draws possible.
 */

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6],             // diags
]

export function getEmptyCells(board) {
  return board.reduce((acc, cell, i) => (cell === null ? [...acc, i] : acc), [])
}

export function checkWinner(board) {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] }
    }
  }
  return null
}

/**
 * Apply a move: place piece, remove oldest if player has > 3 pieces.
 * Returns new board and new moves array (mutates neither input).
 */
function applyMove(board, moves, cell, player) {
  const newBoard = [...board]
  const newMoves = [...moves, cell]
  newBoard[cell] = player

  if (newMoves.length > 3) {
    const removed = newMoves.shift()
    newBoard[removed] = null
  }

  return { board: newBoard, moves: newMoves }
}

/** Heuristic evaluation for non-terminal states */
function evaluate(board) {
  let score = 0
  for (const [a, b, c] of LINES) {
    const cells = [board[a], board[b], board[c]]
    const oCount = cells.filter(v => v === 'O').length
    const xCount = cells.filter(v => v === 'X').length
    const empty = cells.filter(v => v === null).length

    if (oCount === 2 && empty === 1) score += 5
    if (xCount === 2 && empty === 1) score -= 5
    if (oCount === 1 && empty === 2) score += 1
    if (xCount === 1 && empty === 2) score -= 1
  }
  // Center control bonus
  if (board[4] === 'O') score += 2
  if (board[4] === 'X') score -= 2
  return score
}

function minimax(board, xMoves, oMoves, depth, isMax, alpha, beta) {
  const result = checkWinner(board)
  if (result) {
    // Prefer winning sooner (higher depth remaining = sooner)
    if (result.winner === 'O') return { score: 100 + depth }
    if (result.winner === 'X') return { score: -(100 + depth) }
  }
  if (depth <= 0) return { score: evaluate(board) }

  const empty = getEmptyCells(board)

  if (isMax) {
    let best = { score: -Infinity, index: empty[0] }
    for (const cell of empty) {
      const { board: nb, moves: nm } = applyMove(board, oMoves, cell, 'O')
      const { score } = minimax(nb, xMoves, nm, depth - 1, false, alpha, beta)
      if (score > best.score) best = { score, index: cell }
      alpha = Math.max(alpha, score)
      if (beta <= alpha) break
    }
    return best
  } else {
    let best = { score: Infinity, index: empty[0] }
    for (const cell of empty) {
      const { board: nb, moves: nm } = applyMove(board, xMoves, cell, 'X')
      const { score } = minimax(nb, nm, oMoves, depth - 1, true, alpha, beta)
      if (score < best.score) best = { score, index: cell }
      beta = Math.min(beta, score)
      if (beta <= alpha) break
    }
    return best
  }
}

function getRandomMove(board) {
  const empty = getEmptyCells(board)
  return empty[Math.floor(Math.random() * empty.length)]
}

function findBlockingMove(board, player) {
  for (const [a, b, c] of LINES) {
    const cells = [board[a], board[b], board[c]]
    const count = cells.filter(v => v === player).length
    const empty = cells.filter(v => v === null).length
    if (count === 2 && empty === 1) {
      return [a, b, c].find(i => board[i] === null)
    }
  }
  return null
}

/**
 * @param {Array} board - current board (9 cells)
 * @param {Array} xMoves - player X move history (queue)
 * @param {Array} oMoves - AI O move history (queue)
 * @param {'hard'|'easy'} difficulty
 * @returns {number} cell index for AI move
 */
export function getAIMove(board, xMoves, oMoves, difficulty) {
  const empty = getEmptyCells(board)
  if (empty.length === 0) return -1

  if (difficulty === 'hard') {
    return minimax([...board], [...xMoves], [...oMoves], 12, true, -Infinity, Infinity).index
  }

  // easy: mostly random, occasional blocking
  const blockMove = findBlockingMove(board, 'X')
  if (blockMove !== null && Math.random() < 0.3) {
    return blockMove
  }
  if (Math.random() < 0.15) {
    return minimax([...board], [...xMoves], [...oMoves], 4, true, -Infinity, Infinity).index
  }
  return getRandomMove(board)
}

/** Apply a move from the game UI — returns new board + new moves array */
export function applyPlayerMove(board, playerMoves, cell, player) {
  return applyMove([...board], [...playerMoves], cell, player)
}
