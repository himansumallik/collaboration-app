import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ProjectData from "../database/ProjectData";
import { DashboardContainer, MainContent } from "./styles";
import { CiSquarePlus } from "react-icons/ci";
import AddProjectMemberForm from "./ProjectMemberform";

const ProjectDetailsPage = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [projects, setProjects] = useState(ProjectData);
    const [isTeamExpanded, setIsTeamExpanded] = useState(false);

    const { projectName } = useParams();
    const navigate = useNavigate();

    // Find the current project
    const project = projects.find((p) => p.name === projectName);

    const handleCloseForm = () => setShowForm(false);

    const handleAddMember = (memberName) => {
        const updatedProjects = projects.map((p) =>
            p.name === projectName
                ? { ...p, members: [...p.members, memberName] }
                : p
        );
        setProjects(updatedProjects);
        setShowForm(false);
    };

    const handleTeamsClick = () => {
        setIsTeamExpanded(!isTeamExpanded);
    };

    const handleTaskCompletion = (taskIndex) => {
        const updatedTasks = project.tasks.map((task, index) =>
            index === taskIndex ? { ...task, completed: !task.completed } : task
        );
        setProjects((prevProjects) =>
            prevProjects.map((p) =>
                p.name === projectName ? { ...p, tasks: updatedTasks } : p
            )
        );
    };

    if (!project) {
        return <h2 style={{ color: "#FFFFFF" }}>Project not found</h2>;
    }

    return (
        <div>
            <Navbar setSidebarOpen={setSidebarOpen} isSidebarOpen={isSidebarOpen} />
            <DashboardContainer style={{ display: "flex", width: "100%" }}>
                {/* Sidebar */}
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    isProjectPage={true}
                    onTeamsClick={handleTeamsClick}
                    teamMembers={project.members}
                    isTeamExpanded={isTeamExpanded}
                />

                {/* Main Content */}
                <MainContent
                    isSidebarOpen={isSidebarOpen}
                    style={{
                        marginTop: "20px",
                        flexGrow: 1,
                        backgroundColor: "#121212",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "100vh",
                        padding: "500px",
                    }}
                >
                    <div
                        style={{
                            width: "200%",
                            maxWidth: "2000px",
                            backgroundColor: "#1A1A1A",
                            padding: "40px",
                            borderRadius: "15px",
                            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.4)",
                            textAlign: "left",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            overflowY: "auto",
                            maxHeight: "200vh",
                            minHeight: "700px",
                        }}
                    >
                        {/* Project Details Section */}
                        <h2 style={{ color: "#FF6347", marginBottom: "15px", fontSize: "40px", fontWeight: "bold" }}>
                            {project.name}
                        </h2>
                        <p style={{ color: "#CCCCCC", marginBottom: "25px", fontSize: "25px", lineHeight: "1.6" }}>
                            {project.description}
                        </p>

                        {/* Tasks Section */}
                        <h3 style={{ color: "#FFCC00", marginBottom: "15px", fontSize: "22px", fontWeight: "600" }}>
                            Tasks
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "25px" }}>
                            {project.tasks.map((task, index) => (
                                <Link
                                    key={index}
                                    to={`/tasks/${task.name}`}
                                    style={{ textDecoration: "none", color: "inherit" }}
                                >
                                    <div
                                        style={{
                                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                                            padding: "15px",
                                            borderRadius: "8px",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            transition: "transform 0.2s",
                                            position: "relative",
                                        }}
                                        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                                        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                    >
                                        {/* Task Name and Due Date */}
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <span style={{ color: "#FFFFFF", fontSize: "18px", fontWeight: "500" }}>
                                                {task.name}
                                            </span>
                                            <span style={{ color: "#FF4444", fontSize: "16px" }}>
                                                Assigned to: {task.assignedMembers.join(", ")}
                                            </span>
                                            <span style={{ color: "#CCCCCC", fontSize: "14px" }}>{task.dueDate}</span>
                                        </div>

                                        {/* Progress Indicator */}
                                        <div style={{ marginTop: "10px" }}>
                                            <div
                                                style={{
                                                    width: "100%",
                                                    height: "6px",
                                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                                    borderRadius: "4px",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: `${task.progress || 0}%`,
                                                        height: "100%",
                                                        backgroundColor: "#007BFF",
                                                        borderRadius: "4px",
                                                    }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Priority Level */}
                                        <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                                            <span
                                                style={{
                                                    color:
                                                        task.priority === "High"
                                                            ? "#FF4444"
                                                            : task.priority === "Medium"
                                                            ? "#FFCC00"
                                                            : "#00C851",
                                                    fontSize: "14px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {task.priority || "Low"} Priority
                                            </span>
                                        </div>

                                        {/* Mark as Completed Button */}
                                        <button
                                            style={{
                                                marginTop: "15px",
                                                padding: "8px 12px",
                                                backgroundColor: task.completed ? "#00C851" : "rgba(255, 255, 255, 0.1)",
                                                color: task.completed ? "#FFFFFF" : "#CCCCCC",
                                                border: "none",
                                                borderRadius: "6px",
                                                cursor: "pointer",
                                                transition: "background-color 0.3s, color 0.3s",
                                            }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleTaskCompletion(index);
                                            }}
                                        >
                                            {task.completed ? "Completed" : "In Progress . . ."}
                                        </button>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </MainContent>

                {/* Floating Button */}
                <div
                    style={{
                        position: "fixed",
                        bottom: "80px",
                        right: "70px",
                        backgroundColor: "#121212",
                        color: "#FFFFFF",
                        borderRadius: "50%",
                        width: "70px",
                        height: "70px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        boxShadow: "0px 0px 50px 2px rgba(243, 109, 69, 0.84)",
                        transition: "transform 0.3s ease-in-out",
                    }}
                    className="floating-button"
                    onClick={() => setShowForm(true)}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                    <CiSquarePlus style={{ width: "50px", height: "50px", color: "#FF6347" }} />
                </div>
                {showForm && <AddProjectMemberForm onAddMember={handleAddMember} onClose={handleCloseForm} />}
            </DashboardContainer>
        </div>
    );
};

export default ProjectDetailsPage;