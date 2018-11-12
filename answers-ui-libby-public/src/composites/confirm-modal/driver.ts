import { UniDriver } from 'unidriver';
import { confirmModalKey } from './confirm-modal.comp';

export const createConfirmModalDriver = (wrapper: UniDriver) => {
	const base = wrapper.$(`.${confirmModalKey}`);
	return {
		text: () => base.$('.title').text(),
		confirm: () => base.$('.confirm').click(),
		cancel: () => base.$('.cancel').click(),
		base
	};
};
