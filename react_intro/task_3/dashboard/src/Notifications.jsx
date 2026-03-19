import React from 'react';
import './Notifications.css';
import closeIcon from "./assets/close-button.png";
import { getLatestNotification } from './utils';

export default function Notifications() {
  const handleClick = () => {
    console.log("Close button has been clicked");
  };

  return (
    <div className="notifications">
      <div>
        <p>Here is the list of notifications</p>
        <ul>
          <li data-priority="default">New course available</li>
          <li data-priority="urgent">New resume available</li>
          <li data-priority="urgent" dangerouslySetInnerHTML={{ __html: getLatestNotification() }} />
        </ul>
      </div>
      <button aria-label="Close" onClick={handleClick} style={{ marginLeft: "auto", backgroundColor: "white", border: "none", height: "25px" }}>
        <img alt="Close Button" src={closeIcon}></img>
      </button>
    </div>
  );
}