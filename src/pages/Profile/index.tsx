import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiLock, FiUser, FiCamera } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import defaultAvatar from '../../assets/default-avatar.svg';
import {
	Container,
	HeaderProfile,
	AnimatedContainer,
	AvatarInput,
} from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
	name: string;
	email: string;
	password: string;
}

const Profile: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const [loading] = useState(false);
	const { user } = useAuth();

	const handleSubmit = useCallback(async (data: ProfileFormData) => {
		console.log(data);
	}, []);

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
							<button className="btn-change-avatar" type="button">
								<FiCamera />
							</button>
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
