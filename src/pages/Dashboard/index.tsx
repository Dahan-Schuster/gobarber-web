import React, { useCallback, useState } from 'react';
import { FiClock } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

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

	const handleDateChange = useCallback((day, modifiers: DayModifiers) => {
		if (modifiers.available) {
			setSelectedDate(day);
		}
	}, []);

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
				<Calendar>
					<DayPicker
						weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
						fromMonth={new Date()}
						disabledDays={[{ daysOfWeek: [0, 6] }]}
						modifiers={{
							available: { daysOfWeek: [1, 2, 3, 4, 5] },
						}}
						selectedDays={selectedDate}
						onDayClick={handleDateChange}
						months={[
							'Janeiro',
							'Fevereiro',
							'Março',
							'Abril',
							'Maio',
							'Junho',
							'Julho',
							'Agosto',
							'Setembro',
							'Outubro',
							'Novembro',
							'Dezembro',
						]}
					/>
				</Calendar>
			</Content>
		</Container>
	);
};

export default Dashboard;
