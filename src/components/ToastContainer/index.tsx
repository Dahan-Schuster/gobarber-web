import React from 'react';
import { useTransition } from 'react-spring';

import Toast from './Toast';
import { Container } from './styles';
import { ToastMessage } from '../../hooks/toast';

interface ToastContainerProps {
	toastMessages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toastMessages }) => {
	const toastMessagesWithTransitions = useTransition(
		toastMessages,
		(toast) => toast.id,
		{
			from: { right: '-120%', opacity: 0 },
			enter: { right: '0%', opacity: 1 },
			leave: { right: '-120%', opacity: 0 },
		},
	);

	return (
		<Container>
			{toastMessagesWithTransitions.map(({ item, key, props }) => (
				<Toast key={key} toastMessage={item} style={props} />
			))}
		</Container>
	);
};

export default ToastContainer;
