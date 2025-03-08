import React, { useState, useEffect } from "react";
import { NavItem, NavLink } from "reactstrap";
import { FaBell } from "react-icons/fa";
import notifications from "../database/notification"; // Import notifications

const NotificationButton = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notificationsList, setNotificationsList] = useState([]);

    // Fetch notifications on component mount
    useEffect(() => {
        setNotificationsList(notifications); // Set notifications from the database
    }, []);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    return (
        <NavItem style={{ position: "relative" }}>
        <NavLink
            onClick={toggleNotifications}
            style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "500",
            color: "#FFFFFF", // White
            }}
        >
            <FaBell size={20} style={{ marginRight: "8px", color: "#FFFFFF" }} />
            Notifications
            {notificationsList.length > 0 && (
            <span
                style={{
                position: "absolute",
                top: "-5px",
                right: "-10px",
                backgroundColor: "#FF4444", // Coral
                color: "#FFFFFF", // White
                borderRadius: "50%",
                padding: "4px 8px",
                fontSize: "12px",
                fontWeight: "bold",
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                }}
            >
                {notificationsList.length}
            </span>
            )}
        </NavLink>

        {showNotifications && (
            <div
            style={{
                position: "absolute",
                top: "40px",
                right: "0",
                backgroundColor: "#1A1A1A", // Charcoal
                border: "1px solid #2C2C2C", // Dark Gray
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                zIndex: 1000,
                width: "280px",
                maxHeight: "300px",
                overflowY: "auto",
                color: "#FFFFFF", // White
            }}
            >
            <div
                style={{
                padding: "12px",
                fontWeight: "bold",
                borderBottom: "1px solid #2C2C2C", // Dark Gray
                backgroundColor: "#333", // Slightly lighter header
                textAlign: "center",
                }}
            >
                Notifications
            </div>

            {notificationsList.length > 0 ? (
                notificationsList.map((notification, index) => (
                <div
                    key={index}
                    style={{
                    padding: "12px",
                    borderBottom: "1px solid #2C2C2C", // Dark Gray
                    cursor: "pointer",
                    transition: "background 0.3s",
                    fontSize: "14px",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#444")} // Darker Gray
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                    <div style={{ fontWeight: "bold" }}>{notification.sent_by}</div>
                    <div>{notification.message}</div>
                    <div style={{ fontSize: "12px", color: "#CCCCCC" }}>
                    {new Date(notification.created_at).toLocaleString()}
                    </div>
                </div>
                ))
            ) : (
                <div style={{ padding: "12px", color: "#CCCCCC", textAlign: "center" }}>
                No new notifications
                </div>
            )}
            </div>
        )}
        </NavItem>
    );
};

export default NotificationButton;