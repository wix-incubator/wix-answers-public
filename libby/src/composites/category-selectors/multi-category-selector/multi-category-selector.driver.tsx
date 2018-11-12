import * as React from 'react';
import { MultiCategorySelector, MultiCategorySelectorProps} from './multi-category-selector.comp';
import { renderAndMountComponent } from 'answers-lib';
import {
	getLegacyBaseDriverFromWrapper, MultiSelectLegacyDriver, createMultiSelectLegacyDriver
} from '../../../drivers';

export type MultiCategorySelectorDriver = MultiSelectLegacyDriver;

export const createMultiCategorySelectorDriver = (wrapper: Element): MultiCategorySelectorDriver => {
	const base = getLegacyBaseDriverFromWrapper(wrapper, '.multi-category-selector', MultiCategorySelector.name);
	return createMultiSelectLegacyDriver(base.elem);
};

export const renderMultiCategorySelectorAndReturnDriver =
	(props: MultiCategorySelectorProps): MultiCategorySelectorDriver => {
		const elem = renderAndMountComponent(<MultiCategorySelector {...props}/>);
		return createMultiCategorySelectorDriver(elem);
	};
