
import {
  Cpu,
  Wifi,
  Bell,
  Thermometer,
} from 'lucide-react'

import StatCard from './StatCard'

function Dashboard() {
  const stats = [
    {
      title: 'Total Devices',
      value: '24',
      icon: Cpu,
      color: 'blue',
      subtitle: 'All registered devices',
    },
    {
      title: 'Online Devices',
      value: '18',
      icon: Wifi,
      color: 'green',
      subtitle: 'Currently connected',
    },
    {
      title: 'Active Alerts',
      value: '06',
      icon: Bell,
      color: 'orange',
      subtitle: 'Require attention',
    },
    {
      title: 'Avg Temperature',
      value: '28.5°C',
      icon: Thermometer,
      color: 'purple',
      subtitle: 'Across all devices',
    },
  ]

  return (
    <div className="dashboard">
      <div className="dashboard-heading">
        <h2>Dashboard Overview</h2>
        <p>Monitor your IoT devices and system performance.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            {...stat}
          />
        ))}
      </div>
    </div>
  )
}

export default Dashboard
