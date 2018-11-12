import { UniDriver } from 'unidriver';
import { InfoBoxKey } from '.';

export type InfoBoxDriver = {
	bodyText: () => Promise<string>;
	titleText: () => Promise<string>;
	toggleExpand: () => Promise<void>;
	toggleExpandText: () => Promise<string>;
	hasToggleExpand: () => Promise<boolean>;
	base: UniDriver
};

export const createInfoBoxDriver = (wrapper: UniDriver): InfoBoxDriver => {
	const base = wrapper.$(`.${InfoBoxKey}`);
	const toggleExpandBtn = base.$('.toggle-expand');
	return {
		bodyText: base.$('.body-container').text,
		titleText: base.$('.title-container').text,
		toggleExpand: toggleExpandBtn.click,
		toggleExpandText: toggleExpandBtn.text,
		hasToggleExpand: toggleExpandBtn.exists,
		base
	};
};
