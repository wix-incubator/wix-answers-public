import {namespacedClassnames} from '../../common';
import * as React from 'react';
import Textarea from 'react-textarea-autosize';

export type TextAreaAutosizeProps = {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	readOnly?: boolean;
	disabled?: boolean;
};

const defaultProps = {
	disabled: false,
};

export const TextAreaAutosize = (partialProps: TextAreaAutosizeProps) => {
	const props = {...defaultProps, ...partialProps};
	const classNames = namespacedClassnames('text-area-autosize');

	const onChange = (e: any) => {
		props.onChange(e.target.value);
	};

	return (
		<Textarea
			className={classNames}
			placeholder={props.placeholder}
			value={props.value}
			onChange={onChange}
			disabled={props.disabled}
			readOnly={props.readOnly}
		/>
	);
};
