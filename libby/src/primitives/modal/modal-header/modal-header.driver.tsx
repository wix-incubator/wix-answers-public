import * as React from 'react';
import { getLegacyBaseDriverFromWrapper } from '../../../common/base-driver';
import { ModalHeader, ModalHeaderProps } from './modal-header';
import { renderAndMountComponent } from 'answers-lib';
import { createLinkButtonDriver } from '../../buttons/link-button/link-button.driver';

export type ModalHeaderDriver = {
	clickBack: () => void;
};

export const createModalHeaderDriver = (wrapper: Element) => {
	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, '.modal-header', ModalHeader.name);

	return {
		clickBack: () => createLinkButtonDriver(baseDriver.elem).click(),
	};
};

export const createModalHeader = (props: ModalHeaderProps): ModalHeaderDriver => {
	const elem = renderAndMountComponent(<ModalHeader {...props} />);
	return createModalHeaderDriver(elem);
};
