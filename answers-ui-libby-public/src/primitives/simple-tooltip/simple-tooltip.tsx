import {namespacedClassnames} from '../../common/namespace-classes';
import * as React from 'react';
import { WithClassName } from '../../common';
// import { Tooltip} from '../tooltip/tooltip';
import { InfoTooltip } from '../info-tooltip/info-tooltip';

export type SimpleTooltipPosition = 'above' | 'below' | 'right' | 'left';

export type SimpleTooltipProps = {
	text: string;
	position?: SimpleTooltipPosition;
	delay?: 'normal' | 'long';
	infoTooltip?: boolean;
} & WithClassName;

export class SimpleCSSTooltip extends React.Component<SimpleTooltipProps, {}> {
	render () {
		const {props} = this;
		const namespaceClass = namespacedClassnames('simple-tooltip-container', props.className);

		const position = props.position || 'below';
		const delay = props.delay || 'normal';
		const infoTooltip = props.infoTooltip ? 'info-tooltip' : '';
		const classes = `${namespaceClass} ${position} ${delay}-delay ${infoTooltip}`;

		return (
			<div className={classes} data-content={props.text}>
				{this.props.children}
			</div>
		);
	}
}

export const SimpleTooltip: React.SFC<SimpleTooltipProps> = (props) => {

	const oldCSSTooltip = (
		<SimpleCSSTooltip {...props}/>
	);

	// const newTooltip = (
	// 	<Tooltip body={props.text}>
	// 		{props.children}
	// 	</Tooltip>
	// );

	return oldCSSTooltip;
};

export const SimpleInfoTooltip = InfoTooltip;
