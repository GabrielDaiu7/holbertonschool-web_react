import React from 'react';
import closeIcon from "../assets/close-button.png";
import { getLatestNotification } from '../utils/utils';
import './Notifications.css';

export default function Notifications() {
    return (
        <div className="notifications">
            <div>
                <p>Here is the list of notifications</p>
                <ul>
                    <li data-priority="default">New course available</li>
                    <li data-priority="urgent">New resume available</li>
                    <li dangerouslySetInnerHTML={{ __html: getLatestNotification() }} />
                </ul>
            </div>
            <button aria-label="Close" onClick={() => { console.log("Close button has been clicked") }} style={{ marginLeft: "auto", backgroundColor: "white", border: "none", height: "25px" }}>
                <img alt="Close Button" src={closeIcon}></img>
            </button>

        </div>
    )
}