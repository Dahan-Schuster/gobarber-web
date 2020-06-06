import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/all';

import { Container, Toast } from './styles';

const ToastContainer: React.FC = () => {
	return (
		<Container>
			<Toast hasDescription>
				<FiAlertCircle size={20} />
				<div>
					<strong>Ocorreu um erro</strong>
					<p>Não foi possível realizar a requisição</p>
				</div>

				<button type="button">
					<FiXCircle size={18} />
				</button>
			</Toast>
			<Toast hasDescription={false} type="success">
				<FiAlertCircle size={20} />
				<div>
					<strong>Ocorreu um erro</strong>
				</div>

				<button type="button">
					<FiXCircle size={18} />
				</button>
			</Toast>
			<Toast hasDescription type="error">
				<FiAlertCircle size={20} />
				<div>
					<strong>Ocorreu um erro</strong>
					<p>Não foi possível realizar a requisição</p>
				</div>

				<button type="button">
					<FiXCircle size={18} />
				</button>
			</Toast>
		</Container>
	);
};

export default ToastContainer;
