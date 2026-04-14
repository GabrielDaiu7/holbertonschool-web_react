import React, { memo } from "react";

function NotificationItem({ id, type, value, html, markAsRead }) {
    const handleClick = () => {
        if (markAsRead) {
            markAsRead(id);
        }
    };

    return (
        html ? (
            <li
                data-notification-type={type}
                style={{ color: type === "urgent" ? "red" : "blue" }}
                onClick={handleClick}
                dangerouslySetInnerHTML={html}
            />
        ) : (
            <li
                data-notification-type={type}
                style={{ color: type === "urgent" ? "red" : "blue" }}
                onClick={handleClick}
            >
                {value}
            </li>
        )
    );
}

function areEqual(prevProps, nextProps) {
    return (
        prevProps.id === nextProps.id &&
        prevProps.type === nextProps.type &&
        prevProps.value === nextProps.value &&
        (prevProps.html?.__html || "") === (nextProps.html?.__html || "")
    );
}

export default memo(NotificationItem, areEqual);
