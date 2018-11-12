import { UniDriver } from 'unidriver';
import { createTabsDriver } from '../../primitives/tabs/driver';

export type TabsContainerDriver = {
	getTabTexts: () => Promise<string[]>;
	getSelected: () => Promise<string>;
	getSelectedIdx: () => Promise<number>;
	selectTab: (idx: number) => Promise<any>;
};

export const createTabsContainerDriver = (wrapper: UniDriver): TabsContainerDriver => {
	const base = wrapper.$(`.tabs-container`);
	const tabsDriver = createTabsDriver(base);

	return {
		getTabTexts: () => tabsDriver.getTabTexts(),
		getSelected: () => tabsDriver.getSelected(),
		getSelectedIdx: () => tabsDriver.getSelectedIdx(),
		selectTab: (idx: number) => tabsDriver.selectTab(idx)
	};
};
