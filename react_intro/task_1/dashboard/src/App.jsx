import React from "react";
import "./App.css";
import Notifications from "./Notifications";
import { getCurrentYear, getFooterCopy } from "../utils";

function App() {
  return (
    <>
      <div className="root-notifications">
        <Notifications />
      </div>

      <div className="App">
        <header className="App-header">
          <img src="logo.jpg" className="App-logo" alt="logo" />
          <h1>School dashboard</h1>
        </header>

        <div className="App-body">
          <p>Login to access the full dashboard</p>
        </div>

        <footer className="App-footer">
          <p>
            Copyright {getCurrentYear()} - {getFooterCopy(false)}
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;