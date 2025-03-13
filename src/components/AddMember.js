import React, { useState } from "react";
import Modal from "react-modal";
import projectData from "../database/ProjectData";

Modal.setAppElement("#root");

const AddMember = ({ setProjectData, selectedProjectIndex }) => {
    const [showAddMemberForm, setShowAddMemberForm] = useState(false);
    const [newMemberName, setNewMemberName] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const allPossibleMembers = [
        "Alice Johnson",
        "Bob Smith",
        "Charlie Brown",
        "David Lee",
        "Emma Watson",
        "Franklin Harris",
        "Grace Kelly",
        "Henry Ford",
    ];

    const handleInputChange = (e) => {
        const input = e.target.value;
        setNewMemberName(input);
        if (input.trim()) {
            const suggestions = allPossibleMembers.filter((name) =>
                name.toLowerCase().includes(input.toLowerCase())
            );
            setFilteredSuggestions(suggestions);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSelectSuggestion = (name) => {
        setNewMemberName(name);
        setShowSuggestions(false);
    };

    const handleAddMember = () => {
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
        localStorage.setItem("projectData", JSON.stringify(updatedProjects));

        setNewMemberName("");
        setShowAddMemberForm(false);
    };

    return (
        <div>
            <div
                onClick={() => setShowAddMemberForm(true)}
                style={{ cursor: "pointer", color: "#00C851", marginLeft: "20px", fontSize: "18px", fontWeight: "bold" }}
            >
                <span style={{ marginRight: "5px" }}>+</span> Add Member
            </div>

            <Modal
                isOpen={showAddMemberForm}
                onRequestClose={() => setShowAddMemberForm(false)}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
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
                <h2 style={{ color: "#FFFFFF", textAlign: "center", marginBottom: "20px" }}>Add New Member</h2>
                <div style={{ position: "relative" }}>
                    <input
                        type="text"
                        placeholder="Enter member name..."
                        value={newMemberName}
                        onChange={handleInputChange}
                        style={{
                            padding: "12px",
                            borderRadius: "5px",
                            border: "none",
                            backgroundColor: "#333",
                            color: "#FFFFFF",
                            width: "100%",
                            fontSize: "16px",
                        }}
                    />
                    {showSuggestions && filteredSuggestions.length > 0 && (
                        <ul
                            style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                width: "100%",
                                backgroundColor: "#333",
                                color: "#fff",
                                listStyleType: "none",
                                padding: "5px 0",
                                margin: 0,
                                borderRadius: "5px",
                                boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
                                maxHeight: "150px",
                                overflowY: "auto",
                            }}
                        >
                            {filteredSuggestions.map((name, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSelectSuggestion(name)}
                                    style={{
                                        padding: "10px",
                                        cursor: "pointer",
                                        transition: "background 0.3s",
                                    }}
                                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#444")}
                                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#333")}
                                >
                                    {name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
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