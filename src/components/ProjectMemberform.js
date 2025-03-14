import React, { useState } from "react";
import styled from "styled-components";
import { FaProjectDiagram } from "react-icons/fa";

const AddProjectMemberForm = ({ onAddMember, onClose }) => {
    const [projectId, setProjectId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [ownerId, setOwnerId] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [memberName, setMemberName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (projectId && name && description && ownerId && createdAt && memberName && role && email) {
            onAddMember({ projectId, name, description, ownerId, createdAt, memberName, role, email });
            setProjectId("");
            setName("");
            setDescription("");
            setOwnerId("");
            setCreatedAt("");
            setMemberName("");
            setRole("");
            setEmail("");
        }
    };

    return (
        <FormContainer>
            <h2><FaProjectDiagram style={{ color: "orange" }} /> Add Project Member</h2>

            <FormGroup>
                <FormLabel>Project ID <span style={{ color: "red" }}>*</span></FormLabel>
                <FormInput 
                    type="text" 
                    value={projectId} 
                    onChange={(e) => setProjectId(e.target.value)} 
                    placeholder="Enter Project ID"
                    required
                    pattern="\d*"
                    title="Project ID must be a number"
                />
            </FormGroup>

            <FormGroup>
                <FormLabel>Project Name <span style={{ color: "red" }}>*</span></FormLabel>
                <FormInput 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Enter Project Name"
                    required
                />
            </FormGroup>

            <FormGroup>
                <FormLabel>Project Description</FormLabel>
                <FormTextarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Enter Project Description" 
                />
            </FormGroup>

            <FormGroup>
                <FormLabel>Created At <span style={{ color: "red" }}>*</span></FormLabel>
                <FormInput 
                    type="date" 
                    value={createdAt} 
                    onChange={(e) => setCreatedAt(e.target.value)} 
                    required
                    max={new Date().toISOString().split("T")[0]}
                />
            </FormGroup>

            <FormButtonContainer>
                <FormButton type="submit" onClick={handleSubmit}>Add Member</FormButton>
                <FormButton 
                    type="button" 
                    onClick={onClose} 
                    style={{ background: "red" }}
                >
                    Close Form
                </FormButton>
            </FormButtonContainer>
        </FormContainer>
    );
};  

export default AddProjectMemberForm;

const FormContainer = styled.div`
    background: #1A1A1A;
    padding: 30px;
    border-radius: 10px;
    width: 350px;
    text-align: left;
    color: white;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 0px 10px rgba(255, 165, 0, 0.5);
`;

const FormGroup = styled.div`
    margin-bottom: 15px;
`;

const FormLabel = styled.label`
    font-size: 16px;
    color: #ffcc00;
`;

const FormInput = styled.input`
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border-radius: 5px;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: white;
`;

const FormTextarea = styled.textarea`
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border-radius: 5px;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: white;
`;

const FormButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const FormButton = styled.button`
    background: orange;
    color: black;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    width: 48%;
    transition: background 0.3s;
    
    &:hover {
        background: #ffcc00;
    }
`;
