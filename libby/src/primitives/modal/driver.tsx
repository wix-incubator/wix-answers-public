import * as React from 'react';
import { renderAndMountComponent } from 'answers-lib';
import { Modal, ModalProps } from './modal';
import { reactUniDriver, UniDriver } from 'unidriver';

export * from './modal-header/modal-header.driver';

export type ModalDriver = {
	clickOverlay: () => Promise<void>,
	clickCloseButton: () => Promise<void>,
	hasBodyCloseButton: () => Promise<boolean>,
	hasHeaderCloseButton: () => Promise<boolean>
};

export const createModalDriver = (wrapper: UniDriver): ModalDriver => {

	const base = wrapper.$('.modal');

	return {
		clickOverlay: () => base.$('.modal-overlay').click(),
		clickCloseButton: () => base.$('.close-btn').click(),
		hasBodyCloseButton: () => base.$('.modal-body .close-button-container .close-btn').exists(),
		hasHeaderCloseButton: () => base.$('.modal-header .close-btn').exists()
	};
};

export const createModal =
	(props: ModalProps,
		modalHeader?: JSX.Element,
		modalBody?: JSX.Element,
		modalFooter?: JSX.Element): ModalDriver => {

		const elem = renderAndMountComponent(
			<Modal {...props}>
				{modalHeader}
				{modalBody}
				{modalFooter}
			</Modal>
		);
		return createModalDriver(reactUniDriver(elem));
	};
