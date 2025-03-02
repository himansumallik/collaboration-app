import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaHome, FaUserCircle, FaSignOutAlt } from "react-icons/fa"; // Importing icons
import { FaAnglesRight } from "react-icons/fa6";

import {
  NavbarContainer,
  Logo,
  NavLinks,
  NavLink,
  MinimizeIcon,
  NavItem
} from "./styles";

const Navbar = ({ setSidebarOpen, isSidebarOpen, handleLogout }) => {
  const navigate = useNavigate();

  const confirmLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      handleLogout();
      navigate("/login"); // Redirect to login after logout
    }
  };

  const handleLogoClick = () => {
    navigate("/home"); // Navigate to the homepage when the logo is clicked
  }; 

  return (
    <NavbarContainer>
      <div style={{ display: "flex", alignItems: "center" }}>
        <MinimizeIcon
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          style={{ marginRight: "20px" }}
        >
          {/* Conditionally render the icon based on isSidebarOpen */}
          {isSidebarOpen ?  <FaBars /> : <FaAnglesRight />}
        </MinimizeIcon>
        <Logo 
          onClick={handleLogoClick}
          style={{
            cursor: "pointer",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#orange",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // Text shadow
            //boxShadow: "0 4px 6px rgba(243, 109, 69, 0.84)", // Box shadow
            padding: "10px 20px",
            borderRadius: "10px",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)"; // Lift up on hover
            e.currentTarget.style.boxShadow = "0 6px 12px rgba(216, 119, 8, 0.5)"; // Enhance shadow on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)"; // Reset position
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(86, 90, 95, 0.05)"; // Reset shadow
            e.currentTarget.style.color = "rgba(243, 109, 69, 0.84)"; // Reset shadow
          }}
        >
          Collaboration App
        </Logo>
      </div>
      <NavLinks>
        {/* Home section with icon */}
        <NavItem>
          <NavLink onClick={() => navigate("/home")}>
            <FaHome style={{ marginRight: "8px" }} />
            Home
          </NavLink>
        </NavItem>

        {/* Profile section with icon */}
        <NavItem>
          <NavLink onClick={() => navigate("/profile")}>
            <FaUserCircle style={{ marginRight: "8px" }} />
            Profile
          </NavLink>
        </NavItem>

        {/* Logout section with icon */}
        <NavItem>
          <NavLink
            onClick={confirmLogout}
            onMouseEnter={(e) => (e.currentTarget.style.color= "black")}
            style={{  color: "red", display: "flex", alignItems: "center" }}
          >
            <FaSignOutAlt style={{ marginRight: "8px" }} />
            Logout
          </NavLink>
        </NavItem>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
