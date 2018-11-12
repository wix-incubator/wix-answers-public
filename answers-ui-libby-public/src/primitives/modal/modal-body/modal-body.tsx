import * as React from 'react';
import { namespacedClassnames } from '../../../common/namespace-classes';
import { BaseProps } from '../../../common';
import { CloseIcon } from '../../../icons';
import * as PropTypes from 'prop-types';

export type ModalBodyProps = {
	forceNoPadding?: boolean;
} & BaseProps;

export class ModalBody extends React.PureComponent<ModalBodyProps, {}> {
	static contextTypes = {
		modalHasHeader: PropTypes.bool,
		onDismiss: PropTypes.func,
		hideCloseButton: PropTypes.bool
	};

	render () {
		const { context, props } = this;
		const { hideCloseButton, modalHasHeader, onDismiss } = context;

		const paddingClass = props.forceNoPadding ? 'no-padding' : '';
		const className = namespacedClassnames('modal-body', paddingClass, props.className || '');

		const shouldAddCloseButton = !hideCloseButton && !modalHasHeader && !!onDismiss;

		const maybeCloseButton = (shouldAddCloseButton) && (
			<div className='close-button-container'>
				<div className='close-btn' onClick={onDismiss}>
					<CloseIcon/>
				</div>
			</div>
		);

		return (
			<div className={className}>
				{maybeCloseButton}
				{props.children}
			</div>
		);
	}
}
