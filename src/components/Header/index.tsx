import React from 'react';
import { FiPower } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

import { Container, HeaderContent, Profile } from './styles';

import logoImg from '../../assets/logo.svg';
import defaultAvatar from '../../assets/default-avatar.svg';

const Header: React.FC = () => {
	const { signOut, user } = useAuth();

	return (
		<Container>
			<HeaderContent>
				<Link to="/dashboard">
					<img className="img-logo" src={logoImg} alt="GoBarber" />
				</Link>

				<Profile>
					<img
						src={user.avatarUrl || defaultAvatar}
						alt={user.name}
					/>
					<div>
						<span>Bem vindo,</span>
						<Link to="/me">
							<strong>{user.name}</strong>
						</Link>
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
