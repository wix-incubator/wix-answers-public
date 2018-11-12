import * as React from 'react';
import { getLegacyBaseDriverFromWrapper } from '../../drivers';
import { renderAndMountComponent } from 'answers-lib';
import { DrillMenuItem, DrillMenuItemProps } from './drill-menu-item';

export type DrillMenuItemDriver = {
	isDisabled: () => boolean;
	click: () => void;
};

export const createDrillMenuItemDriver = (wrapper: Element): DrillMenuItemDriver => {
	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, `.drill-menu-item`, DrillMenuItem.name);

	return {
		isDisabled: () => baseDriver.hasClass('disabled'),
		click: () => baseDriver.click()
	};
};

export const createDrillMenuItem = (props: DrillMenuItemProps): DrillMenuItemDriver => {
	const elem = renderAndMountComponent(<DrillMenuItem {...props}>{props.children}</DrillMenuItem>);
	return createDrillMenuItemDriver(elem);
};
