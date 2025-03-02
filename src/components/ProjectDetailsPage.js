import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ProjectData from "./ProjectData";
import { DashboardContainer, MainContent } from "./styles";
import { CiSquarePlus } from "react-icons/ci";
import AddProjectMemberForm from "./ProjectMemberform";

const ProjectDetailsPage = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [projects, setProjects] = useState(ProjectData);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isTeamExpanded, setIsTeamExpanded] = useState(false); // Track if "Team" tab is expanded

    const { projectName } = useParams();
    const navigate = useNavigate();
    const project = ProjectData.find((p) => p.name === projectName);

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

    const handleTeamsClick = () => {
        setIsTeamExpanded(!isTeamExpanded); // Toggle team members visibility
    };

    if (!project) {
        return <h2 style={{ color: "white" }}>Project not found</h2>;
    }

    return (
        <div>
            <Navbar setSidebarOpen={setSidebarOpen} isSidebarOpen={isSidebarOpen} />
            <DashboardContainer style={{ display: "flex", width: "100%" }}>
                {/* Sidebar */}
                <Sidebar 
                    isSidebarOpen={isSidebarOpen} 
                    isProjectPage={true} 
                    onTeamsClick={handleTeamsClick} // Pass the handler
                    teamMembers={project.members} // Pass team members data
                    isTeamExpanded={isTeamExpanded} // Pass expanded state
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
                            overflowY: "auto", // Add vertical scrollbar if content overflows
                            maxHeight: "200vh", // Limit height to 80% of viewport height
                            minHeight: "700px", // Ensure a minimum height
                        }}
                    >
                        {/* Project Details Section */}
                        <h2 style={{ color: "orange", marginBottom: "15px", fontSize: "40px", fontWeight: "bold" }}>
                            {project.name}
                        </h2>
                        <p style={{ color: "#ccc", marginBottom: "25px", fontSize: "25px", lineHeight: "1.6" }}>
                            {project.description}
                        </p>

                        {/* Tasks Section */}
                        <h3 style={{ color: "#ffcc00", marginBottom: "15px", fontSize: "22px", fontWeight: "600" }}>
                            Tasks
                        </h3>
                        <div style={{ 
                            display: "flex", // Change to flex
                            flexDirection: "column", // Stack items vertically
                            gap: "15px", // Add spacing between tasks
                            marginBottom: "25px"
                        }}>
                            {project.tasks.map((task, index) => (
                                <Link 
                                    key={index} 
                                    to={`/tasks/${task.name}`} // Link to the task details page
                                    style={{ textDecoration: 'none', color: 'inherit' }} // Remove default link styling
                                >
                                    <div style={{ 
                                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                                        padding: "15px",
                                        borderRadius: "8px",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        transition: "transform 0.2s",
                                        position: "relative", // For absolute positioning of icons
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                    >
                                        {/* Task Name and Due Date */}
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <span style={{ color: "#fff", fontSize: "18px", fontWeight: "500" }}>{task.name}</span>
                                            <span style={{ color: "rgb(235, 125, 91)", fontSize: "16px" }}>
                                                Assigned to: {task.assignedMembers.join(", ")} {/* Display assigned members */}
                                            </span>
                                            <span style={{ color: "#ccc", fontSize: "14px" }}>{task.dueDate}</span>
                                        </div>

                                        {/* Progress Indicator */}
                                        <div style={{ marginTop: "10px" }}>
                                            <div style={{ 
                                                width: "100%",
                                                height: "6px",
                                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                                borderRadius: "4px",
                                                overflow: "hidden"
                                            }}>
                                                <div style={{ 
                                                    width: `${task.progress || 0}%`, // Progress percentage
                                                    height: "100%",
                                                    backgroundColor: "#007bff",
                                                    borderRadius: "4px"
                                                }}></div>
                                            </div>
                                        </div>

                                        {/* Priority Level */}
                                        <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                                            <span style={{ 
                                                color: task.priority === "High" ? "#ff4444" : 
                                                    task.priority === "Medium" ? "#ffcc00" : "#00c851",
                                                fontSize: "14px",
                                                fontWeight: "500"
                                            }}>
                                                {task.priority || "Low"} Priority
                                            </span>
                                        </div>

                                        {/* Mark as Completed Button */}
                                        <button 
                                            style={{ 
                                                marginTop: "15px",
                                                padding: "8px 12px",
                                                backgroundColor: task.completed ? "#00c851" : "rgba(255, 255, 255, 0.1)",
                                                color: task.completed ? "#fff" : "#ccc",
                                                border: "none",
                                                borderRadius: "6px",
                                                cursor: "pointer",
                                                transition: "background-color 0.3s, color 0.3s",
                                            }}
                                            onClick={(e) => {
                                                e.preventDefault(); // Prevent navigation when clicking the button
                                                const updatedTasks = project.tasks.map((t, i) => 
                                                    i === index ? { ...t, completed: !t.completed } : t
                                                );
                                                setProjects(prevProjects => prevProjects.map(p => 
                                                    p.name === project.name ? { ...p, tasks: updatedTasks } : p
                                                ));
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
                        backgroundColor: "black",
                        color: "white",
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
                    <CiSquarePlus style={{ width: "50px", height: "50px", color: "orange" }} />
                </div>
                {showForm && <AddProjectMemberForm onAddMember={handleAddMember} onClose={handleCloseForm} />}
            </DashboardContainer>
        </div>
    );
};

export default ProjectDetailsPage;