import { ValidationError } from 'yup';

interface Errors {
	[key: string]: string;
}

export default function getValidationErros(validationErrors: ValidationError): Errors {
	const errors: Errors = {};

	validationErrors.inner.forEach(({ path, message }) => {
		errors[path] = message;
	});

	return errors;
}
