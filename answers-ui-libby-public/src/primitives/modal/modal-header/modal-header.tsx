import * as React from 'react';
import { LinkButton } from '../../buttons/link-button/link-button';
import { Button } from '../../buttons/button/button';
import { namespacedClassnames } from '../../../common/namespace-classes';
import { backArrowIcon } from './back-arrow.icon';
import { Icon } from '../../icon/icon';
import { closeX } from './close-x.icon';
import * as PropTypes from 'prop-types';

export type ModalHeaderProps = {
	onBack?: () => void;
	children?: any;
};

export type ModalHeaderContext = {
	onDismiss?: () => void;
};

export class ModalHeader extends React.Component<ModalHeaderProps, any> {
	static contextTypes = { onDismiss: PropTypes.func, hideCloseButton: PropTypes.bool };

	handleBackClick = () => {
		if (this.props.onBack) {
			this.props.onBack();
		}
	}

	handleCloseClick = () => {
		if (this.context.onDismiss) {
			this.context.onDismiss();
		}
	}

	render () {
		const classNames = namespacedClassnames('modal-header');

		const maybeBackButton = this.props.onBack ?
			<LinkButton onClick={this.handleBackClick}><Icon icon={backArrowIcon}/></LinkButton> : null;

		const maybeCloseButton = this.context.onDismiss && !this.context.hideCloseButton ?
			<Button className='close-btn' onClick={this.handleCloseClick}><Icon icon={closeX}/></Button> : null;

		return (
			<div className={classNames}>
				<div className='header-back-button-wrapper'>
					{maybeBackButton}
				</div>
				<div className='header-content'>{this.props.children}</div>
				<div className='header-close-button-wrapper'>
					{maybeCloseButton}
				</div>
			</div>
		);
	}
}
