
import { useState } from 'react'
import {
  Activity,
  Thermometer,
  Droplets,
  Cpu,
  Wifi,
} from 'lucide-react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
)

function Telemetry() {
  const [selectedDevice, setSelectedDevice] = useState('All Devices')

  const readings = [
    {
      id: 'DEV-001',
      name: 'Temperature Sensor 01',
      type: 'Temperature',
      value: '28.5°C',
      time: '10:42 AM',
      status: 'Online',
    },
    {
      id: 'DEV-002',
      name: 'Humidity Sensor 01',
      type: 'Humidity',
      value: '65%',
      time: '10:40 AM',
      status: 'Online',
    },
    {
      id: 'DEV-003',
      name: 'Temperature Sensor 02',
      type: 'Temperature',
      value: '--',
      time: 'Offline',
      status: 'Offline',
    },
    {
      id: 'DEV-004',
      name: 'Smart Energy Meter',
      type: 'Energy',
      value: '240V',
      time: '10:38 AM',
      status: 'Online',
    },
  ]

  const filteredReadings =
    selectedDevice === 'All Devices'
      ? readings
      : readings.filter(
          (device) => device.id === selectedDevice
        )

  const temperatureData = {
    labels: [
      '10 AM',
      '11 AM',
      '12 PM',
      '1 PM',
      '2 PM',
      '3 PM',
      '4 PM',
    ],
    datasets: [
      {
        label: 'Temperature (°C)',
        data: [24, 25, 26, 28, 27, 29, 28.5],
        borderColor: '#60a5fa',
        backgroundColor: 'rgba(96, 165, 250, 0.12)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#60a5fa',
      },
    ],
  }

  const humidityData = {
    labels: [
      '10 AM',
      '11 AM',
      '12 PM',
      '1 PM',
      '2 PM',
      '3 PM',
      '4 PM',
    ],
    datasets: [
      {
        label: 'Humidity (%)',
        data: [55, 58, 60, 63, 61, 67, 65],
        borderColor: '#34d399',
        backgroundColor: 'rgba(52, 211, 153, 0.12)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#34d399',
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#cbd5e1',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#94a3b8',
        },
        grid: {
          color: '#263244',
        },
      },
      y: {
        ticks: {
          color: '#94a3b8',
        },
        grid: {
          color: '#263244',
        },
      },
    },
  }

  return (
    <div className="telemetry-page">

      <div className="telemetry-heading">
        <div>
          <h2>Telemetry Monitoring</h2>
          <p>
            Monitor real-time sensor data and device performance.
          </p>
        </div>

        <span className="demo-label">
          <Activity size={15} />
          Demo Data
        </span>
      </div>

      {/* STATISTICS */}

      <div className="telemetry-stats">

        <div className="telemetry-stat-card">
          <div className="telemetry-stat-top">
            <span>Average Temperature</span>
            <div className="telemetry-icon blue">
              <Thermometer size={22} />
            </div>
          </div>
          <h2>28.5°C</h2>
          <p>Current sample reading</p>
        </div>

        <div className="telemetry-stat-card">
          <div className="telemetry-stat-top">
            <span>Average Humidity</span>
            <div className="telemetry-icon green">
              <Droplets size={22} />
            </div>
          </div>
          <h2>65%</h2>
          <p>Current sample reading</p>
        </div>

        <div className="telemetry-stat-card">
          <div className="telemetry-stat-top">
            <span>Connected Devices</span>
            <div className="telemetry-icon purple">
              <Wifi size={22} />
            </div>
          </div>
          <h2>3 / 4</h2>
          <p>Devices currently online</p>
        </div>

        <div className="telemetry-stat-card">
          <div className="telemetry-stat-top">
            <span>Total Sensors</span>
            <div className="telemetry-icon orange">
              <Cpu size={22} />
            </div>
          </div>
          <h2>4</h2>
          <p>Registered sample devices</p>
        </div>

      </div>

      {/* CHARTS */}

      <div className="telemetry-section-heading">
        <h2>Sensor Analytics</h2>
        <p>Sample sensor readings over time</p>
      </div>

      <div className="telemetry-charts">

        <div className="telemetry-chart-card">
          <h3>
            <Thermometer size={19} />
            Temperature Trends
          </h3>
          <div className="chart-container">
            <Line
              data={temperatureData}
              options={chartOptions}
            />
          </div>
        </div>

        <div className="telemetry-chart-card">
          <h3>
            <Droplets size={19} />
            Humidity Trends
          </h3>
          <div className="chart-container">
            <Line
              data={humidityData}
              options={chartOptions}
            />
          </div>
        </div>

      </div>

      {/* RECENT READINGS */}

      <div className="telemetry-section-heading readings-heading">
        <div>
          <h2>Recent Sensor Readings</h2>
          <p>Overview of registered device readings</p>
        </div>

        <select
          value={selectedDevice}
          onChange={(e) =>
            setSelectedDevice(e.target.value)
          }
          className="telemetry-filter"
        >
          <option>All Devices</option>
          <option value="DEV-001">DEV-001</option>
          <option value="DEV-002">DEV-002</option>
          <option value="DEV-003">DEV-003</option>
          <option value="DEV-004">DEV-004</option>
        </select>
      </div>

      <div className="telemetry-table-wrapper">
        <table className="telemetry-table">
          <thead>
            <tr>
              <th>Device ID</th>
              <th>Device Name</th>
              <th>Sensor Type</th>
              <th>Value</th>
              <th>Last Reading</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredReadings.map((device) => (
              <tr key={device.id}>
                <td>{device.id}</td>
                <td>{device.name}</td>
                <td>{device.type}</td>
                <td>{device.value}</td>
                <td>{device.time}</td>
                <td>
                  <span
                    className={`telemetry-status ${
                      device.status.toLowerCase()
                    }`}
                  >
                    {device.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Telemetry
