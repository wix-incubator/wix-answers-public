// import { FloaterMenu } from './floater-menu';
import { getLegacyBaseDriverFromWrapper } from '../../drivers';
// import {renderAndMountComponent } from 'answers-toolkit';
// import * as React from 'react';
import { deprecatedMsg } from 'answers-toolkit';

export type LegacyFloaterMenuDriver = {
	getItemsCount: () => number;
	clickOn: (idx: number) => void;
	selectByValue: (val: string) => void;
	select: (idx: number) => void;
};

export const createLegacyFloaterMenuDriver = (wrapper: Element): LegacyFloaterMenuDriver => {
	const classNames = `.floater-menu`;
	const baseDriver = getLegacyBaseDriverFromWrapper(wrapper, classNames, 'floater-menu');

	const select = (idx: number) => baseDriver.findAll('.menu-item').get(idx).click();
	return {
		getItemsCount: () => baseDriver.findAll('.menu-item').count(),
		clickOn: (idx: number) => {
			deprecatedMsg('Floater Menu driver - Click on is deprecated, use select instead');
			select(idx);
		},
		select,
		selectByValue: (val: string) => {

			const item = baseDriver
				.findAll('.menu-item')
				.filter((e) => e.getDataAttr('value') === val)
				.get(0);

			item.click();
		}
	};
};
