import * as React from 'react';
import { namespacedClassnames, WithClassName } from '../../common';
import { PositiveButton, AttentionButton, DangerButton, SpecialButton } from '../../primitives/buttons/button/button';
import { ButtonType } from '../../primitives/buttons/base-button/base-button.comp';

const compToType = (fn: any): ButtonType => {
	// tslint:disable-next-line:switch-default
	switch (fn) {
		case PositiveButton:
			return 'positive';
		case AttentionButton:
			return 'attention';
		case DangerButton:
			return 'danger';
		case SpecialButton:
			return 'special';
		default:
			return 'default';
	}
};

export type ButtonGroupProps = {} & WithClassName;

const key = 'button-group';
export const ButtonGroup: React.SFC<ButtonGroupProps> = (props) => {

	// tslint:disable-next-line:only-arrow-functions
	// tslint:disable-next-line:max-line-length
	const types = React.Children.toArray(props.children).map((c: any) => {
		return  compToType(c && c.type);
	}) || [];

	types.sort();
	if (types && types[0] !== types[types.length - 1]) {
		console.warn('Button group should be used only with one type of button inside it');
	}

	const type = types[0];
	const classNames = namespacedClassnames(key, props.className, type || 'default');
	// tslint:disable-next-line:no-console

	return (
	<div className={classNames}>
		{props.children}
	</div>);
};
