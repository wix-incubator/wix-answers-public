import * as React from 'react';
import * as PropTypes from 'prop-types';
import { namespacedClassnames } from '../../common/namespace-classes';
import * as classnames from 'classnames';
import { BaseProps } from '../../common';
import { createResizeObserver, ResizeObserverHandler } from '../../common/resize-observer';
import { ModalSize } from './modal-size';
import { ModalHeader } from './modal-header/modal-header';
import { ModalBody } from './modal-body/modal-body';
import { ModalFooter } from './modal-footer/modal-footer';
import { ModalSubHeader } from './modal-sub-header/modal-sub-header';
import { isString, isNumber } from 'util';

export type ModalProps = {
	isOpen: boolean;
	size: ModalSize;
	hideCloseButton?: boolean;
	onDismiss?: () => void;
	disableScrollLock?: boolean;
} & BaseProps;

export class Modal extends React.Component<ModalProps, any> {
	static childContextTypes = {
		onDismiss: PropTypes.func,
		modalHasHeader: PropTypes.bool,
		hideCloseButton: PropTypes.bool
	};

	modalContentElement: HTMLElement | null = null;
	modalBody: HTMLElement | null = null;
	minMargin: number = 25;

	scrollLockClassName: string = 'aul-modal-scroll-lock';

	resizeHackTimer: any = null;

	modalSizeToClassMap: {[size: number]: string} = {
		[ModalSize.X_SMALL]: 'modal-content-x-small',
		[ModalSize.SMALL]: 'modal-content-small',
		[ModalSize.MEDIUM]: 'modal-content-medium',
		[ModalSize.MEDIUM_LARGE]: 'modal-content-medium-large',
		[ModalSize.LARGE]: 'modal-content-large'
	};

	state = {
		isContentOverflowing: false,
		hasHeader: false
	};

	resizeObserver: ResizeObserverHandler = createResizeObserver((w, h) => this.onResize(w, h));

	constructor (props: any) {
		super(props);

		if (props.isOpen && !props.disableScrollLock) {
			window.document.body.classList.add(this.scrollLockClassName);
		}

		this.state.hasHeader = this.hasHeader(props);
		this.validateStructure(props);
	}

	componentWillReceiveProps (nextProps: ModalProps) {
		if (this.props.isOpen === nextProps.isOpen) {
			return;
		}

		this.updateHasHeaderContext(nextProps);
		this.validateStructure(nextProps);

		if (nextProps.isOpen) {
			this.handleModalOpen();
		} else {
			this.handleModalClose();
		}
	}

	componentWillUnmount () {
		this.resizeObserver.clean();
		this.handleModalClose();
	}

	childNotModalComponent = (child: React.ReactChild): boolean => {
		if (isString(child) || isNumber(child)) {
			return true;
		}
		const childType = child.type;
		return childType !== ModalHeader
			&& childType !== ModalSubHeader
			&& childType !== ModalBody
			&& childType !== ModalFooter;
	}

	validateStructure (props: ModalProps) {
		const childArray = React.Children.toArray(props.children);
		if (childArray.some(this.childNotModalComponent)) {
				// tslint:disable-next-line:max-line-length
				console.warn(`Bad Modal structure: modal can only have ModalHeader, ModalSubHeader, ModalBody or ModalFooter as it's direct children.`);
		}
	}

	isModalHeader = (child: React.ReactChild) => {
		return isString(child) || isNumber(child) ? false : child.type === ModalHeader;
	}

	hasHeader (props: ModalProps) {
		return React.Children.toArray(props.children).some(this.isModalHeader);
	}

	updateHasHeaderContext = (props: ModalProps) => {
		this.setState({hasHeader: this.hasHeader(props)});
	}

	setContentElement = (elem: any) => {
		if (elem) {
			this.modalContentElement = elem;
			this.modalBody = elem.querySelector('.modal-body') as HTMLElement;

			if (this.modalBody) {
				const modalHeader = elem.querySelector('.modal-header');
				const modalSubHeader = elem.querySelector('.modal-sub-header');
				const modalFooter = elem.querySelector('.modal-footer');

				const headerHeight = modalHeader ? modalHeader.clientHeight : 0;
				const subHeaderHeight = modalSubHeader ? modalSubHeader.clientHeight : 0;
				const footerHeight = modalFooter ? modalFooter.clientHeight : 0;

				const maxBodyHeight = `calc(
					100vh - ${headerHeight}px - ${subHeaderHeight}px - ${footerHeight}px - ${this.minMargin * 2}px
				)`;

				this.modalBody.style.maxHeight = maxBodyHeight;
			}

			this.resizeObserver.observeElem(elem);
		}
	}

	onResize = (_: number, height: number) => {
		const {modalBody} = this;

		const currOverflow = this.state.isContentOverflowing;
		const isOverflowing = modalBody ? height < (height - modalBody.clientHeight + modalBody.scrollHeight) : false;

		if (isOverflowing !== currOverflow) {
			this.setState({isContentOverflowing: isOverflowing});
		}
	}

	handleModalOpen = () => {
		if (!this.props.disableScrollLock) {
			window.document.body.classList.add(this.scrollLockClassName);
		}
	}

	handleModalClose = () => {
		if (this.modalContentElement) {
			this.resizeObserver.unobserveElem(this.modalContentElement);
		}

		if (!this.props.disableScrollLock) {
			window.document.body.classList.remove(this.scrollLockClassName);
		}
	}

	getChildContext () {
		const onDismiss = this.props.onDismiss;
		return {
			onDismiss,
			modalHasHeader: this.state.hasHeader,
			hideCloseButton: !!this.props.hideCloseButton
		};
	}

	preventBubble = (e: any) => e.stopPropagation();

	onDismiss = () => {
		if (this.props.onDismiss) {
			this.props.onDismiss();
		}
	}

	render () {
		const props = this.props;

		const sizeClass = this.modalSizeToClassMap[props.size];
		const overflowStateClass = this.state.isContentOverflowing ? 'content-overflow' : '';

		const classNames = namespacedClassnames('modal', props.className || '');
		const contentClassNames = classnames('modal-content', sizeClass, overflowStateClass);

		const renderModal = () => (
			<div className={classNames}>
				<div className='modal-overlay' onClick={this.onDismiss}>
					<div className={contentClassNames} onClick={this.preventBubble} ref={this.setContentElement}>
						{props.children}
					</div>
				</div>
			</div>
		);

		return props.isOpen ? renderModal() : null;
	}
}
