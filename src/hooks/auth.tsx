import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface SigninCredentials {
	email: string;
	password: string;
}

interface User {
	id: string;
	avatarUrl: string;
	name: string;
}

interface AuthData {
	token: string;
	user: User;
}

interface AuthContextData {
	user: User;
	signIn(credentials: SigninCredentials): Promise<void>;
	signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const STORAGE_TOKEN_KEY = '@GoBarber:token';
export const STORAGE_USER_KEY = '@GoBarber:user';

export const AuthProvider: React.FC = ({ children }) => {
	const [authData, setAuthData] = useState<AuthData>(() => {
		const token = localStorage.getItem(STORAGE_TOKEN_KEY);
		const user = localStorage.getItem(STORAGE_USER_KEY);

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
		localStorage.setItem(STORAGE_TOKEN_KEY, token);
		localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));

		setAuthData({ token, user });
	}, []);

	const signOut = useCallback(() => {
		localStorage.removeItem(STORAGE_TOKEN_KEY);
		localStorage.removeItem(STORAGE_USER_KEY);

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
