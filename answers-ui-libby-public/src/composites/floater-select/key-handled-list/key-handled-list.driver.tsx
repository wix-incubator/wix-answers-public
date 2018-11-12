import {createItemsWithSearch} from './test-utils/key-handler-test-comps';
import {keyCodes, createKeyHandledList} from './key-handled-list.comp';
import * as React from 'react';
import { getBaseReactDriver } from '../../../drivers';
import { renderAndMountComponent } from 'answers-toolkit';
import { LegacyBaseDriver } from '../../../common/base-driver';
import {Simulate} from 'react-dom/test-utils';

export type KeyHandledListDriver = {
	getAllTextBySelector: (selector: string) => string[];
	getSelectedItemText: (selector: string) => string;
	simulateKeyPress: (selector: string, keyCode: number) => void;
	base: LegacyBaseDriver;
};

export function createKeyHandledListDriver (elem: Element): KeyHandledListDriver {
	const base = getBaseReactDriver(elem);
	return {
		simulateKeyPress: (selector: string, keyCode: number) => {
			const element = base.find(selector).elem as HTMLInputElement;
			const keyName = Object.keys(keyCodes)
				.reduce((prev: any, curr: any) => prev || (keyCodes[curr] === keyCode ? curr : null), null) || 'n/a';
			Simulate.keyDown(element, {key: keyName, keyCode, which: keyCode});
		},
		getAllTextBySelector: (selector: string) => base.findAll(selector).map((item) => item.getText()),
		getSelectedItemText: (selector: string) => base.find(selector).getText(),
		base
	};
}

export function renderKeyHandledListAndReturnDriver<T extends {id: string}> (
		items: T[],
		itemRenderer: any,
		onSelect: any
	): KeyHandledListDriver {
	const keyHandledListData = createKeyHandledList(items, itemRenderer, onSelect);
	const elem = renderAndMountComponent(React.createElement(createItemsWithSearch(keyHandledListData)));
	return createKeyHandledListDriver(elem);
}
