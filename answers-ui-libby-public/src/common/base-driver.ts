import {namespaceClassName} from './namespace-classes';
import {Simulate} from 'react-dom/test-utils';
import { eventually, ensureExists } from 'answers-toolkit';

export type LegacyBaseDriver = {
	getText: () => string;
	getInnerHtml: () => string;
	elem: Element;
	click: () => void;
	find: (selector: string) => LegacyBaseDriver;
	findAll: (selector: string) => LegacyBaseDriverList;
	isChildVisible: (selector: string) => boolean;
	enterValue: (value: string) => void;
	pressKey: (keyCode: number) => void;
	getDataAttr: (name: string) => string;
	getAttribute: (name: string) => string;
	hasClass: (name: string) => boolean;
	mouseOver: () => void;
	mouseOut: () => void;
	mouseEnter: () => void;
	mouseDown: () => void;
	waitUntilVisible: (selector: string) => Promise<void>;
};

export type MapFn<T> = (e: LegacyBaseDriver, idx: number, array: LegacyBaseDriver[]) => T;

export type LegacyBaseDriverList = {
	count: () => number,
	map: <T>(fn: MapFn<T>) => T[],
	filter: (fn: (e: LegacyBaseDriver, idx: number) => boolean) => LegacyBaseDriverList,
	toArray: () => LegacyBaseDriver[],
	get: (idx: number) => LegacyBaseDriver,
	getText: () => string[],
	getAttribute: (name: string) => string[];
	clickOn: (idx: number) => void;
};

export const createBaseDriverList = (drivers: LegacyBaseDriver[]): LegacyBaseDriverList => {
	const list: LegacyBaseDriverList = {
		count: () => drivers.length,
		map: <T>(fn: MapFn<T>) => drivers.map(fn),
		filter: (fn: (e: LegacyBaseDriver, idx: number) => boolean) => createBaseDriverList(drivers.filter(fn)),
		get: (idx) => drivers[idx],
		toArray: () => drivers,
		getText: () => drivers.map((d) => d.getText()),
		getAttribute: (name: string) => drivers.map((d) => d.getAttribute(name)),
		clickOn: (idx: number) => list.get(idx).click()
	};

	return list;
};

export const simulateClick = (elem: Element) => {
	const event: any = document.createEvent('HTMLEvents');
	event.initEvent('click', true, false);

	// tslint:disable:max-line-length
	// setting button 0 is now needed in React 16+ as it's not set by react anymore
	// 15 - https://github.com/facebook/react/blob/v15.6.1/src/renderers/dom/client/syntheticEvents/SyntheticMouseEvent.js#L45
	// 16 - https://github.com/facebook/react/blob/master/packages/react-dom/src/events/SyntheticMouseEvent.js#L33
	event.button = 0;
	elem.dispatchEvent(event);
};

export const simulateBlur = (elem: Element) => {
	const event = document.createEvent('HTMLEvents');
	event.initEvent('blur', true, false);
	elem.dispatchEvent(event);
};

export const enterValue = (elem: any, value: string) => {
	elem.value = value;
	Simulate.change(elem);
};

export const pressKey = (elem: any, keyCode: number) => {
	const event: any = new Event('keydown', {bubbles: true});
	event.keyCode = keyCode;
	elem.dispatchEvent(event);
};

export const simulateMouseOver = (elem: Element) => {
	Simulate.mouseOver(elem);
};

export const simulateMouseOut = (elem: Element) => {
	Simulate.mouseOut(elem);
};

export const isBaseDriver = (elemOrDriver: Element | LegacyBaseDriver): elemOrDriver is LegacyBaseDriver => {
	return !!(elemOrDriver as LegacyBaseDriver).findAll;
};

export const getBaseReactDriver = (elemOrDriver: Element | LegacyBaseDriver): LegacyBaseDriver => {
	const elem = isBaseDriver(elemOrDriver) ? elemOrDriver.elem : elemOrDriver;

	const isChildVisible = (selector: string) => !!elem.querySelector(selector);
	const baseDriver: LegacyBaseDriver = {
		getText: () => elem.textContent || '',
		elem,
		find: (selector) => {
			const child = ensureExists(elem.querySelector(selector), `Element with selector ${selector} does not exist`);
			return getBaseReactDriver(child as Element);
		},
		getAttribute: (name) => elem.getAttribute(name) || '',
		findAll: (selector) => {
			const bds = Array.prototype.slice.call(elem.querySelectorAll(selector)).map(getBaseReactDriver);
			return createBaseDriverList(bds);
		},
		isChildVisible,
		waitUntilVisible: (selector) => {
			return eventually(() => isChildVisible(selector));
		},
		click: () => {
			simulateClick(elem);
		},
		enterValue: (value) => {
			enterValue(elem, value);
		},
		pressKey: (keyCode) => {
			pressKey(elem, keyCode);
		},
		getDataAttr: (name: string) => elem.getAttribute(`data-${name}`) || '',
		getInnerHtml: () => elem.innerHTML,
		hasClass: (name) => elem.classList.contains(name),
		mouseOver: () => {
			simulateMouseOver(elem);
		},
		mouseOut: () => {
			simulateMouseOut(elem);
		},
		mouseEnter: () => {
			Simulate.mouseEnter(elem);
		},
		mouseDown: () => {
			Simulate.mouseDown(elem);
		}
	};

	return baseDriver;
};

export const getLegacyBaseDriverFromWrapper = (wrapper: Element, selector: string, name: string): LegacyBaseDriver => {
	const namespacedSelector = `.${namespaceClassName}${selector}`;
	const elements = wrapper.querySelectorAll(namespacedSelector);
	if (elements.length === 0) {
		throw new Error(`Unable to locate ${name} component for given wrapper`);
	}

	if (elements.length > 1) {
		throw new Error(`There is more than one [${name}] for given wrapper. Please be more specific`);
	}

	return getBaseReactDriver(elements[0]);
};
