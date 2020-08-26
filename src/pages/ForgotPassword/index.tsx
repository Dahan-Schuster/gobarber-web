import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
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

interface ForgotPasswordFormData {
	name: string;
	email: string;
	password: string;
}

const ForgotPassword: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const { addToast } = useToast();
	const [loading, setLoading] = useState(false);

	const handleSubmit = useCallback(
		async (data: ForgotPasswordFormData) => {
			if (loading) return;
			try {
				setLoading(true);

				formRef.current?.setErrors({});

				const schema = Yup.object().shape({
					email: Yup.string()
						.required('Email obrigatório')
						.email('Email inválido'),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				await api.post('/passwords/forgot', {
					email: data.email,
				});

				addToast({
					type: 'success',
					title: 'Isso aí!',
					description:
						`E-mail de recuperação de senha enviado com sucesso para ${data.email}. Cheque sua` +
						` caixa de email ou spam.`,
				});
			} catch (err) {
				let toastDescription =
					'Ocorreu um erro ao tentar enviar o e-mail. ' +
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
					title: 'Erro ao enviar e-mail de recuperação de senha',
					description: toastDescription,
					duration: 5000,
				});
			} finally {
				setLoading(false);
			}
		},
		[addToast, loading],
	);

	return (
		<Container>
			<Background />
			<Content>
				<AnimatedContainer>
					<img src={logoImg} alt="GoBarber" />
					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Recuperar senha</h1>

						<Input
							icon={FiMail}
							name="email"
							placeholder="E-mail"
						/>

						<Button loading={loading} type="submit">
							Recuperar
						</Button>
					</Form>

					<Link to="/">
						<FiArrowLeft />
						Voltar para o Login
					</Link>
				</AnimatedContainer>
			</Content>
		</Container>
	);
};

export default ForgotPassword;
