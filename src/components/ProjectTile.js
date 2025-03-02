import React from "react";
import { TileContainer, ProjectTitle, ProjectDescription, ProjectStatus, ProjectMembers } from "./styles";

const ProjectTile = ({ project, onClick }) => {
  return (
    <TileContainer onClick={onClick} style={{ cursor: "pointer" }}>
      <ProjectTitle>{project.name}</ProjectTitle>
      <ProjectDescription>{project.description}</ProjectDescription>
      <ProjectMembers>Team: {project.members.join(", ")}</ProjectMembers>
      <ProjectStatus status={project.status || "Not Started"}>
        Status: {project.status || "Not Started"}
      </ProjectStatus>
    </TileContainer>
  );
};

export default ProjectTile;
