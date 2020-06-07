import React, {
	ComponentType,
	InputHTMLAttributes,
	useEffect,
	useRef,
	useState,
	useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, TooltipError } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	icon?: ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({
	name: inputName,
	icon: Icon,
	...rest
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const [isFilled, setIsFilled] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);
	const { fieldName, defaultValue, error, registerField } = useField(
		inputName,
	);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value',
		});
	}, [fieldName, registerField]);

	const handleInputFocus = useCallback(() => {
		setIsFocused(true);
	}, []);

	const handleInputBlur = useCallback(() => {
		setIsFocused(false);
		setIsFilled(!!inputRef.current?.value);
	}, []);

	return (
		<Container
			isErrored={!!error}
			isFocused={isFocused}
			isFilled={isFilled}
		>
			{Icon && <Icon size={20} />}
			<input
				{...rest}
				ref={inputRef}
				defaultValue={defaultValue}
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
			/>

			{error && (
				<TooltipError title={error}>
					<FiAlertCircle color="#c53030" size={20} />
				</TooltipError>
			)}
		</Container>
	);
};

export default Input;
