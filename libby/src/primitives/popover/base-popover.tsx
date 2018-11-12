import {namespacedClassnames} from '../../common';
import * as React from 'react';

export type PopoverPlaces = 'right' | 'left' | 'below' | 'above';
export type PopoverType = 'primary' | 'secondary' | 'dark';

// tslint:disable-next-line:no-var-requires
const RealPopover = require('react-popover/build').default;

export type PopoverProps = {
	body: any;
	isOpen: boolean;
	className?: string;
	onOuterAction: () => void;
	preferPlace?: PopoverPlaces;
	triggerOuterOnEsc?: boolean;
	triggerOuterOnScroll?: boolean;
};

export type BasePopoverProps = {
	popoverType: PopoverType
};

export class BasePopover extends React.Component<BasePopoverProps & PopoverProps, any> {
	hotkeyHandler: any = null;
	lastScrollTop: any = null;
	eventHandler: any = null;

	handleKeyUp = (e: KeyboardEvent) => {
		if (this.props.isOpen && e.keyCode === 27) {
			this.props.onOuterAction();
		}
	}

	handleScroll = (event: any) => {
		if (this.props.isOpen && this.lastScrollTop) {
			if (Math.abs(this.lastScrollTop - event.srcElement.scrollTop) > 20) {
				this.props.onOuterAction();
			}
		} else {
			this.lastScrollTop = event.srcElement.scrollTop;
		}
	}

	componentDidMount () {
		if (this.props.triggerOuterOnEsc) {
			window.addEventListener('keyup', this.handleKeyUp);
		}
		if (this.props.triggerOuterOnScroll) {
			window.addEventListener('scroll', this.handleScroll, true);
		}
	}

	componentWillUnmount () {
		if (this.props.triggerOuterOnEsc) {
			window.removeEventListener('keyup', this.handleKeyUp);
		}
		if (this.props.triggerOuterOnScroll) {
			window.removeEventListener('scroll', this.handleScroll);
		}
	}

	componentDidCatch () {
		console.warn('Caught error in Popover.. No panic though');
		// Catches errors thrown by popver in tests since move to R16.
		// These errors probably always existed, and surfaced now as R16 unmounts
		// the entire dom tree when errors are not cought.
		// More info here: https://fb.me/react-error-boundaries
	}

	render () {
		const props = this.props;
		const preferPlace = props.preferPlace ? props.preferPlace : 'below';
		const classNames = namespacedClassnames(props.popoverType) + (props.className ? ` ${props.className}` : '');

		const popoverProps = {...props, preferPlace, enterExitTransitionDurationMs: 250};

		return (
			<RealPopover {...popoverProps} className={classNames} appendTarget={document.body}>
				{this.props.children}
			</RealPopover>
		);
	}
}
