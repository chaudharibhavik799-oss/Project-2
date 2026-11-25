
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Devices from './pages/Devices'
import Telemetry from './pages/Telemetry.jsx'
import RuleEngine from './pages/RuleEngine.jsx'
import './App.css'

function App() {
  const [activePage, setActivePage] = useState('Dashboard')

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>{activePage}</h1>
            <p>Welcome to NexusFlow IoT Platform</p>
          </div>

          <div className="user-profile">
            <div className="avatar">B</div>
            <span>Bhavik</span>
          </div>
        </header>

        <section className="content-area">
          {activePage === 'Dashboard' ? (
            <Dashboard />
          ) : activePage === 'Devices' ? (
            <Devices />
          ) : activePage === 'Telemetry' ? (
            <Telemetry />
          ) : activePage === 'Rule Engine' ? (
            <RuleEngine />
          ) : (
            <div className="placeholder-card">
              <h3>{activePage}</h3>
              <p>
                Your {activePage.toLowerCase()} interface
                will be developed here.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
