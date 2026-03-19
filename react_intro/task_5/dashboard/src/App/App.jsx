import holbertonLogo from '../assets/holberton-logo.jpg'
import Notifications from '../Notifications/Notifications'
import { getCurrentYear, getFooterCopy } from '../utils/utils'
import './App.css'

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
          Copyright {getCurrentYear()} - {getFooterCopy(true)}
        </p>
      </div>
    </>
  )
}

export default App