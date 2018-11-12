import * as React from 'react';
import { namespacedClassnames } from '../../common/namespace-classes';
import { noop, BaseProps } from '../../common';
import { PopperEngine } from '../../common/popper-engine';

export type TooltipProps = {
	body: JSX.Element | string;
	relativeToBody?: boolean;
	forceVisible?: boolean;
	forceHidden?: boolean;
	direction?: 'top' | 'left';
} & BaseProps;

export type TooltipState = {
	isVisible: boolean;
	isInteracting: boolean;
};

export class Tooltip extends React.Component<TooltipProps, TooltipState> {
	leaveTargetDelay = 150;

	state = {
		isVisible: false,
		isInteracting: false
	};

	toggleTooltip = (isVisible: boolean) => this.setState({isVisible});

	maybeShowTooltip = () => {
		if (!this.state.isVisible) {
			this.toggleTooltip(true);
		}
	}

	maybeHideTooltip = () => this.state.isInteracting ? noop() : this.toggleTooltip(false);

	onTooltipBodyEnter = () => this.setState({isInteracting: true});

	onTooltipBodyLeave = () => this.setState({isInteracting: false}, this.maybeHideTooltip);

	render () {
		const {props, state} = this;
		const tooltipTriggerClassName = namespacedClassnames('tooltip-trigger', props.className);
		const tooltipClassName = namespacedClassnames('tooltip', props.className);

		const tooltipBody = (
			<div className='tooltip-body' onMouseEnter={this.onTooltipBodyEnter} onMouseLeave={this.onTooltipBodyLeave}>
				{props.body}
			</div>
		);

		const maybeShow = !props.forceHidden && props.forceVisible || state.isVisible;

		return (
			<div className={tooltipTriggerClassName} onMouseMove={this.maybeShowTooltip} onMouseLeave={this.maybeHideTooltip}>
				<PopperEngine
					body={tooltipBody}
					show={maybeShow}
					relativeToBody={!!props.relativeToBody}
					className={tooltipClassName}
					direction={props.direction}
				>
					{props.children}
				</PopperEngine>
			</div>
		);
	}
}
