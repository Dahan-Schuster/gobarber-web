import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/all';

import { Container, Toast } from './styles';
import { ToastMessage, useToast } from '../../hooks/toast';

interface ToastContainerProps {
	toastMessages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toastMessages }) => {
	const { removeToast } = useToast();

	return (
		<Container>
			{toastMessages.map((toast) => (
				<Toast key={toast.id} hasDescription={!!toast.description} type={toast.type}>
					<FiAlertCircle size={20} />
					<div>
						<strong>{toast.title}</strong>
						{toast.description && <p>{toast.description}</p>}
					</div>

					<button onClick={() => removeToast(toast.id)} type="button">
						<FiXCircle size={18} />
					</button>
				</Toast>
			))}
		</Container>
	);
};

export default ToastContainer;
