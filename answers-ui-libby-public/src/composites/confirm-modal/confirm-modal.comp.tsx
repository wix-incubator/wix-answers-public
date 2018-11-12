import { Button, DangerButton, HollowButton } from '../../primitives/buttons';
import { Modal, ModalBody, ModalSize, ModalFooter } from '../../primitives/modal';
import * as React from 'react';
import { Text } from '../../typography';
import { namespacedClassnames, BaseProps } from '../../common';

export type ConfirmModalProps = {
	isOpen: boolean;
	title: string;
	body: JSX.Element | string;
	confirmText: string;
	cancelText: string;
	level: ConfirmLevel;
	onConfirm: () => void;
	onCancel: () => void;
} & BaseProps;

export type ConfirmLevel = 'confirm' | 'alert';

export const confirmModalKey = 'confirm-modal';

export class ConfirmModal extends React.Component<ConfirmModalProps, {}> {

	render () {
		const {props} = this;
		const className = namespacedClassnames(confirmModalKey, props.className);
		const {isOpen, title, body, confirmText, cancelText, onConfirm, onCancel, level} = props;

		const renderConfirmButton = () => {
			switch (level) {
				case 'confirm':
					return <Button className={namespacedClassnames('confirm')} onClick={onConfirm}>{confirmText}</Button>;
				case 'alert':
					return <DangerButton className={namespacedClassnames('confirm')} onClick={onConfirm}>{confirmText}</DangerButton>;
				default:
					return <DangerButton className={namespacedClassnames('confirm')} onClick={onConfirm}>{confirmText}</DangerButton>;
			}
		};

		return (
			<Modal className={className} isOpen={isOpen} size={ModalSize.SMALL}>
				<ModalBody>
				<Text className='title' type='h1'>{title}</Text>
				<div className={namespacedClassnames('body')}>
					{body}
				</div>
				</ModalBody>
				<ModalFooter>
					<HollowButton className={namespacedClassnames('cancel')} onClick={onCancel}>{cancelText}</HollowButton>
					{renderConfirmButton()}
				</ModalFooter>
			</Modal>
		);
	}
}
