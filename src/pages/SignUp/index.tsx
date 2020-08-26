import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';
import { Container, Background, Content, AnimatedContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErros from '../../utils/getValidationErros';
import { useToast } from '../../hooks/toast';

import api from '../../services/api';

interface SignUpFormData {
	name: string;
	email: string;
	password: string;
}

const SignUp: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const { addToast } = useToast();
	const history = useHistory();
	const [loading, setLoading] = useState(false);

	const handleSubmit = useCallback(
		async (data: SignUpFormData) => {
			if (loading) return;
			try {
				setLoading(true);

				formRef.current?.setErrors({});

				const schema = Yup.object().shape({
					name: Yup.string().required('Nome obrigatório'),
					email: Yup.string()
						.required('Email obrigatório')
						.email('Email inválido'),
					password: Yup.string().min(6, 'No mínimo 6 dígitos'),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				await api.post('/users', data);

				history.push('/');

				addToast({
					type: 'success',
					title: 'Cadastro realizado com sucesso',
					description: 'Você já pode fazer seu logon',
				});
			} catch (err) {
				let toastDescription =
					'Ocorreu um erro ao tentar realizar o cadastro. ' +
					'Por favor, tente novamente.';

				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErros(err);
					formRef.current?.setErrors(errors);

					toastDescription =
						'Você não preencheu corretamente os campos do formulário. ' +
						'Por favor, verifique os dados e tente novamente.';
				}

				addToast({
					type: 'error',
					title: 'Erro ao cadastrar',
					description: toastDescription,
					duration: 5000,
				});
			} finally {
				setLoading(false);
			}
		},
		[addToast, history, loading],
	);

	return (
		<Container>
			<Background />
			<Content>
				<AnimatedContainer>
					<img src={logoImg} alt="GoBarber" />
					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Faça seu cadastro</h1>

						<Input icon={FiUser} name="name" placeholder="Nome" />
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
							Cadastrar
						</Button>
					</Form>

					<Link to="/">
						<FiArrowLeft />
						Voltar para o Logon
					</Link>
				</AnimatedContainer>
			</Content>
		</Container>
	);
};

export default SignUp;
