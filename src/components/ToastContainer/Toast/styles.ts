import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

const toastTypeVariations = {
	info: css`
		background: #ebf9ff;
		color: #3172b7;
	`,
	success: css`
		background: #ecffeb;
		color: #31b743;
	`,
	error: css`
		background: #ffebeb;
		color: #b73131;
	`,
};

interface ContainerProps {
	type?: 'info' | 'success' | 'error';
	hasDescription: number;
}

export const Container = styled(animated.div)<ContainerProps>`
	width: 360px;
	position: relative;
	padding: 16px 30px 16px 16px;
	border-radius: 10px;
	box-shadow: 2px 2px 8px rgb(0, 0, 0, 0.2);
	display: flex;

	+ div {
		margin-top: 8px;
	}

	${({ type }) => toastTypeVariations[type || 'info']}

	> svg {
		margin: 4px 12px 0 0;
	}

	div {
		flex: 1;

		p {
			margin-top: 4px;
			font-size: 14px;
			opacity: 0.8;
			line-height: 20px;
		}
	}

	button {
		position: absolute;
		top: 19px;
		right: 16px;
		opacity: 0.6;
		border: 0;
		background: transparent;
		color: inherit;
	}

	${({ hasDescription }) =>
		!hasDescription &&
		css`
			align-items: center;

			> svg {
				margin-top: 0;
			}
		`}
`;
