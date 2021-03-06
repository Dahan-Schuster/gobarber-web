import styled from 'styled-components';

export const Container = styled.div`
	position: relative;

	&:hover span {
		opacity: 1;
		visibility: visible;
	}

	span {
		background: #ff9000;
		color: #312e38;
		width: 160px;
		padding: 8px;
		border-radius: 4px;
		font-size: 14px;
		font-weight: 500;
		transition: opacity 0.4s;
		opacity: 0;
		visibility: hidden;

		position: absolute;
		bottom: calc(100% + 12px);
		left: 50%;
		transform: translateX(-50%);

		&:before {
			content: '';
			border-style: solid;
			border-color: #ff9000 transparent;
			border-width: 6px 6px 0 6px;
			position: absolute;
			top: 100%;
			left: 50%;
			transform: translateX(-50%);
		}
	}
`;
