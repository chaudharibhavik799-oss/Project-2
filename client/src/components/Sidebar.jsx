import {
  LayoutDashboard,
  Cpu,
  Activity,
  GitBranch,
  Bell,
  Zap,
} from 'lucide-react'

function Sidebar({ activePage, setActivePage }) {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Devices', icon: Cpu },
    { name: 'Telemetry', icon: Activity },
    { name: 'Rule Engine', icon: GitBranch },
    { name: 'Alerts', icon: Bell },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Zap size={22} />
        </div>

        <div>
          <h2>NexusFlow</h2>
          <p>IoT Platform</p>
        </div>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-heading">MENU</p>

        <nav>
          {menuItems.map((item) => {
            const Icon = item.icon

            return (
              <button
                key={item.name}
                className={`nav-item ${
                  activePage === item.name ? 'active' : ''
                }`}
                onClick={() => setActivePage(item.name)}
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </button>
            )
          })}
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="status-dot"></div>
        <span>System Operational</span>
      </div>
    </aside>
  )
}

export default Sidebar