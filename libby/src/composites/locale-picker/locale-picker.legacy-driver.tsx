import * as React from 'react';
import { getBaseReactDriver, createLegacyFloaterMenuDriver } from '../../drivers';
import { renderAndMountComponent } from 'answers-lib';
import { LocalePicker, LocalePickerProps, Locale } from './locale-picker.comp';
import { LegacyBaseDriver } from '../../common/base-driver';
import { findInPopover } from '../../common/find-in-popover';

export type LegacyLocalePickerDriver = {
	getPickedLocaleText: () => string,
	getPickedLocale: () => Locale,
	pickLocale: (Locale: Locale) => void,
	base: LegacyBaseDriver
};

// tslint:disable-next-line:max-line-length
export const createLegacyLocalePickerDriver = (elemOrBaseDriver: Element | LegacyBaseDriver): LegacyLocalePickerDriver => {
	const base = getBaseReactDriver(elemOrBaseDriver);
	return {
		getPickedLocaleText: () => base.find('.picked-locale').getText(),
		getPickedLocale: () => base.find('.picked-locale').getDataAttr('value'),
		pickLocale: (locale: Locale) => {
			base.find('.link-button').click();
			const elem = findInPopover(`.locale-menu-wrapper`).elem;
			if (elem) {
				createLegacyFloaterMenuDriver(elem).selectByValue(locale);
			}
		},
		base,
	};
};

export const renderLegacyLocalePickerAndReturnDriver = (props: LocalePickerProps): LegacyLocalePickerDriver => {
	const elem = renderAndMountComponent(<LocalePicker {...props} />);
	return createLegacyLocalePickerDriver(elem);
};
