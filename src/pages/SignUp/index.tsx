import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';
import { Container, Background, Content } from './styles';

import Input from '../../components/input';
import Button from '../../components/button';

import getValidationErros from '../../utils/getValidationErros';

interface FormData {
	name: string;
	email: string;
	password: string;
}

const SignUp: React.FC = () => {
	const formRef = useRef<FormHandles>(null);

	const handleSubmit = useCallback(async (data: FormData) => {
		try {
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
		} catch (err) {
			const errors = getValidationErros(err);
			formRef.current?.setErrors(errors);
		}
	}, []);

	return (
		<Container>
			<Background />
			<Content>
				<img src={logoImg} alt="GoBarber" />
				<Form ref={formRef} onSubmit={handleSubmit}>
					<h1>Faça seu cadastro</h1>

					<Input icon={FiUser} name="name" placeholder="Nome" />
					<Input icon={FiMail} name="email" placeholder="E-mail" />
					<Input
						icon={FiLock}
						name="password"
						type="password"
						placeholder="Senha"
					/>

					<Button type="submit">Cadastrar</Button>
				</Form>

				<Link to="/">
					<FiArrowLeft />
					Voltar para o Logon
				</Link>
			</Content>
		</Container>
	);
};

export default SignUp;
