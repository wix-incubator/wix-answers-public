import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { namespacedClassnames } from '../../common/namespace-classes';
import { WithClassName, TranslateFunc } from '../../common';
import { TypographyType, Text } from '../../typography';
import { EllipsisText } from '../ellipsis-text/ellipsis-text';

// tslint:disable-next-line:no-var-requires
const copyToClipboard = require('copy-to-clipboard');

export type ClickToCopyState = {
	copied: boolean;
	hasEllipsis: boolean;
};

export type ClickToCopyProps = {
	text: string;
	type?: TypographyType;
	ellipsisText?: boolean;
	t: TranslateFunc;
} & WithClassName;

export const compKey = 'click-to-copy';

export class ClickToCopy extends React.PureComponent<ClickToCopyProps, ClickToCopyState> {

	state: ClickToCopyState = {
		copied: false,
		hasEllipsis: false
	};

	copiedMsgTimeout = 4000;

	element: Element | null = null;

	timer: any = null;

	copy = () => {
		clearTimeout(this.timer);
		copyToClipboard(this.props.text);
		this.setState({copied: true});
		this.timer = setTimeout(() => this.setState({copied: false}), this.copiedMsgTimeout);

		if (this.element && window.getSelection) {
			const range = document.createRange();
			range.selectNode(this.element);
			window.getSelection().removeAllRanges();
			window.getSelection().addRange(range);
		}
	}

	setRef = (ref: any) => {
		this.element = ref ? ReactDOM.findDOMNode(ref) as Element : null;
	}

	onEllipsisChange = (hasEllipsis: boolean) => {
		this.setState({hasEllipsis});
	}

	calcTooltipText = () => {
		const {props, state} = this;
		const ttText = props.t(`common.click-to-copy${state.copied ? '.copied' : '' }`);

		// if we're showing the rest of the ellipsised text we need to prepend the "click to copy part"
		if (state.hasEllipsis && !state.copied) {
			return `${props.text} | ${ttText}`;
		} else {
			return ttText;
		}
	}

	render () {
		const {props, state} = this;
		const cm = namespacedClassnames(compKey, props.className, {copied: state.copied});

		const ttText = this.calcTooltipText();

		return (
			<EllipsisText
				ref={this.setRef}
				tooltipText={ttText}
				forceTooltip={true}
				forceTooltipVisible={state.copied}
				onEllipsisChange={this.onEllipsisChange}
				className={cm}
			>
				<Text onClick={this.copy} type={props.type}>{props.text}</Text>
			</EllipsisText>
		);
	}
}
