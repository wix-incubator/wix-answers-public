import { UniDriver } from 'unidriver';
import { alertModalKey } from './alert-modal.comp';

export const createAlertModalDriver = (wrapper: UniDriver) => {
	const base = wrapper.$(`.${alertModalKey}`);
	return {
		text: () => base.$('.body').text(),
		close: () => base.$('.close').click(),
		base
	};
};
