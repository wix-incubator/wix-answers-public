import { keyCodes, withMeta } from './key-handled-list/key-handled-list.comp';
import * as React from 'react';
import { getBaseReactDriver } from '../../drivers';
import { renderAndMountComponent } from 'answers-lib';
import {FloaterSelect, FloaterSelectProps} from './floater-select.comp';
import { LegacyBaseDriver } from '../../common/base-driver';

export type LegacyFloaterSelectDriver = {
	getItemsContent: () => any[],
	search: (term: string) => void,
	isLoading: () => boolean,
	pressDownKey: () => void,
	pressEnterKey: () => void,
	select: (idx: number) => void,
	base: LegacyBaseDriver
};

// tslint:disable-next-line:max-line-length
export function createLegacyFloaterSelectDriver (elem: Element): LegacyFloaterSelectDriver {
	const base = getBaseReactDriver(elem);
	const searchField = base.find('input.search-field');
	return {
		getItemsContent: () => base.findAll('.floater-select-item').map((item) => item.getText()),
		search: (term: string) => searchField.enterValue(term),
		pressDownKey: () => searchField.pressKey(keyCodes.downArrow),
		pressEnterKey: () => searchField.pressKey(keyCodes.enter),
		isLoading: () => base.isChildVisible('.loader'),
		select: (idx: number) => base.findAll('.floater-select-item').get(idx).mouseDown(),
		base
	};
}

export function renderLegacyFloaterSelectAndReturnDriver<T extends withMeta> (
		props: FloaterSelectProps<T>
	): LegacyFloaterSelectDriver {
	const elem = renderAndMountComponent(<FloaterSelect {...props} />);
	return createLegacyFloaterSelectDriver(elem);
}
