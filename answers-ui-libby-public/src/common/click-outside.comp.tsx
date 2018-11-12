import * as React from 'react';
import {findDOMNode} from 'react-dom';

export type ClickOutsideProps = {
	children?: any;
	onOuterClick: (event: Event) => void;
};

export class ClickOutside extends React.Component<ClickOutsideProps, {}> {
	componentDidMount () {
		document.addEventListener('mousedown', this.handleOuterClick, true);
	}

	componentWillUnmount () {
		document.removeEventListener('mousedown', this.handleOuterClick, true);
	}

	handleOuterClick = (event: any) => {
		const node = findDOMNode(this) as HTMLElement;

		if (node && node !== event.target && !node.contains(event.target)) {
			this.props.onOuterClick(event);
		}
	}

	render () {
		return React.Children.only(this.props.children);
	}
}
