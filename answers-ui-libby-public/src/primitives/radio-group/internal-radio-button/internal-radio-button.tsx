import {namespacedClassnames} from '../../../common/namespace-classes';
import * as React from 'react';

export type InternalRadioButtonProps = {
	checked: boolean;
	onSelect: () => void;
	disabled?: boolean;
	children?: any;
};

export const InternalRadioButton = (props: InternalRadioButtonProps) => {
	const classes = namespacedClassnames('inner-radio-button');

	const onChange = () => !props.disabled ? props.onSelect() : null;

	return (
		<div className={classes}>
			<input
				style={{display: 'none'}}
				type='radio'
				checked={props.checked}
				onChange={onChange}
				disabled={props.disabled}
			/>
			<span className='radio-icon'/>
			<span className='radio-body'>{props.children}</span>
		</div>
	);
};
