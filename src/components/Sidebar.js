import React from 'react';
import { SidebarContainer, SidebarItem, TeamMemberItem } from './styles';
import { FaProjectDiagram, FaUsers, FaCog, FaTachometerAlt, FaUser } from 'react-icons/fa';
import AddMember from './AddMember'; // Import AddMember component

const Sidebar = ({ isSidebarOpen, isProjectPage, onTeamsClick, teamMembers = [], isTeamExpanded, setTeamMembers }) => {
  return (
    <SidebarContainer isSidebarOpen={isSidebarOpen}>
      {isProjectPage ? (
        <>
          <SidebarItem>
            <FaProjectDiagram style={{ marginRight: '10px', color: '#FFCC00' }} />
            {isSidebarOpen && <span style={{ color: '#FFFFFF' }}>Overview</span>}
          </SidebarItem>
          <SidebarItem onClick={onTeamsClick}>
            <FaUsers style={{ marginRight: '10px', color: '#FFCC00' }} />
            {isSidebarOpen && <span style={{ color: '#FFFFFF' }}>Team</span>}
          </SidebarItem>

          {/* Conditionally render team members */}
          {isTeamExpanded && isSidebarOpen && (
            <div style={{ marginLeft: '20px' }}>
              <AddMember teamMembers={teamMembers} setTeamMembers={setTeamMembers} /> {/* Using AddMember component */}

              {/* List of team members */}
              {teamMembers.map((member, index) => (
                <TeamMemberItem key={index}>
                  <span style={{ color: '#CCCCCC' }}>{member}</span>
                </TeamMemberItem>
              ))}
            </div>
          )}

          <SidebarItem>
            <FaCog style={{ marginRight: '10px', color: '#FFCC00' }} />
            {isSidebarOpen && <span style={{ color: '#FFFFFF' }}>Settings</span>}
          </SidebarItem>
        </>
      ) : (
        <>
          <SidebarItem>
            <FaTachometerAlt style={{ marginRight: '10px', color: '#FFCC00' }} />
            {isSidebarOpen && <span style={{ color: '#FFFFFF' }}>Dashboard</span>}
          </SidebarItem>
          <SidebarItem>
            <FaUser style={{ marginRight: '10px', color: '#FFCC00' }} />
            {isSidebarOpen && <span style={{ color: '#FFFFFF' }}>Profile</span>}
          </SidebarItem>
          <SidebarItem>
            <FaCog style={{ marginRight: '10px', color: '#FFCC00' }} />
            {isSidebarOpen && <span style={{ color: '#FFFFFF' }}>Settings</span>}
          </SidebarItem>
        </>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
