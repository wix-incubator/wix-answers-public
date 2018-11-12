import { getBaseReactDriver } from '../../drivers';
import * as React from 'react';
import { renderAndMountComponent } from 'answers-toolkit';
import { AlertModal, AlertModalProps } from './alert-modal.comp';
import { LegacyBaseDriver } from '../../common/base-driver';

export type AlertModalDriver = {
	getText: () => string,
	close: () => void,
	base: LegacyBaseDriver
};

// tslint:disable-next-line:max-line-length
export const createLegacyAlertModalDriver = (elemOrLegacyBaseDriver: Element | LegacyBaseDriver): AlertModalDriver => {
	const base = getBaseReactDriver(elemOrLegacyBaseDriver);
	return {
		getText: () => base.find('.body').getText(),
		close: () => base.find('.close').click(),
		base
	};
};

export const renderAlertModalAndReturnDriver = (props: AlertModalProps): AlertModalDriver => {
	const elem = renderAndMountComponent(<AlertModal {...props} />);
	return createLegacyAlertModalDriver(elem);
};
