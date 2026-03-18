import './SkillBar.css'

export default function SkillBar({ name, level }) {
  return (
    <div className="skill-bar-item">
      <div className="skill-bar-header">
        <span className="skill-bar-name">{name}</span>
        <span className="skill-bar-level">{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div className="skill-bar-fill" style={{ width: `${level}%` }}></div>
      </div>
    </div>
  )
}
