import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiClock } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import api, { FriendlyError } from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import {
	Appointment,
	Calendar,
	Container,
	Content,
	NextAppointment,
	Schedule,
	Section,
} from './styles';

import Header from '../../components/Header';

import defaultAvatar from '../../assets/default-avatar.svg';

interface MonthAvailabilityItem {
	day: number;
	available: boolean;
}

const Dashboard: React.FC = () => {
	const { user } = useAuth();
	const { addToast } = useToast();

	const [selectedDate, setSelectedDate] = useState(new Date());
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [monthAvailability, setMonthAvailability] = useState<
		MonthAvailabilityItem[]
	>([]);

	const [loading, setLoading] = useState(false);

	const handleDateChange = useCallback((day, modifiers: DayModifiers) => {
		if (modifiers.available) {
			setSelectedDate(day);
		}
	}, []);

	const handleMonthChange = useCallback((month: Date) => {
		setCurrentMonth(month);
	}, []);

	const disabledDays = useMemo(() => {
		return monthAvailability
			.filter((month) => !month.available)
			.map(({ day }) => {
				const year = currentMonth.getFullYear();
				const month = currentMonth.getMonth();

				return new Date(year, month, day);
			});
	}, [currentMonth, monthAvailability]);

	useEffect(() => {
		if (loading) return;
		setLoading(true);

		api.get<MonthAvailabilityItem[]>(
			`/providers/${user.id}/month-availability`,
			{
				params: {
					year: currentMonth.getFullYear(),
					month: currentMonth.getMonth() + 1,
				},
			},
		)
			.then((response) => {
				setMonthAvailability(response.data);
			})
			.catch((err: FriendlyError) => {
				addToast(err.toastMessage);
			})
			.finally(() => setLoading(false));
	}, [addToast, currentMonth, user.id]);

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
						disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
						modifiers={{
							available: { daysOfWeek: [1, 2, 3, 4, 5] },
						}}
						selectedDays={selectedDate}
						onDayClick={handleDateChange}
						onMonthChange={handleMonthChange}
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
