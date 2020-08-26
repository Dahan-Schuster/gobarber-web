import React, { ButtonHTMLAttributes } from 'react';
import ReactLoading from 'react-loading';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
	<Container>
		<button disabled={!!loading} type="button" {...rest}>
			{loading ? <ReactLoading type="bubbles" color="#000" /> : children}
		</button>
	</Container>
);

export default Button;
