import React, { createContext, useCallback, useState } from 'react';
import api from '../services/api';

interface SigninCredentials {
	email: string;
	password: string;
}

interface AuthContextInterface {
	user: object;
	signIn(credentials: SigninCredentials): Promise<void>;
}

interface AuthData {
	token: string;
	user: object;
}

export const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

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

	return <AuthContext.Provider value={{ user: authData.user, signIn }}>{children}</AuthContext.Provider>;
};
