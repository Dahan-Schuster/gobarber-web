import React, { useEffect } from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/all';
import { Container } from './styles';
import { ToastMessage, useToast } from '../../../hooks/toast';

interface ToastProps {
	toastMessage: ToastMessage;
}

const icons = {
	info: <FiInfo size={24} />,
	success: <FiCheckCircle size={24} />,
	error: <FiAlertCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ toastMessage }) => {
	const { removeToast } = useToast();

	useEffect(() => {
		const timer = setTimeout(() => {
			removeToast(toastMessage.id);
		}, 3000);

		return () => clearTimeout(timer);
	}, [toastMessage.id, removeToast]);

	return (
		<Container type={toastMessage.type} hasDescription={!!toastMessage.description}>
			{icons[toastMessage.type || 'info']}
			<div>
				<strong>{toastMessage.title}</strong>
				{toastMessage.description && <p>{toastMessage.description}</p>}
			</div>

			<button onClick={() => removeToast(toastMessage.id)} type="button">
				<FiXCircle size={18} />
			</button>
		</Container>
	);
};

export default Toast;
