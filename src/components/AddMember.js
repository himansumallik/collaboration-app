import React, { useState } from 'react';

const AddMember = ({ teamMembers, setTeamMembers }) => {
const [showAddMemberForm, setShowAddMemberForm] = useState(false);
const [newMemberName, setNewMemberName] = useState('');

const handleAddMember = () => {
    if (newMemberName.trim()) {
    // Check for duplicates
    if (!teamMembers.includes(newMemberName.trim())) {
        setTeamMembers([...teamMembers, newMemberName.trim()]);
        setNewMemberName(''); // Clear input
        setShowAddMemberForm(false); // Close form
    } else {
        alert('Member already exists!');
    }
    }
};

return (
    <div style={{ marginLeft: '20px' }}>
    {/* Button to open form */}
    <div
        onClick={() => setShowAddMemberForm(true)}
        style={{ cursor: 'pointer', color: '#00C851' }} // Teal color
    >
        <span style={{ marginRight: '5px' }}>+</span> Add Member
    </div>

    {/* Form to add a new member */}
    {showAddMemberForm && (
        <div style={{ marginTop: '10px' }}>
        <input
            type="text"
            placeholder="Enter member name"
            style={{
            padding: '5px',
            borderRadius: '4px',
            border: '1px solid #2C2C2C',
            backgroundColor: '#1A1A1A',
            color: '#FFFFFF',
            marginRight: '10px',
            }}
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
            aria-label="Enter member name"
        />
        <button
            onClick={handleAddMember}
            style={{
            padding: '5px 10px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#FF6347',
            color: '#FFFFFF',
            cursor: 'pointer',
            }}
        >
            Add
        </button>
        <button
            onClick={() => setShowAddMemberForm(false)}
            style={{
            padding: '5px 10px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#2C2C2C',
            color: '#FFFFFF',
            cursor: 'pointer',
            marginLeft: '10px',
            }}
        >
            Cancel
        </button>
        </div>
    )}
    </div>
);
};

export default AddMember;
