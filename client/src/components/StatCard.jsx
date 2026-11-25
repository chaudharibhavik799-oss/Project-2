
import { Cpu } from 'lucide-react'

function StatCard({ title, value, icon: Icon, color, subtitle }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div>
          <p className="stat-title">{title}</p>
          <h2>{value}</h2>
        </div>

        <div className={`stat-icon ${color}`}>
          <Icon size={22} />
        </div>
      </div>

      <p className="stat-subtitle">{subtitle}</p>
    </div>
  )
}

export default StatCard
