// Packages
import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
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
import { ToastMessage, useToast } from '../../hooks/toast';
import api from '../../services/api';

interface ResetPasswordFormData {
	password: string;
	passwordConfirmation: string;
}

const ResetPassword: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const { addToast } = useToast();
	const history = useHistory();
	const location = useLocation();
	const [loading, setLoading] = useState(false);

	const handleSubmit = useCallback(
		async (data: ResetPasswordFormData) => {
			if (loading) return;
			try {
				setLoading(true);
				formRef.current?.setErrors({});

				const schema = Yup.object().shape({
					password: Yup.string().required('Informe sua nova senha'),
					passwordConfirmation: Yup.string()
						.required('Confirme sua nova senha')
						.oneOf(
							[Yup.ref('password')],
							'As senhas devem ser iguais',
						),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				const token = location.search.replace('?token=', '');

				if (!token) {
					addToast({
						type: 'error',
						title: 'Token inválido',
						description:
							'Parece que você não acessou a página pelo link enviado por email.',
					});

					return;
				}

				await api.post('/passwords/reset', {
					token,
					password: data.password,
					passwordConfirmation: data.passwordConfirmation,
				});

				addToast({
					type: 'success',
					title: 'Isso aí!',
					description:
						'Sua senha foi redefinida com sucesso. Faça seu login para continuar.',
				});

				history.push('/');
			} catch (err) {
				const toastMessage = {
					type: 'error',
					title: 'Erro na redefinição de senha',
					description: 'Por favor, tente novamente.',
				} as ToastMessage;

				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErros(err);
					formRef.current?.setErrors(errors);

					toastMessage.title = 'Dados inválidos';
					toastMessage.description =
						'Verifique os erros apontados e tente novamente';
				}

				addToast(toastMessage);
			} finally {
				setLoading(false);
			}
		},
		[addToast, history, loading, location.search],
	);

	return (
		<Container>
			<Content>
				<AnimatedContainer>
					<img src={logoImg} alt="GoBarber" />
					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Escolha uma nova senha</h1>

						<Input
							icon={FiLock}
							name="password"
							type="password"
							placeholder="Nova senha"
						/>
						<Input
							icon={FiLock}
							name="passwordConfirmation"
							type="password"
							placeholder="Confirmação da nova senha"
						/>

						<Button loading={loading} type="submit">
							Redefinir
						</Button>

						<Link to="/">Voltar para o login</Link>
					</Form>
				</AnimatedContainer>
			</Content>
			<Background />
		</Container>
	);
};

export default ResetPassword;
