import {keyCodes} from './../..';
import {Simulate} from 'react-dom/test-utils';

export class SuperLegacyBaseDriver {
	elem: HTMLElement;

	constructor (elem: any) {
		this.elem = elem;
	}

	find (selector: string): Element {
		return this.elem.querySelector(selector) as Element;
	}

	findAll (selector: string): Element[] {
		const elems = this.elem.querySelectorAll(selector);
		return Array.prototype.slice.call(elems);
	}

	getAllTextBySelector (selector: string): string[] {
		return this.findAll(selector).map((e) => e.textContent || '');
	}

	getText (selector: string): string {
		return this.find(selector).textContent || '';
	}

	isChecked (selector: string): boolean {
		const elem = this.elem.querySelector(selector + ':checked');
		return elem ? true : false;
	}

	clickOn (selector: string) {
		const event = document.createEvent('HTMLEvents');
		event.initEvent('click', true, false);
		this.find(selector).dispatchEvent(event);
	}

	clickOnElement (elem: Element) {
		if (!elem) {
			throw new Error ('Element does not exist. Unable to click on it');
		}

		const event = document.createEvent('HTMLEvents');
		event.initEvent('click', true, false);
		elem.dispatchEvent(event);
		// Simulate.click(elem);
	}

	mouseDownOnElement (elem: Element) {
		if (!elem) {
			throw new Error ('Element does not exist. Unable to click on it');
		}

		const event = document.createEvent('HTMLEvents');
		event.initEvent('mousedown', true, false);
		Simulate.mouseDown(elem);
	}

	test () {
		const event = document.createEvent('HTMLEvents');
		event.initEvent('mousedown', true, false);
		Simulate.mouseDown(document.body);
	}

	getInputValue (selector: string): string {
		const elem = this.find(selector) as HTMLInputElement;
		return elem.value;
	}

	getInputValueByElement (elem: Element): string {
		if (!elem) {
			throw new Error ('Element does not exist. Unable to click on it');
		} else {
			const input = elem as HTMLInputElement;
			return input.value;
		}
	}

	enterValue (selector: string, newValue: string) {
		const elem = this.find(selector) as HTMLInputElement;
		elem.value = newValue;
		Simulate.change(elem);
	}

	enterValueByElem (elem: Element, newValue: string) {
		if (!elem) {
			throw new Error ('Element does not exist. Unable to click on it');
		} else {
			const input = elem as HTMLInputElement;
			input.value = newValue;
			Simulate.change(elem);
		}
	}

	simulateKeyPress (selector: string, keyCode: number) {
		const elem = this.find(selector) as HTMLInputElement;
		const keysMap: any = keyCodes;
		const keyName = Object.keys(keyCodes).reduce((prev: any, curr: any) => prev || (keysMap[curr] === keyCode ? curr : null), null) || 'n/a';
		Simulate.keyDown(elem, {key: keyName, keyCode, which: keyCode});
	}

	simulateEnterPressOn (selector: string) {
		return this.simulateKeyPress(selector, keyCodes.enter);
	}

	simulateMouseEnter (selector: string) {
		const elem = this.find(selector) as HTMLElement;
		Simulate.mouseOver(elem);
	}

	isChildVisible (selector: string): boolean {
		return !!this.find(selector);
	}

	isVisible (): boolean {
		return this.elem ? true : false;
	}

	hasClass (selector: string, className: string): boolean {
		return this.find(selector).classList.contains(className);
	}

	numericalValueOf (selector: string): number {
		return parseInt(this.find(selector).textContent || '', 10);
	}

	attributeOf (selector: string, attr: string): string {
		return this.find(selector).getAttribute(attr) || '';
	}

	numericalAttributeOf (selector: string, attr: string): number {
		return parseInt(this.find(selector).getAttribute(attr) || '', 10);
	}

	numericalAttributeListOf (selector: string, attr: string): number[] {

		return this.findAll(selector)
		.map((e) => parseInt(e.getAttribute(attr) || '', 10));
	}

	findByText (selector: string, text: string): Element {
		return this.findAll(selector)
			.filter((e) => e.textContent === text)[0];
	}

	findInPopover (selector: string): Element {
		return document.body.querySelector('.Popover ' + selector) as Element;
	}

	findAllInPopover (selector: string): Element[] {
		return Array.prototype.slice.call(document.body.querySelectorAll('.Popover ' + selector));
	}

	clickOnNthChild (selector: string, idx: number) {
		const elem = this.find(`${selector}:nth-child(${idx + 1})`);
		this.clickOnElement(elem);
	}

	changeCheckboxValue (selector: string, value: boolean) {
		(this.find(selector) as any).checked = value;
		this.enterValue(selector, value.toString());
	}

	simulateMouseLeave (selector: string) {
		const elem = this.find(selector) as HTMLElement;
		Simulate.mouseOut(elem);
	}
}

// export class BaseFactory {
// 	static create<T>()
// }
