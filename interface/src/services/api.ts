import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // O backend está rodando na porta 3001

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = (userData: any) => {
  return api.post('/auth/register', userData);
};

export const loginUser = (credentials: any) => {
  return api.post('/auth/login', credentials);
};

export const getProjects = () => {
  return api.get('/projects');
};

export const getProjectById = (id: string) => {
  return api.get(`/projects/${id}`);
};

export const getProposalsByProjectId = (projectId: string) => {
  return api.get(`/proposals/project/${projectId}`);
};

export const createProposal = (proposalData: any) => {
  return api.post('/proposals', proposalData);
};

export const getMyProjects = () => {
  return api.get('/projects/my');
};

export const getProposalsByFreelancerId = (freelancerId: string) => {
  return api.get(`/proposals/freelancer/${freelancerId}`);
};

export const getProjectMessages = (projectId: string) => {
  return api.get(`/messages/project/${projectId}`);
};

export const sendMessage = (messageData: { content: string, project_id: string }, files?: FileList) => {
  if (files && files.length > 0) {
    const formData = new FormData();
    formData.append('content', messageData.content);
    formData.append('project_id', messageData.project_id);
    for (let i = 0; i < files.length; i++) {
      formData.append('attachments', files[i]);
    }
    return api.post('/messages', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } else {
    return api.post('/messages', messageData);
  }
};

export const updateProposalStatus = (proposalId: string, status: string) => {
  return api.patch(`/proposals/${proposalId}/status`, { status });
};

export const acceptProposal = (proposalId: string) => {
  return api.post(`/proposals/${proposalId}/accept`);
};

export const getMyContracts = () => {
  return api.get('/contracts/my');
};

export const createReview = (reviewData: any) => {
  return api.post('/reviews', reviewData);
};

export const createProject = (projectData: any) => {
  return api.post('/projects', projectData);
};

export const finishProject = (projectId: string) => {
  return api.post(`/projects/${projectId}/finish`);
};

