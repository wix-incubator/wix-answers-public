import * as React from 'react';
import {CategorySelector, CategorySelectorProps} from './category-selector.comp';
import { getLegacyBaseDriverFromWrapper, createSelectLegacyDriver, SelectLegacyDriver } from '../../../drivers';
import { renderAndMountComponent } from 'answers-lib';

export type CategorySelectorDriver = SelectLegacyDriver;

export const createCategorySelectorDriver = (wrapper: Element): CategorySelectorDriver => {
	const base = getLegacyBaseDriverFromWrapper(wrapper, '.category-selector', CategorySelector.name);
	return createSelectLegacyDriver(base.elem);
};

export const renderCategorySelectorAndReturnDriver = (props: CategorySelectorProps): CategorySelectorDriver => {
	const elem = renderAndMountComponent(<CategorySelector {...props}/>);
	return createCategorySelectorDriver(elem);
};
