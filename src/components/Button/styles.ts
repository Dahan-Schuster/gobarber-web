import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
	button {
		color: #312e38;
		background: #ff9000;
		border-radius: 10px;
		height: 56px;
		border: 0;
		padding: 0 16px;
		width: 100%;
		font-weight: 500;
		margin-top: 16px;
		transition: background 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;

		&:hover {
			background: ${shade(0.2, '#ff9000')};
		}

		&:disabled {
			cursor: not-allowed;
			background-color: ${shade(0.2, '#ff9000')};
		}
	}
`;
