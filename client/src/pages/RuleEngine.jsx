
import { useState } from 'react'
import {
  GitBranch,
  Plus,
  Trash2,
  Power,
  Thermometer,
  Droplets,
  Bell,
} from 'lucide-react'

function RuleEngine() {
  const [rules, setRules] = useState([
    {
      id: 1,
      name: 'High Temperature Alert',
      sensor: 'Temperature',
      condition: '>',
      threshold: 35,
      action: 'Generate Alert',
      enabled: true,
    },
    {
      id: 2,
      name: 'High Humidity Warning',
      sensor: 'Humidity',
      condition: '>',
      threshold: 70,
      action: 'Generate Warning',
      enabled: true,
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [newRule, setNewRule] = useState({
    name: '',
    sensor: 'Temperature',
    condition: '>',
    threshold: '',
    action: 'Generate Alert',
  })

  const addRule = (e) => {
    e.preventDefault()

    setRules([
      ...rules,
      {
        ...newRule,
        id: Date.now(),
        threshold: Number(newRule.threshold),
        enabled: true,
      },
    ])

    setNewRule({
      name: '',
      sensor: 'Temperature',
      condition: '>',
      threshold: '',
      action: 'Generate Alert',
    })

    setShowForm(false)
  }

  const toggleRule = (id) => {
    setRules(rules.map((rule) =>
      rule.id === id
        ? { ...rule, enabled: !rule.enabled }
        : rule
    ))
  }

  const deleteRule = (id) => {
    setRules(rules.filter((rule) => rule.id !== id))
  }

  return (
    <div className="rules-page">
      <div className="rules-heading">
        <div>
          <h2>Automation Rules</h2>
          <p>Create conditions to monitor your IoT devices automatically.</p>
        </div>

        <button
          className="add-rule-btn"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={18} />
          Create Rule
        </button>
      </div>

      <div className="rules-summary">
        <div className="rule-summary-card">
          <GitBranch size={22} />
          <div>
            <h3>{rules.length}</h3>
            <p>Total Rules</p>
          </div>
        </div>

        <div className="rule-summary-card">
          <Power size={22} />
          <div>
            <h3>{rules.filter((rule) => rule.enabled).length}</h3>
            <p>Active Rules</p>
          </div>
        </div>

        <div className="rule-summary-card">
          <Bell size={22} />
          <div>
            <h3>{rules.filter((rule) => !rule.enabled).length}</h3>
            <p>Disabled Rules</p>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="rule-form-card">
          <h3>Create New Rule</h3>

          <form onSubmit={addRule}>
            <label>Rule Name</label>
            <input
              type="text"
              placeholder="Enter rule name"
              value={newRule.name}
              onChange={(e) =>
                setNewRule({ ...newRule, name: e.target.value })
              }
              required
            />

            <label>Sensor</label>
            <select
              value={newRule.sensor}
              onChange={(e) =>
                setNewRule({ ...newRule, sensor: e.target.value })
              }
            >
              <option>Temperature</option>
              <option>Humidity</option>
            </select>

            <label>Condition</label>
            <select
              value={newRule.condition}
              onChange={(e) =>
                setNewRule({ ...newRule, condition: e.target.value })
              }
            >
              <option value=">">Greater than (&gt;)</option>
              <option value="<">Less than (&lt;)</option>
              <option value="=">Equal to (=)</option>
            </select>

            <label>Threshold Value</label>
            <input
              type="number"
              placeholder="Enter threshold"
              value={newRule.threshold}
              onChange={(e) =>
                setNewRule({ ...newRule, threshold: e.target.value })
              }
              required
            />

            <label>Action</label>
            <select
              value={newRule.action}
              onChange={(e) =>
                setNewRule({ ...newRule, action: e.target.value })
              }
            >
              <option>Generate Alert</option>
              <option>Generate Warning</option>
            </select>

            <button type="submit" className="add-rule-btn">
              Save Rule
            </button>
          </form>
        </div>
      )}

      <div className="rules-list">
        <h3>Configured Rules</h3>

        {rules.map((rule) => (
          <div className="rule-card" key={rule.id}>
            <div className="rule-icon">
              {rule.sensor === 'Temperature'
                ? <Thermometer size={22} />
                : <Droplets size={22} />}
            </div>

            <div className="rule-info">
              <h4>{rule.name}</h4>
              <p>
                IF {rule.sensor} {rule.condition} {rule.threshold}
                {rule.sensor === 'Temperature' ? '°C' : '%'}
                {' '}THEN {rule.action}
              </p>
              <span className={rule.enabled ? 'rule-active' : 'rule-disabled'}>
                {rule.enabled ? 'Active' : 'Disabled'}
              </span>
            </div>

            <div className="rule-actions">
              <button
                className="toggle-rule-btn"
                onClick={() => toggleRule(rule.id)}
                title="Enable or disable rule"
              >
                <Power size={18} />
              </button>

              <button
                className="delete-rule-btn"
                onClick={() => deleteRule(rule.id)}
                title="Delete rule"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}

        {rules.length === 0 && (
          <p className="no-rules">No rules configured yet.</p>
        )}
      </div>
    </div>
  )
}

export default RuleEngine
