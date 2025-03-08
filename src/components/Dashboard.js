import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ProjectTile from "./ProjectTile";
import ProjectDetail from "./ProjectDetail";
import {
  DashboardContainer,
  MainContent,
  ProjectsContainer,
} from "./styles";
import { CiSquarePlus } from "react-icons/ci";
import AddProjectMemberForm from "./ProjectMemberform";
import ProjectData from "../database/ProjectData";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState(ProjectData);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleCloseForm = () => setShowForm(false);

  const handleAddMember = (memberName) => {
    if (selectedProject) {
      const updatedProjects = projects.map((project) =>
        project.name === selectedProject.name
          ? { ...project, members: [...project.members, memberName] }
          : project
      );

      setProjects(updatedProjects);
      setShowForm(false);
    }
  };

  return (
    <div>
      <Navbar setSidebarOpen={setSidebarOpen} isSidebarOpen={isSidebarOpen} />
      <DashboardContainer>
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <MainContent isSidebarOpen={isSidebarOpen} style={{ marginTop: "60px", textAlign: "center" }}>
          <h2 style={{ color: "#FFFFFF", marginBottom: "1.5rem", width: "100%" }}>Projects</h2>
          <ProjectsContainer>
            {projects.map((project, index) => (
              <ProjectTile
                key={index}
                project={project}
                onClick={() => navigate(`/project/${project.name}`)}
              />
            ))}
          </ProjectsContainer>
        </MainContent>
        {/* Floating Button */}
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "70px",
            backgroundColor: "#121212", // Dark Gray
            color: "#FFFFFF", // White
            borderRadius: "50%",
            width: "70px",
            height: "70px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            boxShadow: "0px 0px 50px 2px rgba(255, 99, 71, 0.84)", // Orange glow
            transition: "transform 0.3s ease-in-out",
          }}
          className="floating-button"
          onClick={() => setShowForm(true)}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <CiSquarePlus style={{ width: "50px", height: "50px", color: "#FF6347" }} /> {/* Orange */}
        </div>
        {showForm && <AddProjectMemberForm onAddMember={handleAddMember} onClose={handleCloseForm} />}
      </DashboardContainer>
    </div>
  );
};

export default Dashboard;