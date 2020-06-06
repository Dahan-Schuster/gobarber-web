import React from 'react';

import Toast from './Toast';
import { Container } from './styles';
import { ToastMessage } from '../../hooks/toast';

interface ToastContainerProps {
	toastMessages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toastMessages }) => {
	return (
		<Container>
			{toastMessages.map((toast) => (
				<Toast key={toast.id} toastMessage={toast} />
			))}
		</Container>
	);
};

export default ToastContainer;
