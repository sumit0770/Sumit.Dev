import axios from 'axios';
import type { ApiResponse, Experience, OpenSourceContribution, Project, SkillCategory } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

export const portfolioApi = {
  getProjects: async () => {
    const response = await api.get<ApiResponse<Project[]>>('/projects');
    return response.data.data;
  },
  getSkills: async () => {
    const response = await api.get<ApiResponse<SkillCategory[]>>('/skills');
    return response.data.data;
  },
  getOpenSource: async () => {
    const response = await api.get<ApiResponse<OpenSourceContribution[]>>('/opensource');
    return response.data.data;
  },
  getExperience: async () => {
    const response = await api.get<ApiResponse<Experience[]>>('/experience');
    return response.data.data;
  },
  sendMessage: async (payload: { name: string; email: string; message: string }) => {
    return api.post('/contact', payload);
  },
};
