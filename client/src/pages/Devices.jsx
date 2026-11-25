
import { useState } from 'react'
import {
  Cpu,
  Wifi,
  WifiOff,
  Search,
  Plus,
  X,
} from 'lucide-react'

function Devices() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)

  const [newDevice, setNewDevice] = useState({
    name: '',
    type: 'Temperature Sensor',
  })

  const [devices, setDevices] = useState([
    {
      id: 'DEV-001',
      name: 'Temperature Sensor 01',
      type: 'Temperature Sensor',
      status: 'Online',
      value: '28.5°C',
    },
    {
      id: 'DEV-002',
      name: 'Humidity Sensor 01',
      type: 'Humidity Sensor',
      status: 'Online',
      value: '65%',
    },
    {
      id: 'DEV-003',
      name: 'Temperature Sensor 02',
      type: 'Temperature Sensor',
      status: 'Offline',
      value: '--',
    },
    {
      id: 'DEV-004',
      name: 'Smart Energy Meter',
      type: 'Energy Monitor',
      status: 'Online',
      value: '240V',
    },
  ])

  const addDevice = (e) => {
    e.preventDefault()

    const device = {
      id: `DEV-${String(devices.length + 1).padStart(3, '0')}`,
      name: newDevice.name.trim(),
      type: newDevice.type,
      status: 'Online',
      value: '--',
    }

    setDevices([...devices, device])
    setNewDevice({
      name: '',
      type: 'Temperature Sensor',
    })
    setShowForm(false)
  }

  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(search.toLowerCase()) ||
      device.id.toLowerCase().includes(search.toLowerCase())

    const matchesFilter =
      filter === 'All' || device.status === filter

    return matchesSearch && matchesFilter
  })

  return (
    <div className="devices-page">
      <div className="devices-heading">
        <h2>Device Management</h2>
        <p>Monitor and manage all your connected IoT devices.</p>
      </div>

      <div className="device-toolbar">
        <div className="device-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search devices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Devices</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>

        <button
          className="add-device-btn"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} />
          Add Device
        </button>
      </div>

      {showForm && (
        <div className="device-form-card">
          <div className="form-heading">
            <h3>Add New Device</h3>
            <button
              className="close-form-btn"
              onClick={() => setShowForm(false)}
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={addDevice}>
            <label>Device Name</label>
            <input
              type="text"
              placeholder="Enter device name"
              value={newDevice.name}
              onChange={(e) =>
                setNewDevice({
                  ...newDevice,
                  name: e.target.value,
                })
              }
              required
            />

            <label>Device Type</label>
            <select
              value={newDevice.type}
              onChange={(e) =>
                setNewDevice({
                  ...newDevice,
                  type: e.target.value,
                })
              }
            >
              <option>Temperature Sensor</option>
              <option>Humidity Sensor</option>
              <option>Energy Monitor</option>
              <option>Motion Sensor</option>
            </select>

            <button type="submit" className="add-device-btn">
              <Plus size={18} />
              Save Device
            </button>
          </form>
        </div>
      )}

      <div className="devices-grid">
        {filteredDevices.length > 0 ? (
          filteredDevices.map((device) => (
            <div className="device-card" key={device.id}>
              <div className="device-card-top">
                <div className="device-icon">
                  <Cpu size={22} />
                </div>

                <span className={`device-status ${device.status.toLowerCase()}`}>
                  {device.status === 'Online' ? (
                    <Wifi size={14} />
                  ) : (
                    <WifiOff size={14} />
                  )}
                  {device.status}
                </span>
              </div>

              <h3>{device.name}</h3>
              <p className="device-type">{device.type}</p>

              <div className="device-details">
                <span>Device ID</span>
                <strong>{device.id}</strong>
              </div>

              <div className="device-details">
                <span>Current Value</span>
                <strong>{device.value}</strong>
              </div>
            </div>
          ))
        ) : (
          <p className="no-devices">No devices found.</p>
        )}
      </div>
    </div>
  )
}

export default Devices
