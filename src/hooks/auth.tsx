import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface SigninCredentials {
	email: string;
	password: string;
}

interface AuthContextData {
	user: object;
	signIn(credentials: SigninCredentials): Promise<void>;
	signOut(): void;
}

interface AuthData {
	token: string;
	user: object;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
	const [authData, setAuthData] = useState<AuthData>(() => {
		const token = localStorage.getItem('@GoBarber:token');
		const user = localStorage.getItem('@GoBarber:user');

		const data = {} as AuthData;
		if (token && user) {
			data.token = token;
			data.user = JSON.parse(user);
		}

		return data;
	});

	const signIn = useCallback(async ({ email, password }) => {
		const response = await api.post<AuthData>('/sessions', {
			email,
			password,
		});

		const { token, user } = response.data;
		localStorage.setItem('@GoBarber:token', token);
		localStorage.setItem('@GoBarber:user', JSON.stringify(user));

		setAuthData({ token, user });
	}, []);

	const signOut = useCallback(() => {
		localStorage.removeItem('@GoBarber:token');
		localStorage.removeItem('@GoBarber:user');

		setAuthData({} as AuthData);
	}, []);

	return (
		<AuthContext.Provider value={{ user: authData.user, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth(): AuthContextData {
	const context = useContext(AuthContext);

	if (!context)
		throw new Error(
			'useAuth must be used within an AuthProvider component.',
		);

	return context;
}
