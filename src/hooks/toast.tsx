import React, { createContext, useCallback, useContext, useState } from 'react';
import { uuid } from 'uuidv4';
import ToastContainer from '../components/ToastContainer';

export interface ToastMessage {
	id: string;
	type?: 'success' | 'error' | 'info';
	title: string;
	description?: string;
}

interface ToastContextData {
	addToast(message: Omit<ToastMessage, 'id'>): void;
	removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
	const [messages, setMessages] = useState<ToastMessage[]>([]);

	const addToast = useCallback(({ title, type, description }: Omit<ToastMessage, 'id'>) => {
		const id = uuid();

		const toastMessage = {
			id,
			title,
			type,
			description,
		};

		setMessages((oldMessages) => [...oldMessages, toastMessage]);
	}, []);
	const removeToast = useCallback((id: string) => {
		setMessages((oldMessages) => oldMessages.filter((toast) => toast.id !== id));
	}, []);

	return (
		<ToastContext.Provider value={{ addToast, removeToast }}>
			{children}
			<ToastContainer toastMessages={messages} />
		</ToastContext.Provider>
	);
};

export function useToast(): ToastContextData {
	const context = useContext(ToastContext);

	if (!context) throw new Error('useToast must be used within a ToastProvider');

	return context;
}