import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaUserCircle, FaSignOutAlt, FaBell } from "react-icons/fa"; // Added FaBell
import { FaAnglesRight } from "react-icons/fa6";
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
  const [showNotifications, setShowNotifications] = useState(false); // State for notifications dropdown
  const [notifications, setNotifications] = useState([
    "New message from John",
    "Task deadline approaching",
    "Project update available",
  ]); // Sample notifications

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
            color: "#ff6347",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            padding: "10px 20px",
            borderRadius: "10px",
            transition: "transform 0.3s, box-shadow 0.3s, color 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 12px rgba(216, 119, 8, 0.5)";
            e.currentTarget.style.color = "#ff4500";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(86, 90, 95, 0.05)";
            e.currentTarget.style.color = "#ff6347";
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
            style={{ color: location.pathname === "/home" ? "#ff6347" : "inherit" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6347")}
            onMouseLeave={(e) => (e.currentTarget.style.color = location.pathname === "/home" ? "#ff6347" : "inherit")}
          >
            <FaHome style={{ marginRight: "8px" }} />
            Home
          </NavLink>
        </NavItem>

        {/* Profile Link */}
        <NavItem>
          <NavLink
            onClick={() => navigate("/profile")}
            style={{ color: location.pathname === "/profile" ? "#ff6347" : "inherit" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6347")}
            onMouseLeave={(e) => (e.currentTarget.style.color = location.pathname === "/profile" ? "#ff6347" : "inherit")}
          >
            <FaUserCircle style={{ marginRight: "8px" }} />
            Profile
          </NavLink>
        </NavItem>

        {/* Notification Button */}
        <NavItem>
          <NavLink
            onClick={toggleNotifications}
            style={{ position: "relative", display: "flex", alignItems: "center" }}
          >
            <FaBell style={{ marginRight: "8px" }} />
            Notifications
            {notifications.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "12px",
                }}
              >
                {notifications.length}
              </span>
            )}
          </NavLink>
          {showNotifications && (
            <div
              style={{
                position: "absolute",
                top: "40px",
                right: "0",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                zIndex: 1000,
                width: "250px",
              }}
            >
              <div style={{ padding: "10px", fontWeight: "bold", borderBottom: "1px solid #ccc" }}>
                Notifications
              </div>
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #eee",
                      cursor: "pointer",
                      ":hover": { backgroundColor: "#f9f9f9" },
                    }}
                  >
                    {notification}
                  </div>
                ))
              ) : (
                <div style={{ padding: "10px", color: "#888" }}>No new notifications</div>
              )}
            </div>
          )}
        </NavItem>

        {/* Logout Link */}
        <NavItem>
          <NavLink
            onClick={confirmLogout}
            onMouseOver={(e) => (e.currentTarget.style.color = "black")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "orange")}
            style={{ color: "red", display: "flex", alignItems: "center" }}
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
            backdropFilter: "blur(8px)", // Glass effect
        }}>
            <div style={{
                background: "rgba(255, 255, 255, 0.1)",
                padding: "30px",
                borderRadius: "15px",
                textAlign: "center",
                color: "#fff",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
                minWidth: "320px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(15px)", // Frosted glass effect
                animation: "fadeIn 0.3s ease-in-out"
            }}>
                <p style={{
                    fontSize: "20px",
                    marginBottom: "20px",
                    fontWeight: "600",
                    letterSpacing: "0.5px"
                }}>
                    Are you sure you want to logout?
                </p>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "15px"
                }}>
                    <button 
                        onClick={handleLogoutConfirm}
                        style={{
                            background: "linear-gradient(135deg,rgb(241, 134, 101),rgb(236, 116, 61))",
                            color: "#fff",
                            border: "none",
                            padding: "12px 24px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "bold",
                            transition: "transform 0.2s, background 0.3s",
                            boxShadow: "0px 4px 10px rgba(255, 118, 136, 0.3)",
                        }}
                        onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
                        onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                    >
                        Yes, Logout
                    </button>
                    <button 
                        onClick={() => setShowLogoutModal(false)}
                        style={{
                            background: "linear-gradient(135deg, #6a85b6, #bac8e0)",
                            color: "#fff",
                            border: "none",
                            padding: "12px 24px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "bold",
                            transition: "transform 0.2s, background 0.3s",
                            boxShadow: "0px 4px 10px rgba(106, 133, 182, 0.3)",
                        }}
                        onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
                        onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )}


    </NavbarContainer>
  );
};

export default Navbar;