/* eslint-disable */
import React from 'react';
import closeIcon from "../assets/close-button.png";
import NotificationItem from './NotificationItem';
import './Notifications.css';

export default function Notifications({ notifications = [] }) {
    return (
        <div className="notifications">
            <div>
                <p>Here is the list of notifications</p>
                <ul>
                    {(notifications).map(notification => {
                        return (
                            <NotificationItem key={notification.id} type={notification.type} html={notification.html} value={notification.value} />
                        )
                    })}
                </ul>
            </div>
            <button aria-label="Close" onClick={() => { console.log("Close button has been clicked") }} style={{ marginLeft: "auto", backgroundColor: "white", border: "none", height: "25px" }}>
                <img alt="Close Button" src={closeIcon}></img>
            </button>
        </div>
    )
}