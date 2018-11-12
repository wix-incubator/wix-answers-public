import * as React from 'react';
import { namespacedClassnames, WithClassName } from '../../common';
import { ButtonClickHandler, BaseButton, ButtonType } from '../../primitives/buttons/base-button/base-button.comp';
import { Tooltip } from '../../primitives/tooltip/tooltip';

export type ActionButtonProps = {
	onClick: ButtonClickHandler;
	disabled?: string;
	description: string;
	// tooltipPosition?: TooltipPosition;
	buttonType?: ButtonType;
	isHollow?: boolean;
	tooltipRelativeToBody?: boolean;
} & WithClassName;

const key = 'action-button';

export class ActionButton extends React.PureComponent<ActionButtonProps> {
	render () {
		const {props} = this;
		const classNames = namespacedClassnames(key, props.className);
		return (
			// tslint:disable-next-line:max-line-length
			<Tooltip body={props.disabled || props.description} className={classNames} relativeToBody={props.tooltipRelativeToBody}>
				<BaseButton {...props} disabled={!!props.disabled}>
					{props.children}
				</BaseButton>
			</Tooltip>
		);
	}
}
