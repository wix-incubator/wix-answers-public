import {namespacedClassnames} from '../../common/namespace-classes';
import * as React from 'react';

export type ToggleButtonProps = {
	isChecked: boolean;
	onClick: () => void;
	children?: any;
	disabled?: boolean;
};

export const ToggleButton = (props: ToggleButtonProps) => {
	const checkedClassName = props.isChecked ? 'checked' : '';
	const classNames = namespacedClassnames('toggle-button', checkedClassName);

	return <button onClick={props.onClick} className={classNames} disabled={props.disabled}>{props.children}</button>;
};
