// Packages
import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
// Assets
import logoImg from '../../assets/logo.svg';
import { Container, Background, Content, AnimatedContainer } from './styles';
// Components
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErros from '../../utils/getValidationErros';
// Hooks
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface SignInFormData {
	email: string;
	password: string;
}

const SignIn: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const { signIn } = useAuth();
	const { addToast } = useToast();
	const [loading, setLoading] = useState(false);

	const handleSubmit = useCallback(
		async (data: SignInFormData) => {
			if (loading) return;
			try {
				setLoading(true);

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

				await signIn(data);
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
			} finally {
				setLoading(false);
			}
		},
		[signIn, addToast, loading],
	);

	return (
		<Container>
			<Content>
				<AnimatedContainer>
					<img src={logoImg} alt="GoBarber" />
					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Faça seu Logon</h1>

						<Input
							icon={FiMail}
							name="email"
							placeholder="E-mail"
						/>
						<Input
							icon={FiLock}
							name="password"
							type="password"
							placeholder="Senha"
						/>

						<Button loading={loading} type="submit">
							Entrar
						</Button>

						<Link to="/forgot-password">Esqueci minha senha</Link>
					</Form>

					<Link to="/signup">
						<FiLogIn />
						Criar conta
					</Link>
				</AnimatedContainer>
			</Content>
			<Background />
		</Container>
	);
};

export default SignIn;
