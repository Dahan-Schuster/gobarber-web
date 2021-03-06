import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
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

interface AppointmentItem {
	id: string;
	date: string;
	hourFormatted: string;
	user: {
		name: string;
		avatarUrl: string;
	};
}

const Dashboard: React.FC = () => {
	const { user, signOut } = useAuth();
	const { addToast } = useToast();

	const [selectedDate, setSelectedDate] = useState(new Date());
	const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [monthAvailability, setMonthAvailability] = useState<
		MonthAvailabilityItem[]
	>([]);

	const [loading, setLoading] = useState(false);

	const handleDateChange = useCallback((day, modifiers: DayModifiers) => {
		if (modifiers.available && !modifiers.disabled) {
			setSelectedDate(day);
		}
	}, []);

	const handleMonthChange = useCallback((month: Date) => {
		setCurrentMonth(month);
	}, []);

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
				err.signOut && signOut();
				addToast(err.toastMessage);
			})
			.finally(() => setLoading(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [addToast, currentMonth, signOut, user.id]);

	useEffect(() => {
		if (loading) return;
		setLoading(true);

		api.get<AppointmentItem[]>('/appointments/me', {
			params: {
				year: selectedDate.getFullYear(),
				month: selectedDate.getMonth() + 1,
				day: selectedDate.getDate(),
			},
		})
			.then((response) => {
				const appointmentsFormatted = response.data.map(
					(appointment) => ({
						...appointment,
						hourFormatted: format(
							parseISO(appointment.date),
							'HH:mm',
						),
					}),
				);
				setAppointments(appointmentsFormatted);
			})
			.catch((err: FriendlyError) => {
				err.signOut && signOut();
				addToast(err.toastMessage);
			})
			.finally(() => setLoading(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [addToast, selectedDate, signOut]);

	const morningAppointments = useMemo(() => {
		return appointments.filter((appointment) => {
			return parseISO(appointment.date).getHours() < 12;
		});
	}, [appointments]);

	const afternoonAppointments = useMemo(() => {
		return appointments.filter((appointment) => {
			return parseISO(appointment.date).getHours() >= 12;
		});
	}, [appointments]);

	const nextAppointment = useMemo(() => {
		return appointments.find((appointment) => {
			return isAfter(parseISO(appointment.date), new Date());
		});
	}, [appointments]);

	const disabledDays = useMemo(() => {
		return monthAvailability
			.filter((month) => !month.available)
			.map(({ day }) => {
				const year = currentMonth.getFullYear();
				const month = currentMonth.getMonth();

				return new Date(year, month, day);
			});
	}, [currentMonth, monthAvailability]);

	const selectedDateAsText = useMemo(() => {
		return format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBR });
	}, [selectedDate]);

	const selectedWeekDayAsText = useMemo(() => {
		return format(selectedDate, 'cccc', { locale: ptBR });
	}, [selectedDate]);

	return (
		<Container>
			<Header />

			<Content>
				<Schedule>
					<h1>Horários agendados</h1>
					<p>
						{isToday(selectedDate) && <span>Hoje</span>}
						<span>{selectedDateAsText}</span>
						<span>{selectedWeekDayAsText}</span>
					</p>
					{isToday(selectedDate) && nextAppointment && (
						<NextAppointment>
							<strong>Atendimento a seguir</strong>
							<div>
								<img
									src={
										nextAppointment.user.avatarUrl ||
										defaultAvatar
									}
									alt={nextAppointment.user.name}
								/>

								<strong>{nextAppointment.user.name}</strong>
								<span>
									<FiClock />
									{nextAppointment.hourFormatted}
								</span>
							</div>
						</NextAppointment>
					)}

					<Section>
						<strong>Manhã</strong>
						{morningAppointments.length === 0 && (
							<p>Nenhum agendamento neste período</p>
						)}
						{morningAppointments.map((appointment) => (
							<Appointment key={appointment.id}>
								<span>
									<FiClock />
									{appointment.hourFormatted}
								</span>
								<div>
									<img
										src={
											appointment.user.avatarUrl ||
											defaultAvatar
										}
										alt={appointment.user.name}
									/>
									<strong>{appointment.user.name}</strong>
								</div>
							</Appointment>
						))}
					</Section>

					<Section>
						<strong>Tarde</strong>
						{afternoonAppointments.length === 0 && (
							<p>Nenhum agendamento neste período</p>
						)}
						{afternoonAppointments.map((appointment) => (
							<Appointment key={appointment.id}>
								<span>
									<FiClock />
									{appointment.hourFormatted}
								</span>
								<div>
									<img
										src={
											appointment.user.avatarUrl ||
											defaultAvatar
										}
										alt={appointment.user.name}
									/>
									<strong>{appointment.user.name}</strong>
								</div>
							</Appointment>
						))}
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
