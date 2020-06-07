import React, { useEffect } from 'react';
import {
	FiAlertCircle,
	FiCheckCircle,
	FiInfo,
	FiXCircle,
} from 'react-icons/all';
import { Container } from './styles';
import { ToastMessage, useToast } from '../../../hooks/toast';

interface ToastProps {
	toastMessage: ToastMessage;
	style: object;
}

const icons = {
	info: <FiInfo size={24} />,
	success: <FiCheckCircle size={24} />,
	error: <FiAlertCircle size={24} />,
};

const DEFAULT_DURATION = 3000;

const Toast: React.FC<ToastProps> = ({ toastMessage, style }) => {
	const { removeToast } = useToast();

	useEffect(() => {
		const timer = setTimeout(() => {
			removeToast(toastMessage.id);
		}, toastMessage.duration || DEFAULT_DURATION);

		return () => clearTimeout(timer);
	}, [toastMessage.id, toastMessage.duration, removeToast]);

	return (
		<Container
			style={style}
			type={toastMessage.type}
			hasDescription={!!toastMessage.description}
		>
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
