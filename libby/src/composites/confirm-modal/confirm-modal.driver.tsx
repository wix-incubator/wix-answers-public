import { getBaseReactDriver } from '../../drivers';
import * as React from 'react';
import { renderAndMountComponent } from 'answers-lib';
import { ConfirmModal, ConfirmModalProps } from './confirm-modal.comp';
import { LegacyBaseDriver } from '../../common/base-driver';

export type ConfirmModalDriver = {
	getText: () => string,
	confirm: () => void,
	cancel: () => void,
	base: LegacyBaseDriver
};

// tslint:disable-next-line:max-line-length
export const createLegacyConfirmModalDriver = (elemOrLegacyBaseDriver: Element | LegacyBaseDriver): ConfirmModalDriver => {
	const base = getBaseReactDriver(elemOrLegacyBaseDriver);
	return {
		getText: () => base.find('.title').getText(),
		confirm: () => base.find('.confirm').click(),
		cancel: () => {
			base.find('.cancel').click();
		},
		base
	};
};

export const renderConfirmModalAndReturnDriver = (props: ConfirmModalProps): ConfirmModalDriver => {
	const elem = renderAndMountComponent(<ConfirmModal {...props} />);
	return createLegacyConfirmModalDriver(elem);
};
