import axios, { AxiosError } from 'axios';
import { STORAGE_TOKEN_KEY } from '../hooks/auth';
import { ToastMessage } from '../hooks/toast';
import StatusHTTP from './StatusHTTP';

export interface FriendlyError extends AxiosError {
	toastMessage: ToastMessage;
	signOut?: boolean;
}

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

// Intercepta respostas e adiciona uma objeto contendo respostas de erro amigáveis
api.interceptors.response.use(
	(response) => response,
	(error): Promise<FriendlyError> => {
		const toastMessage = {
			type: 'error',
			title: 'Oops!',
			description:
				'Não foi possível realizar a sua requisição. Tente novamente.',
		} as ToastMessage;

		const errorCode = error.response?.status;

		if (errorCode === StatusHTTP.TOO_MANY_REQUESTS) {
			toastMessage.title = 'Para que tanta pressa?';
			toastMessage.description =
				'Vai com calma! Nossos servidores agradecem 😉';
		} else if (errorCode === StatusHTTP.UNAUTHORIZED) {
			toastMessage.type = 'info';
			toastMessage.title = 'Vem sempre aqui?';
			toastMessage.description =
				'Parece que você ficou muito tempo longe. Que tal fazer login novamente?';

			error.signOut = true;
		} else if (errorCode === StatusHTTP.INTERNAL_SERVER_ERROR) {
			toastMessage.title = 'Eita!';
			toastMessage.description =
				'Nosso servidor está doente no momento. Vamos cuidar dele o mais rápido possível!';
		}

		error.toastMessage = toastMessage;
		return Promise.reject(error);
	},
);

export default api;
