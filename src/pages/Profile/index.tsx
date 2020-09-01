import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiLock, FiUser, FiCamera } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import defaultAvatar from '../../assets/default-avatar.svg';
import {
	Container,
	HeaderProfile,
	AnimatedContainer,
	AvatarInput,
} from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErros from '../../utils/getValidationErros';
import { useToast } from '../../hooks/toast';
import { useAuth, User } from '../../hooks/auth';
import api, { FriendlyError } from '../../services/api';

interface ProfileFormData {
	name: string;
	email: string;
	oldPassword: string;
	password: string;
	passwordConfirmation: string;
}

const Profile: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const { addToast } = useToast();
	const [loading, setLoading] = useState(false);
	const { user, signOut, updateUser } = useAuth();
	const history = useHistory();

	const handleSubmit = useCallback(
		async (data: ProfileFormData) => {
			if (loading) return;
			try {
				setLoading(true);

				formRef.current?.setErrors({});

				const schema = Yup.object().shape({
					name: Yup.string().required('Nome obrigatório'),
					email: Yup.string()
						.required('Email obrigatório')
						.email('Email inválido'),
					oldPassword: Yup.string(),
					password: Yup.string().when('oldPassword', {
						is: (val) => !!val.length,
						then: Yup.string().min(6, 'No mínimo 6 dígitos'),
						otherwise: Yup.string(),
					}),
					passwordConfirmation: Yup.string().when('oldPassword', {
						is: (val) => !!val.length,
						then: Yup.string()
							.required('Confirme a nova senha')
							.oneOf(
								[Yup.ref('password')],
								'As senhas não conferem',
							),
						otherwise: Yup.string(),
					}),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				const profileFormData = {
					name: data.name,
					email: data.email,
					...(!!data.oldPassword.length && {
						oldPassword: data.oldPassword,
						password: data.password,
						passwordConfirmation: data.passwordConfirmation,
					}),
				} as ProfileFormData;

				api.put<User>('/profile', profileFormData)
					.then((response) => {
						updateUser(response.data);

						history.push('/dashboard');

						addToast({
							type: 'success',
							title: 'Perfil atualizado com sucesso!',
						});
					})
					.catch((err: FriendlyError) => {
						err.signOut && signOut();
						addToast(err.toastMessage);
					});
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErros(err);
					formRef.current?.setErrors(errors);

					addToast({
						type: 'error',
						title: 'Erro ao cadastrar',
						description:
							'Você não preencheu corretamente os campos do formulário. ' +
							'Por favor, verifique os dados e tente novamente.',
					});
				}
			} finally {
				setLoading(false);
			}
		},
		[addToast, signOut, updateUser],
	);

	const handleAvatarChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			e.preventDefault();
			if (loading) return;
			setLoading(true);

			if (e.target.files) {
				const data = new FormData();
				data.append('avatar', e.target.files[0]);

				api.patch<User>('/users/avatar', data)
					.then((response) => {
						updateUser(response.data);

						addToast({
							type: 'success',
							title: 'Avatar atualizado!',
							description: 'Adorei a foto, muito chique!',
							duration: 6000,
						});
					})
					.catch((err: FriendlyError) => {
						err.signOut && signOut();
						addToast(err.toastMessage);
					})
					.finally(() => setLoading(false));
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[addToast, signOut, updateUser],
	);

	return (
		<Container>
			<HeaderProfile>
				<div>
					<Link to="/dashboard">
						<FiArrowLeft />
					</Link>
				</div>
			</HeaderProfile>
			<AnimatedContainer>
				<Form
					ref={formRef}
					onSubmit={handleSubmit}
					initialData={{
						name: user.name,
						email: user.email,
					}}
				>
					<AvatarInput>
						<div>
							<img
								className="img-avatar"
								src={user.avatarUrl || defaultAvatar}
								alt="Avatar"
							/>
							<label
								className="label-change-avatar"
								htmlFor="avatar"
							>
								<FiCamera />
								<input
									multiple={false}
									type="file"
									id="avatar"
									onChange={handleAvatarChange}
								/>
							</label>
						</div>
					</AvatarInput>

					<h2>Meu Perfil</h2>

					<div className="form-group">
						<Input icon={FiUser} name="name" placeholder="Nome" />
						<Input
							icon={FiMail}
							name="email"
							placeholder="E-mail"
						/>
					</div>
					<div className="form-group">
						<Input
							icon={FiLock}
							name="oldPassword"
							type="password"
							placeholder="Senha atual"
						/>
						<Input
							icon={FiLock}
							name="password"
							type="password"
							placeholder="Nova Senha"
						/>
						<Input
							icon={FiLock}
							name="passwordConfirmation"
							type="password"
							placeholder="Confirmar Senha"
						/>
					</div>

					<Button loading={loading} type="submit">
						Confirmar mudanças
					</Button>
				</Form>
			</AnimatedContainer>
		</Container>
	);
};

export default Profile;
