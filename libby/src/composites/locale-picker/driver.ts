import { Locale } from './locale-picker.comp';
import { UniDriver } from 'unidriver';
import { popoverDriver } from '../../primitives/popover/driver';
import { createFloaterMenuDriver } from '../floater-menu/driver';

export type LocalePickerDriver = {
	getPickedLocaleText: () => Promise<string>,
	getPickedLocale: () => Promise<Locale>,
	pickLocale: (Locale: Locale) => Promise<void>,
	base: UniDriver
};

export const createLocalePickerDriver = (wrapper: UniDriver, global: UniDriver): LocalePickerDriver => {
	const base = wrapper.$(`.locale-picker`);
	const popover = popoverDriver(global);

	return {
		getPickedLocaleText: () => base.$('.picked-locale').text(),
		getPickedLocale: () => base.$('.picked-locale').attr('value'),
		pickLocale: async (locale: Locale) => {
			await base.$('.link-button').click();
			const elem = await popover.$(`.locale-menu-wrapper`);
			if (await elem.exists()) {
				await createFloaterMenuDriver(elem).selectByValue(locale);
			}
		},
		base
	};
};
