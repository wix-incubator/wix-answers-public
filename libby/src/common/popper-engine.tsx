import * as React from 'react';
import { Popper, Target, Arrow, Manager } from 'react-popper';
import * as Portal from 'react-portal-minimal';
import { BaseProps } from '.';
import { namespacedClassnames } from './namespace-classes';

export type PopperEngineProps = {
	body: JSX.Element | string;
	show: boolean;
	relativeToBody?: boolean;
	direction?: 'top' | 'left';
} & BaseProps;

export type PopperLifeStatus = 'dormant' | 'trigger-show' | 'ready' | 'trigger-hide';

export type PopperEngineState = {
	status: PopperLifeStatus;
};

export class PopperEngine extends React.PureComponent<PopperEngineProps, PopperEngineState> {
	initializeTime = 50;
	transitionTime = 200;

	state: PopperEngineState = {
		status: 'dormant',
	};

	private statusLock: boolean = false;

	private customApplyStylesModifier = {
		enabled: true,
		order: 860,
		fn: (data: any) => {
			const {props, state} = this;
			const actualPlacement = data.placement;

			const isReady = state.status === 'ready';
			const isVisible = props.show;
			const isHiding = state.status === 'trigger-hide';

			const left = Math.floor(data.offsets.popper.left);
			const top = Math.floor(data.offsets.popper.top);

			const isTop = actualPlacement === 'top';
			const isBottom = actualPlacement === 'bottom';

			const notReadyOrHidden = !isReady || !isVisible;
			const newTop = isTop && notReadyOrHidden ? top - 10 :
						isBottom && notReadyOrHidden ? top + 10 :
						top;

			const isLeft = actualPlacement === 'left';
			const isRight = actualPlacement === 'right';

			const newLeft = isLeft && notReadyOrHidden ? left - 10 :
							isRight && notReadyOrHidden ? left + 10 :
							left;

			const transform = `translate3d(${newLeft}px, ${newTop}px, 0px)`;
			const opacity = isReady && isVisible ? 1 : 0;
			const transition = isReady || isHiding ? 'all .2s ease-in-out' : undefined;

			const popper = {...data.popper, left: newLeft, top: newTop};
			const offsets = {...data.offsets, popper};
			const styles = {...data.styles, opacity, transform, transition};

			if (this.statusLock) {
				this.statusLock = false;

				const delayTime = state.status === 'trigger-show' ? this.initializeTime
					: state.status === 'trigger-hide' ? this.transitionTime
					: 0;

				setTimeout(() => {
					this.setState((prevState) => {
						if (prevState.status === 'trigger-show') {
							return {status: 'ready'};
						} else if (prevState.status === 'trigger-hide') {
							return {status: 'dormant'};
						} else {
							return prevState;
						}
					});
				}, delayTime);
			}

			return {...data, offsets, styles, popper};
		}
	};

	componentWillMount () {
		if (this.props.show === true) {
			this.triggerShow();
		}
	}

	componentWillReceiveProps (nextProps: PopperEngineProps) {
		const currShow = this.props.show;
		const nextShow = nextProps.show;

		if (!currShow && nextShow) {
			this.triggerShow();
		} else if (currShow && !nextShow) {
			this.triggerHide();
		}
	}

	triggerShow = () => {
		if (!this.statusLock) {
			this.statusLock = true;
			this.setState({status: 'trigger-show'});
		}
	}

	triggerHide = () => {
		if (!this.statusLock) {
			this.statusLock = true;
			this.setState({status: 'trigger-hide'});
		}
	}

	render () {
		const {props, state} = this;
		const classNames = `popper ${props.className || ''}`;
		const portalClassName = namespacedClassnames('popper-portal-dest');

		const defaultBodyStyle = {
			pointerEvents: props.show ? 'initial' : 'none'
		};

		const modifiers: any = {
			customApplyStylesModifier: this.customApplyStylesModifier,
			preventOverflow: {boundariesElement: props.relativeToBody ? 'viewport' : 'scrollParent'}
		};

		const placement = props.direction || 'top';

		const popperElem = (
			<Popper
				eventsEnabled={state.status !== 'dormant'}
				placement={placement}
				className={classNames}
				style={defaultBodyStyle}
				modifiers={modifiers}
			>
				{props.body}
				<Arrow className='popper-arrow'/>
			</Popper>
		);

		const renderedPopper = this.props.relativeToBody ? (
			<Portal className={portalClassName}>
				{popperElem}
			</Portal>
		) : popperElem;

		return (
			<Manager>
				<Target className='popper-target'>
					{props.children}
				</Target>
				{this.state.status !== 'dormant' ? renderedPopper : null}
			</Manager>
		);
	}
}
