import { Button } from '../../primitives/buttons';
import { Modal, ModalBody, ModalSize, ModalFooter } from '../../primitives/modal';
import * as React from 'react';
import { namespacedClassnames, BaseProps } from '../../common';

export type AlertModalProps = {
	isOpen: boolean;
	body: JSX.Element | string;
	closeText: string;
	onClose: () => void;
} & BaseProps;

export const alertModalKey = 'alert-modal';

export class AlertModal extends React.Component<AlertModalProps, {}> {

	render () {
		const { props } = this;
		const className = namespacedClassnames(alertModalKey, props.className);
		const { isOpen, body, onClose, closeText } = props;

		return (
			<Modal className={className} isOpen={isOpen} size={ModalSize.SMALL}>
				<ModalBody>
					<div className={namespacedClassnames('body')}>
						{body}
					</div>
				</ModalBody>
				<ModalFooter>
					<Button className={namespacedClassnames('close')} onClick={onClose}>{closeText}</Button>
				</ModalFooter>
			</Modal>
		);
	}
}
