import React, { useState } from 'react';
import { FiClock } from 'react-icons/fi';

import {
	Container,
	Content,
	Schedule,
	NextAppointment,
	Section,
	Appointment,
	Calendar,
} from './styles';

import Header from '../../components/Header';

import defaultAvatar from '../../assets/default-avatar.svg';

const Dashboard: React.FC = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());

	return (
		<Container>
			<Header />

			<Content>
				<Schedule>
					<h1>Horários agendados</h1>
					<p>
						<span>Hoje</span>
						<span>Dia 06</span>
						<span>Segunda Feira </span>
					</p>

					<NextAppointment>
						<strong>Atendimento a seguir</strong>
						<div>
							<img src={defaultAvatar} alt="Avatar" />

							<strong>Dahan Schuster</strong>
							<span>
								<FiClock />
								08:00
							</span>
						</div>
					</NextAppointment>

					<Section>
						<strong>Manhã</strong>
						<Appointment>
							<span>
								<FiClock />
								08:00
							</span>

							<div>
								<img src={defaultAvatar} alt="Avatar" />

								<strong>Dahan Schuster</strong>
							</div>
						</Appointment>
						<Appointment>
							<span>
								<FiClock />
								10:00
							</span>

							<div>
								<img src={defaultAvatar} alt="Avatar" />

								<strong>Dahan Schuster</strong>
							</div>
						</Appointment>
					</Section>

					<Section>
						<strong>Tarde</strong>
						<Appointment>
							<span>
								<FiClock />
								13:00
							</span>

							<div>
								<img src={defaultAvatar} alt="Avatar" />

								<strong>Dahan Schuster</strong>
							</div>
						</Appointment>
						<Appointment>
							<span>
								<FiClock />
								16:00
							</span>

							<div>
								<img src={defaultAvatar} alt="Avatar" />

								<strong>Dahan Schuster</strong>
							</div>
						</Appointment>
					</Section>
				</Schedule>
				<Calendar />
			</Content>
		</Container>
	);
};

export default Dashboard;
