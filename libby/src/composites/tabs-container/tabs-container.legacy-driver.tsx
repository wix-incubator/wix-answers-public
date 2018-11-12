import * as React from 'react';
import { getLegacyBaseDriverFromWrapper } from '../../common/base-driver';
import { createTabsDriverLegacyDriver } from '../../primitives/tabs/tabs.legacy-driver';
import { renderAndMountComponent } from 'answers-lib';
import { TabsContainerProps, TabsContainer } from './tabs-container';

export type TabsContainerDriverLegacyDriver = {
	getTabTexts: () => string[];
	selectTabAtIndex: (idx: number) => void;
	getSelected: () => string;
};

export const createTabsContainerDriverLegacyDriver = (wrapper: Element) => {
	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, '.tabs-container', 'tabs-container');
	const tabsDriver = createTabsDriverLegacyDriver(baseDriver.elem);

	return {
		getTabTexts: () => {
			return tabsDriver.getTabTexts();
		},
		getSelected: () => {
			return tabsDriver.getSelected();
		},
		selectTabAtIndex: (idx: number) => {
			return tabsDriver.selectTab(idx);
		}
	};
};

export const createTabsContainer = (props: TabsContainerProps): TabsContainerDriverLegacyDriver => {
	const elem = renderAndMountComponent(<TabsContainer {...props} />);
	return createTabsContainerDriverLegacyDriver(elem);
};
