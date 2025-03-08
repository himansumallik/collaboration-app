import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaUserCircle, FaSignOutAlt, FaBell } from "react-icons/fa"; // Added FaBell
import { FaAnglesRight } from "react-icons/fa6";
import notifications from "../database/notification"; // Import notifications
import {
  NavbarContainer,
  Logo,
  NavLinks,
  NavLink,
  MinimizeIcon,
  NavItem,
} from "./styles";

const Navbar = ({ setSidebarOpen, isSidebarOpen, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsList, setNotificationsList] = useState([]);

  const confirmLogout = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    handleLogout();
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate("/home");
  };

  // Fetch notifications on component mount
  useEffect(() => {
    setNotificationsList(notifications); // Set notifications from the database
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <NavbarContainer>
      <div style={{ display: "flex", alignItems: "center" }}>
        <MinimizeIcon
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          style={{
            marginRight: "20px",
            transform: isSidebarOpen ? "rotate(0deg)" : "rotate(180deg)",
            transition: "transform 0.3s",
          }}
        >
          <FaAnglesRight />
        </MinimizeIcon>
        <Logo
          onClick={handleLogoClick}
          style={{
            cursor: "pointer",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#FFCC00", // Gold
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            padding: "10px 20px",
            borderRadius: "10px",
            transition: "transform 0.3s, box-shadow 0.3s, color 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 12px rgba(255, 204, 0, 0.5)"; // Gold shadow
            e.currentTarget.style.color = "#FF6347"; // Orange
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(86, 90, 95, 0.05)";
            e.currentTarget.style.color = "#FFCC00"; // Gold
          }}
        >
          Collaboration App
        </Logo>
      </div>
      <NavLinks>
        {/* Home Link */}
        <NavItem>
          <NavLink
            onClick={() => navigate("/home")}
            style={{ color: location.pathname === "/home" ? "#FF6347" : "#FFFFFF" }} // Orange or White
            onMouseEnter={(e) => (e.currentTarget.style.color = "#FF6347")} // Orange
            onMouseLeave={(e) => (e.currentTarget.style.color = location.pathname === "/home" ? "#FF6347" : "#FFFFFF")} // Orange or White
          >
            <FaHome style={{ marginRight: "8px" }} />
            Home
          </NavLink>
        </NavItem>

        {/* Profile Link */}
        <NavItem>
          <NavLink
            onClick={() => navigate("/profile")}
            style={{ color: location.pathname === "/profile" ? "#FF6347" : "#FFFFFF" }} // Orange or White
            onMouseEnter={(e) => (e.currentTarget.style.color = "#FF6347")} // Orange
            onMouseLeave={(e) => (e.currentTarget.style.color = location.pathname === "/profile" ? "#FF6347" : "#FFFFFF")} // Orange or White
          >
            <FaUserCircle style={{ marginRight: "8px" }} />
            Profile
          </NavLink>
        </NavItem>

        {/* Notification Button */}
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

        {/* Logout Link */}
        <NavItem>
          <NavLink
            onClick={confirmLogout}
            onMouseOver={(e) => (e.currentTarget.style.color = "#FF6347")} // Orange
            onMouseLeave={(e) => (e.currentTarget.style.color = "#FF4444")} // Coral
            style={{ color: "#FF4444", display: "flex", alignItems: "center" }} // Coral
          >
            <FaSignOutAlt style={{ marginRight: "8px" }} />
            Logout
          </NavLink>
        </NavItem>
      </NavLinks>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: "#1A1A1A", // Charcoal
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            color: "#FFFFFF", // White
          }}>
            <p>Are you sure you want to logout?</p>
            <button
              onClick={handleLogoutConfirm}
              style={{
                backgroundColor: "#FF6347", // Orange
                color: "#FFFFFF", // White
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Yes
            </button>
            <button
              onClick={() => setShowLogoutModal(false)}
              style={{
                backgroundColor: "#2C2C2C", // Dark Gray
                color: "#FFFFFF", // White
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              No
            </button>
          </div>
        </div>
      )}
    </NavbarContainer>
  );
};

export default Navbar;