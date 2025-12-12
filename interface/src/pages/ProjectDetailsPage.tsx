import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getProjectById,
  getProposalsByProjectId,
  createProposal,
  getProjectMessages,
  sendMessage,
  acceptProposal,
  getProposalsByFreelancerId,
  finishProject,
} from "../services/api";
import { useAuth } from "../hooks/useAuth";
import ProjectDetails from "../components/project/ProjectDetails";
import MessageSection from "../components/messages/MessageSection";
import ProposalForm from "../components/proposal/ProposalForm";
import ProposalList from "../components/proposal/ProposalList";
import { Project, Proposal, Message } from "../types";

const ProjectDetailsPage = () => {
  const params = useParams();
  const id = params.id || params.projectId;
  const { user } = useAuth();

  const [project, setProject] = useState<Project | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isParticipant, setIsParticipant] = useState(false);
  const [proposalError, setProposalError] = useState<string | null>(null);


  const fetchProposals = async () => {
    if (!id) return;
    const proposalsRes = await getProposalsByProjectId(id);
    setProposals(proposalsRes.data);
  };

  const fetchProjectData = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const projectRes = await getProjectById(id);
      const projectData = projectRes.data;
      setProject(projectData);

      if (user && projectData) {
        const isOwner = user.id === projectData.empresa_id;
        let isAcceptedFreelancer = false;

        if (user.tipo === "freelancer") {
          const myProposals = await getProposalsByFreelancerId(user.id);
          if (
            myProposals.data.some(
              (p: any) =>
                p.project_id === projectData.id && p.status === "aceita"
            )
          ) {
            isAcceptedFreelancer = true;
          }
        }

        if (isOwner || isAcceptedFreelancer) {
          setIsParticipant(true);
          const messagesRes = await getProjectMessages(id);
          setMessages(messagesRes.data);
        }

        if (isOwner) {
          await fetchProposals();
        }
      }
    } catch (err) {
      setError("Falha ao carregar os dados do projeto.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(id) {
        fetchProjectData();
    }
  }, [id, user]);

  const handleProposalSubmit = async (valor: number, descricao: string) => {
    setProposalError(null);
    if (!id) return;

    try {
      await createProposal({
        project_id: id,
        valor: valor,
        descricao: descricao,
      });
      alert("Proposta enviada com sucesso!");
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.errors) {
        const errorMsg = err.response.data.errors
          .map((e: any) => e.msg)
          .join(" ");
        setProposalError(errorMsg);
      } else {
        setProposalError("Falha ao enviar proposta. Tente novamente.");
      }
    }
  };

  const handleMessageSubmit = async (content: string, files: FileList | null) => {
    if (!id) return;
    try {
      await sendMessage({ project_id: id, content }, files);
      const messagesRes = await getProjectMessages(id);
      setMessages(messagesRes.data);
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  const handleAcceptProposal = async (proposalId: string) => {
    try {
      await acceptProposal(proposalId);
      await fetchProposals();
    } catch (error) {
      console.error("Failed to accept proposal", error);
    }
  };

  const handleFinishProject = async () => {
    if (!id) return;
    try {
      await finishProject(id);
      await fetchProjectData(); // Refresh project data
    } catch (error) {
      console.error("Failed to finish project", error);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!project) return <p>Projeto nao encontrado.</p>;

  const isProjectOwner = user?.id === project.empresa_id;

  return (
    <div>
      <ProjectDetails project={project} isProjectOwner={isProjectOwner} onFinishProject={handleFinishProject} />

      {isParticipant && user && (
        <MessageSection messages={messages} userId={user.id} onMessageSubmit={handleMessageSubmit} />
      )}

      <h3>Propostas</h3>
      {user?.tipo === "freelancer" && (
        <ProposalForm onProposalSubmit={handleProposalSubmit} error={proposalError} />
      )}

      {user && isProjectOwner && (
        <ProposalList proposals={proposals} onAcceptProposal={handleAcceptProposal} />
      )}
      
      {user && !isProjectOwner && user.tipo !== "freelancer" && (
        <p>Voce deve ser o dono do projeto para ver as propostas.</p>
      )}

      {!user && <p>Voce precisa estar logado para interagir com o projeto.</p>}
    </div>
  );
};

export default ProjectDetailsPage;