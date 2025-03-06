import React from 'react';
import { SidebarContainer, SidebarItem, TeamMemberItem } from './styles';
import { FaProjectDiagram, FaUsers, FaChartLine, FaCog, FaTachometerAlt, FaUser, FaEnvelope, FaCalendarAlt, FaBell, FaQuestionCircle, FaChartBar } from 'react-icons/fa';

const Sidebar = ({ isSidebarOpen, isProjectPage, onTeamsClick, teamMembers, isTeamExpanded  }) => {
  return (
    <SidebarContainer isSidebarOpen={isSidebarOpen}>
      {isProjectPage ? (
        // Simplified sidebar for ProjectDetailsPage
        <>
          <SidebarItem>
            <FaProjectDiagram style={{ marginRight: '10px' }} /> {isSidebarOpen && 'Overview'}
          </SidebarItem>
          <SidebarItem onClick={onTeamsClick}> {/* Add onClick handler */}
            <FaUsers style={{ marginRight: '10px' }} /> {isSidebarOpen && 'Team'}
          </SidebarItem>
          {/* Conditionally render team members */}
          {isTeamExpanded && isSidebarOpen && (
            <div style={{ marginLeft: '20px' }}>
              {teamMembers.map((member, index) => (
                <TeamMemberItem key={index}>
                  {member}
                </TeamMemberItem>
              ))}
            </div>
          )}
          <SidebarItem>
            <FaCog style={{ marginRight: '10px' }} /> {isSidebarOpen && 'Settings'}
          </SidebarItem>
        </>
      ) : (
        // Full sidebar for the homepage
        <>
          <SidebarItem>
            <FaTachometerAlt style={{ marginRight: '10px' }} /> {isSidebarOpen && 'Dashboard'}
          </SidebarItem>
          <SidebarItem>
            <FaUser style={{ marginRight: '10px' }} /> {isSidebarOpen && 'Profile'}
          </SidebarItem>
          <SidebarItem>
            <FaBell style={{ marginRight: '10px' }} /> {isSidebarOpen && 'Notifications'}
          </SidebarItem>
          <SidebarItem>
            <FaCog style={{ marginRight: '10px' }} /> {isSidebarOpen && 'Settings'}
          </SidebarItem>
          <SidebarItem>
            <FaQuestionCircle style={{ marginRight: '10px' }} /> {isSidebarOpen && 'Help'}
          </SidebarItem>
        </>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;