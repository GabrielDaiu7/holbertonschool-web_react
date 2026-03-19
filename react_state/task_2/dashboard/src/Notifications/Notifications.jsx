/* eslint-disable */
import React from "react";
import closeIcon from "../assets/close-button.png";
import NotificationItem from "./NotificationItem";
import "./Notifications.css";

class Notifications extends React.Component {
    shouldComponentUpdate(nextProps) {
        return (
            nextProps.notifications.length !== this.props.notifications.length ||
            nextProps.displayDrawer !== this.props.displayDrawer
        );
    }

    markAsRead = (id) => {
        console.log(`Notification ${id} has been marked as read`);
    };

    render() {
        const {
            notifications = [],
            displayDrawer = false,
            handleDisplayDrawer,
            handleHideDrawer,
        } = this.props;

        return (
            <div className="notifications-container">
                <div
                    className="notification-title"
                    onClick={handleDisplayDrawer}
                >
                    Your notifications
                </div>

                {displayDrawer && (
                    <div className="notification-items">
                        {notifications.length > 0 ? (
                            <>
                                <p>Here is the list of notifications</p>
                                <ul>
                                    {notifications.map((notification) => (
                                        <NotificationItem
                                            key={notification.id}
                                            id={notification.id}
                                            type={notification.type}
                                            html={notification.html}
                                            value={notification.value}
                                            markAsRead={this.markAsRead}
                                        />
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <p>No new notification for now</p>
                        )}

                        <button
                            aria-label="Close"
                            onClick={handleHideDrawer}
                            className="close-button"
                        >
                            <img alt="Close Button" src={closeIcon} />
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default Notifications;