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
            <h2><FaProjectDiagram style={{ color: "orange" }} /> Project Details</h2>
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
                    max={new Date().toISOString().split("T")[0]} // Restricts future dates
                />
            </FormGroup>

            <FormButtonContainer>
                <FormButton type="submit">Add Project</FormButton>
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
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(51, 49, 49, 0.15);
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(25px);
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.9);
    z-index: 1000;
    border: 1px solid rgba(255, 255, 255, 0.3);
    width: 100%;
    max-width: 500px;
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: translate(-50%, -50%) scale(1.02);
        box-shadow: 0px 12px 30px rgba(0, 0, 0, 0.4);
    }
`;

const FormGroup = styled.div`
    margin-bottom: 15px;
`;

const FormLabel = styled.label`
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
    color: white;
`;

const FormInput = styled.input`
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
    background-color: #fff;
    color: #333;
    transition: border-color 0.3s ease, transform 0.2s ease;

    &:focus {
        border-color: #007bff;
        outline: none;
        transform: scale(1.05);
    }
`;

const FormTextarea = styled.textarea`
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
    background-color: #fff;
    color: #333;
    height: 100px;
    resize: vertical;
    transition: border-color 0.3s ease, transform 0.2s ease;

    &:focus {
        border-color: #007bff;
        outline: none;
        transform: scale(1.05);
    }
`;

const FormButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const FormButton = styled.button`
    width: 48%;
    padding: 14px;
    background-color: rgb(73, 155, 62);
    color: #fff;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: rgb(26, 145, 11);
        transform: scale(1.05);
    }

    &:active {
        transform: scale(1);
    }
`;
