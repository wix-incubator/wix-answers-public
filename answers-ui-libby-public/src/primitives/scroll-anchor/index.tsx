import * as React from 'react';
import * as _scrollIntoView from 'scroll-into-view';

const scrollElementToView = (element: HTMLElement) => {
	_scrollIntoView(element, {
		time: 500,
		align: {top: 0, left: 0.5},
		validTarget: (_: any, parentsScrolled: any) => parentsScrolled < 1
	});
};

export type ScrollAnchorProps = {
	trigger: boolean;
};

export class ScrollAnchor extends React.PureComponent<ScrollAnchorProps> {
	private scrollTargetElem: HTMLElement | null = null;

	componentWillReceiveProps (nextProps: ScrollAnchorProps) {
		if (nextProps.trigger !== this.props.trigger && nextProps.trigger === true) {
			this.scrollToTarget();
		}
	}

	setScrollTarget = (elem: any) => this.scrollTargetElem = elem;

	scrollToTarget = () => {
		return !!this.scrollTargetElem && scrollElementToView(this.scrollTargetElem);
	}

	render () {
		return <span ref={this.setScrollTarget}/>;
	}
}
