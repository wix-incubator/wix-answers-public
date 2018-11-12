import * as React from 'react';
import {namespacedClassnames} from '../../common';
import { Input, OptionalInputProps } from '../..';
import { ValidatedValueCompProps } from '../../todo-move-to-lib';

export type FormInputProps = ValidatedValueCompProps<string, OptionalFormInputProps>;

export type OptionalFormInputProps = {
	label?: string;
} & OptionalInputProps;

export class FormInput extends React.PureComponent<FormInputProps> {

	render () {
		const {validationError, ...props} = this.props;
		const invalid = !!validationError;
		const classNames = namespacedClassnames('form-input', {invalid}, props.className);

		const maybeInvalidMsg = invalid ? (
			<div className='validation-msg'>{validationError}</div>
		) : null;

		return props.label ? (
			<label className={classNames}>
				<span className='label-text'>{props.label}</span>
				<Input {...props}/>
				{maybeInvalidMsg}
			</label>
		) : (
			<span className={classNames}>
				<Input {...props}/>
				{maybeInvalidMsg}
			</span>
		);
	}
}
