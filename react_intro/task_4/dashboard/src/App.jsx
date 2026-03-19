import './App.css'
import holbertonLogo from './assets/holberton-logo.jpg'
import Notifications from './Notifications'
import { getFooterCopy } from './utils'

function App() {
  return (
    <>
      <div className='root-notifications'>
        <Notifications />
      </div>
      <div className='App-header'>
        <img src={holbertonLogo} className="logo" alt="holberton logo" />
        <h1>School dashboard</h1>
      </div>
      <div className="App-body">
        <p>
          Login to access the full dashboard
        </p>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />

          <button>OK</button>
        </div>
      </div>
      <div className="App-footer">
        <p>
          Copyright 2025 - {getFooterCopy(true)}
        </p>
      </div>
    </>
  )
}

export default App