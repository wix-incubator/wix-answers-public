import { getLegacyBaseDriverFromWrapper } from '../../drivers';
import { renderAndMountComponent } from 'answers-lib';
import * as React from 'react';

import {TabsProps, Tabs} from './tabs';

export type TabsDriverLegacyDriver = {
	getTabTexts: () => string[],
	getSelected: () => string;
	selectTab: (idx: number) => void;
};

export const createTabsDriverLegacyDriver = (wrapper: Element) => {

	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, '.tabs', 'tabs');
	return {
		getTabTexts: () => {
		return baseDriver.findAll('.tab').getText();
		},
		getSelected: () => {
			return baseDriver.find('.selected').getText();
		},
		selectTab: (idx: number) => {
			baseDriver.findAll(`.tab`).clickOn(idx);
		}
	};
};

export const createTabs = (props: TabsProps): TabsDriverLegacyDriver => {
	const elem = renderAndMountComponent(<Tabs {...props} />);
	return createTabsDriverLegacyDriver(elem);
};
