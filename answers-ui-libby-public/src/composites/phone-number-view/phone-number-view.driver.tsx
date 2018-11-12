import * as React from 'react';
import { getLegacyBaseDriverFromWrapper } from '../../common/base-driver';
import { renderAndMountComponent } from 'answers-toolkit';
import { PhoneNumberViewProps, PhoneNumberView } from './phone-number-view';
import { createLinkButtonDriver } from '../../primitives/buttons/link-button/link-button.driver';
import { createPositiveButtonDriver } from '../../primitives/buttons/button/button.driver';
import { createSelectLegacyDriver } from '../../primitives/selectors/single-select/select.legacy-driver';
import { findInPopover } from '../../common/find-in-popover';

export type PhoneNumberViewDriver = {
	getPhoneNumber: () => string;
	getLinesList: () => string[];
	selectLine: (index: number) => void;
	clickPhoneNumber: () => void;
	clickCallButton: () => void;
};

export const createPhoneNumberViewDriver = (wrapper: Element): PhoneNumberViewDriver => {
	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, '.phone-number-view', PhoneNumberView.name);
	const openPopover = () => {
		baseDriver.find('.phone-number').click();
		const elem = findInPopover('.call-actions-body').elem;
		return { elem };
	};

	return {
		getPhoneNumber: () => baseDriver.find('.phone-number').getText(),
		getLinesList: () => {
			const { elem } = openPopover();
			if (elem) {
				return createSelectLegacyDriver(elem).getSelectionTitles();
			}
			return [];
		},
		selectLine: (index: number = 0) => {
			const { elem } = openPopover();
			if (elem) {
				createSelectLegacyDriver(elem).selectAtIndex(index);
			}
		},
		clickPhoneNumber: () => createLinkButtonDriver(baseDriver.elem).click(),
		clickCallButton: () => {
			const { elem } = openPopover();
			if (elem) {
				createPositiveButtonDriver(elem).click();
			}
		}
	};
};

export const createPhoneNumberView = (props: PhoneNumberViewProps): PhoneNumberViewDriver => {
	const elem = renderAndMountComponent(<PhoneNumberView {...props} />);
	return createPhoneNumberViewDriver(elem);
};
