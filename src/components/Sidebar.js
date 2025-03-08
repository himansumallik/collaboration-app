import React, { useState } from 'react'; // Add useState import
import { SidebarContainer, SidebarItem, TeamMemberItem } from './styles';
import { FaProjectDiagram, FaUsers, FaCog, FaTachometerAlt, FaUser, FaBell } from 'react-icons/fa';

const Sidebar = ({
  isSidebarOpen,
  isProjectPage,
  onTeamsClick,
  teamMembers = [], // Default to empty array to avoid errors
  isTeamExpanded,
  setTeamMembers, // Pass setTeamMembers as a prop from the parent component
}) => {
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');

  const handleAddMember = () => {
    if (newMemberName.trim()) {
      // Check for duplicates
      if (!teamMembers.includes(newMemberName.trim())) {
        setTeamMembers([...teamMembers, newMemberName.trim()]);
        setNewMemberName(''); // Clear the input
        setShowAddMemberForm(false); // Close the form
      } else {
        alert('Member already exists!'); // Simple duplicate check
      }
    }
  };

  return (
    <SidebarContainer isSidebarOpen={isSidebarOpen}>
      {isProjectPage ? (
        // Simplified sidebar for ProjectDetailsPage
        <>
          <SidebarItem>
            <FaProjectDiagram style={{ marginRight: '10px', color: '#FFCC00' }} /> {/* Gold */}
            {isSidebarOpen && <span style={{ color: '#FFFFFF' }}>Overview</span>} {/* White */}
          </SidebarItem>
          <SidebarItem onClick={onTeamsClick}>
            <FaUsers style={{ marginRight: '10px', color: '#FFCC00' }} /> {/* Gold */}
            {isSidebarOpen && <span style={{ color: '#FFFFFF' }}>Team</span>} {/* White */}
          </SidebarItem>

          {/* Conditionally render team members */}
          {isTeamExpanded && isSidebarOpen && (
            <div style={{ marginLeft: '20px' }}>

              {/* Add Member Option */}
              <TeamMemberItem
                onClick={() => setShowAddMemberForm(true)} // Open the form/modal
                style={{ cursor: 'pointer', color: '#00C851' }} // Teal for the "+" sign
              >
                <span style={{ marginRight: '5px' }}>+</span> Add Member
              </TeamMemberItem>

              {/* List of team members */}
              {teamMembers.map((member, index) => (
                <TeamMemberItem key={index}>
                  <span style={{ color: '#CCCCCC' }}>{member}</span> {/* Light Gray */}
                </TeamMemberItem>
              ))}
            </div>
          )}

          {/* Add Member Form (Modal or Inline) */}
          {showAddMemberForm && (
            <div style={{ marginLeft: '20px', marginTop: '10px' }}>
              <input
                type="text"
                placeholder="Enter member name"
                style={{
                  padding: '5px',
                  borderRadius: '4px',
                  border: '1px solid #2C2C2C', // Dark Gray
                  backgroundColor: '#1A1A1A', // Charcoal
                  color: '#FFFFFF', // White
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
                  backgroundColor: '#FF6347', // Orange
                  color: '#FFFFFF', // White
                  cursor: 'pointer',
                }}
              >
                Add
              </button>
              <button
                onClick={() => setShowAddMemberForm(false)} // Close the form
                style={{
                  padding: '5px 10px',
                  borderRadius: '4px',
                  border: 'none',
                  backgroundColor: '#2C2C2C', // Dark Gray
                  color: '#FFFFFF', // White
                  cursor: 'pointer',
                  marginLeft: '10px',
                }}
              >
                Cancel
              </button>
            </div>
          )}
          <SidebarItem>
            <FaCog style={{ marginRight: '10px', color: '#FFCC00' }} /> {/* Gold */}
            {isSidebarOpen && <span style={{ color: '#FFFFFF' }}>Settings</span>} {/* White */}
          </SidebarItem>
        </>
      ) : (
        // Full sidebar for the homepage
        <>
          <SidebarItem>
            <FaTachometerAlt style={{ marginRight: '10px', color: '#FFCC00' }} /> {/* Gold */}
            {isSidebarOpen && <span style={{ color: '#FFFFFF' }}>Dashboard</span>} {/* White */}
          </SidebarItem>
          <SidebarItem>
            <FaUser style={{ marginRight: '10px', color: '#FFCC00' }} /> {/* Gold */}
            {isSidebarOpen && <span style={{ color: '#FFFFFF' }}>Profile</span>} {/* White */}
          </SidebarItem>
          <SidebarItem>
            <FaCog style={{ marginRight: '10px', color: '#FFCC00' }} /> {/* Gold */}
            {isSidebarOpen && <span style={{ color: '#FFFFFF' }}>Settings</span>} {/* White */}
          </SidebarItem>
        </>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;