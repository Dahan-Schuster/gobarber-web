import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.main`
	max-width: 1120px;
	margin: 64px auto;
	display: flex;
`;

export const Schedule = styled.section`
	flex: 1;
	margin-right: 120px;

	h1 {
		font-size: 36px;
	}
	p {
		margin-top: 8px;
		color: #ff9000;
		font-weight: 500;

		span {
			position: relative;
		}

		span + span {
			padding-left: 8px;
			margin-left: 8px;

			&::before {
				content: '';
				position: absolute;
				left: -1px;
				top: 50%;
				transform: translateY(-50%);
				width: 1px;
				height: 80%;
				background: #ff9000;
			}
		}
	}
`;

export const NextAppointment = styled.div`
	margin-top: 64px;

	strong {
		color: #999591;
		font-size: 20px;
		font-weight: 400;
	}

	div {
		background: #3e3b47;
		display: flex;
		align-items: center;
		padding: 16px 24px;
		border-radius: 10px;
		margin-top: 24px;
		position: relative;

		img {
			height: 80px;
			width: 80px;
			border-radius: 50%;
		}

		strong {
			margin-left: 24px;
			font-size: 24px;
			font-weight: 500;
			color: #fff;
			flex: 1;
		}

		span {
			display: flex;
			align-items: center;
			font-size: 20px;
			line-height: 26px;
			color: #999591;

			svg {
				color: #ff9000;
				width: 24px;
				height: 24px;
				margin-right: 12px;
			}
		}

		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			width: 2px;
			height: 75%;
			border-radius: 0 10px 10px 0;
			background-color: #ff9000;
		}
	}
`;

export const Section = styled.section`
	margin-top: 48px;

	> strong {
		color: #999591;
		font-size: 20px;
		line-height: 26px;
		border-bottom: 1px solid #3e3b47;
		display: block;
		padding-bottom: 16px;
		margin-bottom: 16px;
	}
`;

export const Appointment = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 16px;

	span {
		display: flex;
		align-items: center;
		font-size: 20px;
		line-height: 26px;
		color: #f4ede8;

		svg {
			color: #ff9000;
			width: 24px;
			height: 24px;
			margin-right: 12px;
		}
	}

	div {
		background: #3e3b47;
		display: flex;
		align-items: center;
		padding: 16px 24px;
		border-radius: 10px;
		margin-left: 24px;
		flex: 1;

		img {
			height: 56px;
			width: 56px;
			border-radius: 50%;
		}

		strong {
			margin-left: 24px;
			font-size: 20px;
			font-weight: 500;
			color: #fff;
			flex: 1;
		}
	}
`;

export const Calendar = styled.aside`
	width: 380px;
`;
