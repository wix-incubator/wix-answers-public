import { UniDriver } from 'unidriver';
import { SideBarKey } from '.';

export type SideBarDriver = {
	hasHeader: () => Promise<boolean>;
	base: UniDriver
};

export const createSideBarDriver = (wrapper: UniDriver): SideBarDriver => {
	const base = wrapper.$(`.${SideBarKey}`);
	return {
		hasHeader: () => base.$('.side-bar-header').exists(),
		base
	};
};
