import React from 'react';

interface Project {
  titulo: string;
  descricao: string;
  orcamento: number;
  status: string;
}

interface ProjectDetailsProps {
  project: Project;
  isProjectOwner: boolean;
  onFinishProject: () => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, isProjectOwner, onFinishProject }) => {
  return (
    <div>
      <h2>{project.titulo}</h2>
      <p>{project.descricao}</p>
      <p>
        <b>Orcamento:</b> R${project.orcamento}
      </p>
      <p>
        <b>Status:</b> {project.status}
      </p>
      {isProjectOwner && project.status === "em andamento" && (
        <button
          onClick={onFinishProject}
          style={{ background: "green", color: "white", marginBottom: "1rem" }}
        >
          Finalizar Projeto
        </button>
      )}
      <hr />
    </div>
  );
};

export default ProjectDetails;
