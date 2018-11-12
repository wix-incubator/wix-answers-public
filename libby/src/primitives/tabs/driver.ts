import { UniDriver } from 'unidriver';

export type TabsDriver = {
	getTabTexts: () => Promise<string[]>;
	getSelected: () => Promise<string>;
	getSelectedIdx: () => Promise<number>;
	selectTab: (idx: number) => Promise<any>;
};

export const createTabsDriver = (wrapper: UniDriver): TabsDriver => {
	const base = wrapper.$(`.tabs`);
	return {
		getTabTexts: () => base.$$('.tab').text(),
		getSelected: () => base.$('.selected').text(),
		getSelectedIdx: () => base.$$('.tab').map((item) => {
			return item.$('.selected').exists();
		}).then((list) => list.indexOf(true)),
		selectTab: (idx: number) => base.$$('.tab').get(idx).click()
	};
};
