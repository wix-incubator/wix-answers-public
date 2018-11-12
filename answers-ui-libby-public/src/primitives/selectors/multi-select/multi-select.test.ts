
import {expect} from 'chai';
import * as sinon from 'sinon';

import * as driver from './multi-select.legacy-driver';
import * as jsdomGlobal from 'jsdom-global';
import { SelectOption } from '../common';

describe('Multi Select', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	const dummy = (): null => null;
	const placeholder = 'Select option';
	const options: SelectOption[] = [
		{ value: 1, label: 'First Option' },
		{ value: 2, label: 'Second Option' },
		{ value: 3, label: 'Third Option' }
	];

	it('Should have the loaded options', () => {
		const value: SelectOption[] = [];
		const expectedTitles = options.map((o) => o.label);

		const comp = driver.createMultiSelect({ value, options, placeholder, onChange: dummy });
		expect(comp.getSelectionTitles()).to.eql(expectedTitles);
	});

	it('Should have multiple values selected', () => {
		const value = options;
		const expectedTitles = options.map((o) => o.label);

		const comp = driver.createMultiSelect({ value, options, placeholder, onChange: dummy });
		expect(comp.getSelectedValues()).to.eql(expectedTitles);
	});

	it('Should call cb when selecting an option', () => {
		const value = options[0];
		const indexToSelect = 1;
		const spy = sinon.spy();

		const comp = driver.createMultiSelect({ value, options, placeholder, onChange: spy });
		expect(spy.called).to.eql(false);
		comp.selectAtIndex(indexToSelect);
		expect(spy.called).to.eql(true);
		expect(spy.lastCall.args[0]).to.eql([value, options[indexToSelect + 1]]);
	});

	it('Should be able to select an option by an option class name', () => {
		const optionsWithClass = options.map((option, i) => ({...option, className: `option-${i + 1}`}));
		const value: SelectOption[] = [];
		const spy = sinon.spy();
		const classNameToSelect = 'option-1';

		const comp = driver.createMultiSelect({ value, options: optionsWithClass, placeholder, onChange: spy });
		expect(spy.called).to.eql(false);
		comp.selectByOptionClassName(classNameToSelect);
		expect(spy.called).to.eql(true);
	});
});
