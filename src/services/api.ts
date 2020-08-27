import axios from 'axios';
import { STORAGE_TOKEN_KEY } from '../hooks/auth';

const api = axios.create({
	baseURL: 'http://localhost:3333',
});

// Intercepta as requisições e adiciona o token de autenticação
// caso o usuário esteja autenticado
api.interceptors.request.use(async (config) => {
	const token = localStorage.getItem(STORAGE_TOKEN_KEY);

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

export default api;
