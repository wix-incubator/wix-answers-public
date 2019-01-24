import { UniDriver } from 'unidriver';

export interface LinkButtonDriver {
	click: () => Promise<void>;
	getText: () => Promise<string>;
	isDisabled: () => Promise<boolean>;
}

export const createLinkButtonDriver = (wrapper: UniDriver): LinkButtonDriver => {
	const base = wrapper.$(`.link-button`);

	return {
		click: () => base.click(),
		getText: () => base.text(),
		isDisabled: async () => base.hasClass('disabled')
	};
};
