import React, { useState } from 'react';

interface Message {
  id: number;
  conteudo: string;
  remetente_id: number;
}

interface MessageSectionProps {
  messages: Message[];
  userId: number;
  onMessageSubmit: (content: string, files: FileList | null) => void;
}

const MessageSection: React.FC<MessageSectionProps> = ({ messages, userId, onMessageSubmit }) => {
  const [messageContent, setMessageContent] = useState("");
  const [attachments, setAttachments] = useState<FileList | null>(null);
  const [messageError, setMessageError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageContent && (!attachments || attachments.length === 0)) {
        setMessageError("A mensagem precisa de conteúdo ou anexos.");
        return;
    }
    onMessageSubmit(messageContent, attachments);
    setMessageContent("");
    setAttachments(null);
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    if(fileInput) fileInput.value = '';
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h3>Mensagens do Projeto</h3>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          height: "300px",
          overflowY: "scroll",
          marginBottom: "1rem",
        }}
      >
        {messages.map((msg) => (
          <div key={msg.id}>
            <b>{msg.remetente_id === userId ? "Você" : "Outro"}: </b>
            <span>{msg.conteudo}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        {messageError && <p style={{ color: "red" }}>{messageError}</p>}
        <input
          type="text"
          placeholder="Digite sua mensagem"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
        <input
          id="file-input"
          type="file"
          multiple
          onChange={(e) => setAttachments(e.target.files)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default MessageSection;
