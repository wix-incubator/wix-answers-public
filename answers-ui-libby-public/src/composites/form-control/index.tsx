import * as React from 'react';
import { namespacedClassnames } from '../../common/namespace-classes';
import { BaseProps } from '../../common';
import { Text } from '../../typography';

export const FormControlKey = 'form-control'; // To major tom

export type FormControlProps = {
	label: string;
	validationError?: string | JSX.Element;
} & BaseProps;

export class FormControl extends React.PureComponent<FormControlProps> {

	render () {
		const {props} = this;
		const classNames = namespacedClassnames(FormControlKey, props.className, !!props.validationError ? 'with-error' : '');
		const maybeErrorMsg = props.validationError ? <div className='validation-error'>{props.validationError}</div> : null;

		return (
			<div className={classNames}>
				<Text type='t1c' className='label'>{props.label}</Text>
				{props.children}
				{maybeErrorMsg}
			</div>
		);
	}
}
