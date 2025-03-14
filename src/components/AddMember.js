import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import projectData from "../database/ProjectData"; // Import the projectData.js file

Modal.setAppElement("#root");

const AddMember = ({ setProjectData, selectedProjectIndex }) => {
    const [showAddMemberForm, setShowAddMemberForm] = useState(false);
    const [newMemberName, setNewMemberName] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

    const allMembers = projectData[selectedProjectIndex]?.members || [];
    const existingMembers = new Set(allMembers);
    const availableMembers = ["Alice", "Bob", "Charlie", "David", "Emma", "Sophia", "Liam", "Olivia"];

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (newMemberName.trim()) {
                const suggestions = availableMembers.filter(name => 
                    name.toLowerCase().includes(newMemberName.toLowerCase()) && !existingMembers.has(name)
                );
                setFilteredSuggestions(suggestions);
            } else {
                setFilteredSuggestions([]);
            }
        }, 300);
        
        return () => clearTimeout(debounce);
    }, [newMemberName]);

    const handleAddMember = () => {
        if (!newMemberName.trim() || existingMembers.has(newMemberName.trim())) return;
        
        if (allMembers.length >= 6) {
            alert("Cannot add more than 6 members!");
            return;
        }

        const updatedProjects = [...projectData];
        updatedProjects[selectedProjectIndex].members.push(newMemberName.trim());
        setProjectData(updatedProjects);
        localStorage.setItem("projectData", JSON.stringify(updatedProjects));
        
        setNewMemberName("");
        setShowAddMemberForm(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown" && activeSuggestionIndex < filteredSuggestions.length - 1) {
            setActiveSuggestionIndex(prev => prev + 1);
        } else if (e.key === "ArrowUp" && activeSuggestionIndex > 0) {
            setActiveSuggestionIndex(prev => prev - 1);
        } else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
            setNewMemberName(filteredSuggestions[activeSuggestionIndex]);
            setFilteredSuggestions([]);
            setActiveSuggestionIndex(-1);
        }
    };

    return (
        <div>
            <div onClick={() => setShowAddMemberForm(true)}
                style={{ cursor: "pointer", color: "#00C851", marginLeft: "20px", fontSize: "18px", fontWeight: "bold" }}>
                <span style={{ marginRight: "5px" }}>+</span> Add Member
            </div>

            <Modal
                isOpen={showAddMemberForm}
                onRequestClose={() => setShowAddMemberForm(false)}
                style={{
                    overlay: {
                        position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
                    },
                    content: {
                        backgroundColor: "#222", padding: "30px", borderRadius: "10px", width: "500px", boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
                        position: "relative", inset: "unset",
                    },
                }}>
                <h2 style={{ color: "#FFFFFF", textAlign: "center", marginBottom: "20px" }}>Add New Member</h2>
                <input
                    type="text"
                    placeholder="Enter member name..."
                    style={{ padding: "12px", borderRadius: "5px", border: "none", backgroundColor: "#333", color: "#FFFFFF", width: "100%", marginBottom: "10px", fontSize: "16px" }}
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                {/* Autocomplete Suggestions */}
                {filteredSuggestions.length > 0 && (
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, backgroundColor: "#333", borderRadius: "5px", maxHeight: "150px", overflowY: "auto" }}>
                        {filteredSuggestions.map((name, index) => (
                            <li
                                key={name}
                                style={{
                                    padding: "10px", cursor: "pointer", color: "#fff", display: "flex", alignItems: "center",
                                    backgroundColor: activeSuggestionIndex === index ? "#444" : "#333",
                                }}
                                onMouseDown={() => setNewMemberName(name)}
                            >
                                <span style={{ width: "30px", height: "30px", borderRadius: "50%", backgroundColor: "#555", display: "inline-flex", justifyContent: "center", alignItems: "center", marginRight: "10px" }}>
                                    {name[0]}
                                </span>
                                {name.split(new RegExp(`(${newMemberName})`, "gi")).map((part, index) =>
                                    part.toLowerCase() === newMemberName.toLowerCase() ? <strong key={index}>{part}</strong> : part
                                )}
                                                            </li>
                        ))}
                    </ul>
                )}
                {filteredSuggestions.length === 0 && newMemberName.trim() && (
                    <p style={{ color: "#aaa", fontSize: "14px", textAlign: "center" }}>No results found</p>
                )}
                
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                    <button onClick={() => setShowAddMemberForm(false)}
                        style={{ padding: "10px 18px", borderRadius: "5px", border: "none", backgroundColor: "#555", color: "#FFFFFF", cursor: "pointer", flex: 1, marginRight: "10px" }}>Cancel</button>
                    <button onClick={handleAddMember}
                        style={{ padding: "10px 18px", borderRadius: "5px", border: "none", backgroundColor: "#FF4500", color: "#FFFFFF", cursor: "pointer", fontWeight: "bold", flex: 1 }}>Add Member</button>
                </div>
            </Modal>
        </div>
    );
};

export default AddMember;
