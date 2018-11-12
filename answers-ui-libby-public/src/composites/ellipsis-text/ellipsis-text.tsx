import * as React from 'react';
import { namespacedClassnames } from '../../common/namespace-classes';
import { BaseProps } from '../../common';
import { Tooltip } from '../../primitives/tooltip/tooltip';
import * as ReactDOM from 'react-dom';

export type EllipsisTextProps = {
	tooltipRelativeToBody?: boolean;
	tooltipText?: string; // defaults to original text
	forceTooltip?: boolean;
	forceTooltipVisible?: boolean;
	onEllipsisChange?: (visible: boolean) => void;
} & BaseProps;

export type EllipsisTextState = {
	hasOverflowingChildren: boolean;
	text: string;
};

const key = 'ellipsis-text';
export class EllipsisText extends  React.PureComponent<EllipsisTextProps, EllipsisTextState > {

	element: any = null;

	state: EllipsisTextState = {
		hasOverflowingChildren: false,
		text: ''
	};

	getRelevantElement = (el: HTMLElement) => {
		if (this.props.forceTooltip) {
			return el.querySelector('.popper-target > .text') || el;
		} else {
			return el;
		}
	}

	updateOverflow = (e: any) => {
		const el = this.getRelevantElement(e.target);
		const { hasOverflowingChildren, text } = this.state;

		const hasEllipsis = el.scrollWidth > el.clientWidth;

		if (!hasOverflowingChildren && hasEllipsis) {
			this.setState({ hasOverflowingChildren: true });
			if (this.props.onEllipsisChange) {
				this.props.onEllipsisChange(true);
			}
			if (el.textContent !== text) {
				this.setState({ text: el.textContent || '' });
			}
		} else {
			if (this.props.onEllipsisChange && hasOverflowingChildren && !hasEllipsis) {
				this.props.onEllipsisChange(false);
			}
			this.setState({ hasOverflowingChildren: false });
		}
	}

	loadElement = (e: any) => {
		// cpmsp;
		this.element = e && ReactDOM.findDOMNode(e);
		if (this.element && !this.state.hasOverflowingChildren) {
			setTimeout(() => {
				this.updateOverflow({target: this.element});
			}, 100);
		}
	}

	render () {
		const {state, props} = this;
		const { hasOverflowingChildren, text } = state;
		const { children } = this.props;
		const showTooltip = this.props.forceTooltip || hasOverflowingChildren;

		const className = namespacedClassnames(key, props.className, {'tooltip-visible': showTooltip});

		return showTooltip ? (
			<Tooltip
				ref={this.loadElement}
				relativeToBody={props.tooltipRelativeToBody}
				className={className}
				body={props.tooltipText || text}
				forceVisible={props.forceTooltipVisible}
			>
				{children}
			</Tooltip>
		) : (
			<div className={className} onMouseEnter={this.updateOverflow}>
				{this.props.children}
			</div>
		);
	}
}
