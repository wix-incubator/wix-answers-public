import { UniDriver } from 'unidriver';
import { StaticLabelKey } from '.';

export type StaticLabelDriver = {
	text: () => Promise<string>;
	hasIcon: () => Promise<boolean>;
	base: UniDriver
};

export const createStaticLabelDriver = (wrapper: UniDriver): StaticLabelDriver => {
	const base = wrapper.$(`.${StaticLabelKey}`);
	return {
		text: () => base.text(),
		hasIcon: () => base.$('.icon').exists(),
		base
	};
};
