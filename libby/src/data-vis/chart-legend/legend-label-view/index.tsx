import * as React from 'react';
import { namespacedClassnames } from '../../../common/namespace-classes';
import { BaseProps } from '../../../common';
import {ChartLegendLabel} from '..';
import {hex2Rgb} from 'answers-lib';

export const LegendLabelViewKey = 'legend-label-view';

export type LegendLabelViewProps = {
	label: ChartLegendLabel;
	value: boolean;
	onChange: (value: boolean) => void;
	disabled?: boolean;
} & BaseProps;

export type LegendLabelViewState = {
	isMouseOver: boolean;
};

export class LegendLabelView extends React.PureComponent<LegendLabelViewProps, LegendLabelViewState> {
	state = {
		isMouseOver: false
	};

	onClick = () => {
		if (!this.props.disabled) {
			this.props.onChange(!this.props.value);
		}
	}

	createStyles = (color: string, isSelected: boolean): any => {
		const isHover = this.state.isMouseOver;
		const rgb = hex2Rgb(color);
		const alpha =
			isSelected ?
				isHover ? '.8' : '1' :
				isHover ? '.1' : '0';

		return {
			color: isSelected ? '#ffffff' : color,
			border: `1px solid ${color}`,
			background: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
		};
	}

	toggleHover = (isOver: boolean) => () => this.setState({isMouseOver: isOver});

	render () {
		const {props} = this;
		const label = props.label;

		const classNames = namespacedClassnames(
			LegendLabelViewKey,
			props.className,
			{disabled: props.disabled, selected: props.value}
		);

		const style = this.createStyles(label.color, props.value);

		return (
			<div
				className={classNames}
				onClick={this.onClick}
				onMouseEnter={this.toggleHover(true)}
				onMouseLeave={this.toggleHover(false)}
				style={style}
			>
				<div className='label-name'>{label.name}</div>
				<div className='label-value'>{label.value}</div>
			</div>
		);
	}
}
