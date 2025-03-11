import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the root element for accessibility

const AddMember = ({ projectData, setProjectData, selectedProjectIndex }) => {
    const [showAddMemberForm, setShowAddMemberForm] = useState(false);
    const [newMemberName, setNewMemberName] = useState("");

    const handleAddMember = () => {
        console.log("member to be added");
        if (!newMemberName.trim()) return;

        const updatedProjects = [...projectData];
        const project = updatedProjects[selectedProjectIndex];

        if (project.members.includes(newMemberName.trim())) {
            alert("Member already exists in this project!");
            return;
        }

        if (project.members.length >= 6) {
            alert("Cannot add more than 6 members!");
            return;
        }

        project.members.push(newMemberName.trim());
        setProjectData(updatedProjects);

        setNewMemberName("");
        setShowAddMemberForm(false);
    };

    return (
        <div>
            {/* Button to open modal */}
            <div
                onClick={() => setShowAddMemberForm(true)}
                style={{
                    cursor: "pointer",
                    color: "#00C851",
                    marginLeft: "20px",
                    fontSize: "18px",
                    fontWeight: "bold",
                }}
            >
                <span style={{ marginRight: "5px" }}>+</span> Add Member
            </div>

            {/* Modal */}
            <Modal
                isOpen={showAddMemberForm}
                onRequestClose={() => setShowAddMemberForm(false)}
                style={{
                    overlay: {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0, 0, 0, 0.5)", // Adds a dim background effect
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                    },
                    content: {
                        backgroundColor: "#222",
                        padding: "30px",
                        borderRadius: "10px",
                        width: "500px",
                        boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
                        position: "relative",
                        inset: "unset",
                    },
                }}
            >
                <h2 style={{ color: "#FFFFFF", textAlign: "center", marginBottom: "20px" }}>
                    Add New Member
                </h2>
                <input
                    type="text"
                    placeholder="Enter member name..."
                    style={{
                        padding: "12px",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: "#333",
                        color: "#FFFFFF",
                        width: "100%",
                        marginBottom: "20px",
                        fontSize: "16px",
                    }}
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <button
                        onClick={() => setShowAddMemberForm(false)}
                        style={{
                            padding: "10px 18px",
                            borderRadius: "5px",
                            border: "none",
                            backgroundColor: "#555",
                            color: "#FFFFFF",
                            cursor: "pointer",
                            flex: 1,
                            marginRight: "10px",
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddMember}
                        style={{
                            padding: "10px 18px",
                            borderRadius: "5px",
                            border: "none",
                            backgroundColor: "#FF4500",
                            color: "#FFFFFF",
                            cursor: "pointer",
                            fontWeight: "bold",
                            flex: 1,
                        }}
                    >
                        Add Member
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default AddMember;
