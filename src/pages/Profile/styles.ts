import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	flex-direction: column;
`;

export const HeaderProfile = styled.header`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 144px;
	width: 100%;
	background-color: #28262e;

	> div {
		max-width: 1120px;
		width: 100%;
		min-height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		position: relative;

		> a {
			color: #999591;
			text-decoration: none;
			transition: opacity 0.2s;

			display: flex;
			align-items: center;

			svg {
				width: 24px;
				height: 24px;
			}

			&:hover {
				opacity: 0.6;
			}
		}
	}
`;

export const AvatarInput = styled.div`
	margin: -180px auto 32px;

	> div {
		position: relative;
		width: 186px;

		.img-avatar {
			width: 186px;
			height: 186px;
			border-radius: 50%;
		}

		.label-change-avatar {
			position: absolute;
			width: 48px;
			height: 48px;
			background-color: #ff9000;
			border: 0;
			border-radius: 50%;
			right: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			transition: background-color 0.2s;

			&:hover {
				background-color: ${shade(0.2, '#ff9000')};
			}

			> svg {
				width: 20px;
				height: 20px;
				color: #312e38;
			}

			input[type='file'] {
				display: none;
			}
		}
	}
`;

const appearFromBottom = keyframes`
	from {
		opacity: 0;
		transform: translateY(50px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
`;

export const AnimatedContainer = styled.div`
	display: flex;
	flex-direction: column;
	place-content: center;
	align-items: center;
	max-width: 1120px;

	animation: ${appearFromBottom} 0.5s;

	form {
		margin: 80px 0;
		width: 340px;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: stretch;

		h2 {
			text-align: left;
			margin-bottom: 24px;
		}

		.form-group {
			margin-bottom: 24px;
		}
	}
`;
