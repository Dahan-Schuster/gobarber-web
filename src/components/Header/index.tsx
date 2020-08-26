import React from 'react';
import { FiPower } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import { Container, HeaderContent, Profile } from './styles';

import logoImg from '../../assets/logo.svg';
import defaultAvatar from '../../assets/default-avatar.svg';

const Header: React.FC = () => {
	const { signOut, user } = useAuth();

	return (
		<Container>
			<HeaderContent>
				<img src={logoImg} alt="GoBarber" />

				<Profile>
					<img
						src={user.avatarUrl || defaultAvatar}
						alt={user.name}
					/>
					<div>
						<span>Bem vindo,</span>
						<strong>{user.name}</strong>
					</div>
				</Profile>

				<button onClick={signOut} type="button">
					<FiPower />
				</button>
			</HeaderContent>
		</Container>
	);
};

export default Header;
