// Packages
import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
// Assets
import logoImg from '../../assets/logo.svg';
import { Container, Background, Content } from './styles';
// Components
import Input from '../../components/input';
import Button from '../../components/button';
import getValidationErros from '../../utils/getValidationErros';
// Hooks
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface FormData {
	email: string;
	password: string;
}

const SignIn: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const { signIn } = useAuth();
	const { addToast } = useToast();

	const handleSubmit = useCallback(
		async (data: FormData) => {
			try {
				formRef.current?.setErrors({});

				const schema = Yup.object().shape({
					email: Yup.string()
						.required('Informe seu email')
						.email('Email inválido'),
					password: Yup.string().required('Informe sua senha'),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				await signIn({
					email: data.email,
					password: data.password,
				});
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErros(err);
					formRef.current?.setErrors(errors);
				}

				addToast({
					type: 'error',
					title: 'Erro na autenticação',
					description: 'Email ou senha inválidos',
				});
			}
		},
		[signIn, addToast],
	);

	return (
		<Container>
			<Content>
				<img src={logoImg} alt="GoBarber" />
				<Form ref={formRef} onSubmit={handleSubmit}>
					<h1>Faça seu Logon</h1>

					<Input icon={FiMail} name="email" placeholder="E-mail" />
					<Input
						icon={FiLock}
						name="password"
						type="password"
						placeholder="Senha"
					/>

					<Button type="submit">Entrar</Button>

					<Link to="/forgot">Esqueci minha senha</Link>
				</Form>

				<Link to="/signup">
					<FiLogIn />
					Criar conta
				</Link>
			</Content>
			<Background />
		</Container>
	);
};

export default SignIn;
