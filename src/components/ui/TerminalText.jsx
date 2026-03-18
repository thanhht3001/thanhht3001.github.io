import { useTypingEffect } from '../../hooks/useTypingEffect'
import './TerminalText.css'

export default function TerminalText({ texts, prefix = '~$' }) {
  const displayText = useTypingEffect(texts)

  return (
    <div className="terminal">
      <div className="terminal-header">
        <span className="terminal-dot red"></span>
        <span className="terminal-dot yellow"></span>
        <span className="terminal-dot green"></span>
        <span className="terminal-title">thanh@dev: ~</span>
      </div>
      <div className="terminal-body">
        <span className="terminal-prompt">{prefix} </span>
        <span className="terminal-text">{displayText}</span>
        <span className="terminal-cursor-blink">|</span>
      </div>
    </div>
  )
}
