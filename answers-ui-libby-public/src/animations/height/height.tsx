import { BaseAnimationProps } from '../opacity/opacity';
import { namespacedClassnames } from '../../common/namespace-classes';
import * as React from 'react';

export type HeightAnimationProps = BaseAnimationProps;

export class HeightAnimation extends React.Component<HeightAnimationProps, any> {
	contentElement: HTMLElement | null = null;
	animationDuration: number = 200;

	state = {
		height: 'auto',
		overflow: 'visible'
	};

	constructor (props: any) {
		super(props);

		this.state.height = props.show ? 'auto' : '0';
		this.state.overflow = props.show ? 'visible' : 'hidden';
	}

	componentDidMount () {
		if (React.Children.count(this.props.children) > 1) {
			// tslint:disable-next-line:max-line-length
			console.warn('HeightAnimation should have exactly one child. Make sure you have wrapped the content you want to animate.');
		}
	}

	componentWillReceiveProps (nextProps: any) {
		const props = this.props;
		if (!nextProps || nextProps.show === props.show) {
			return;
		}

		const shouldShow = nextProps.show;

		if (shouldShow) {
			this.handleShow();
		} else {
			this.handleHide();
		}
	}

	getFullContentHeight (): number {
		if (!this.contentElement) {
			return 0;
		}

		const elem = this.contentElement.firstElementChild as HTMLElement;
		const styles = window.getComputedStyle(elem);
		const margin = parseInt(styles.marginTop || '', 10) + parseInt(styles.marginBottom || '', 10);

		return Math.ceil(elem.offsetHeight + margin);
	}

	handleShow () {
		const contentHeight = this.getFullContentHeight();
		const endHeight = contentHeight;

		this.setState({ height: endHeight });
		setTimeout(() => {
			this.setState({ height: 'auto', overflow: 'visible' });
		}, this.animationDuration);
	}

	handleHide () {
		const startHeight = this.getFullContentHeight();
		const endHeight = 0;

		this.setState({ height: startHeight, overflow: 'hidden' });
		setTimeout(() => {
			this.setState({ height: endHeight });
		}, 0);
	}

	setContentNode (e: HTMLElement) {
		if (e) {
			this.contentElement = e;
		}
	}

	render () {
		const props = this.props;
		const animationClass = 'height';
		const showOrHide = props.show ? 'show' : 'hide';
		const classNames = namespacedClassnames(animationClass, showOrHide, props.className);

		const handleContentRef = this.setContentNode.bind(this);

		const heightStyle: any = {
			height: this.state.height,
			overflow: this.state.overflow
		};

		return (
			<div className={classNames} style={heightStyle}>
				<div ref={handleContentRef} className='height-animation-content'>{props.children}</div>
			</div>
		);
	}
}
