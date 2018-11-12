import * as React from 'react';
import {expect} from 'chai';
import * as sinon from 'sinon';
import * as jsdomGlobal from 'jsdom-global';
import { SelectOption } from '../common';
import { SelectProps, Select } from './select';
import { renderAndMountComponent, noop } from 'answers-toolkit';
import { createSelectDriver, SelectDriver } from './driver';
import { reactUniDriver } from 'unidriver';

const createDriver = (props: SelectProps): SelectDriver => {
	const elem = renderAndMountComponent(<Select {...props} />);
	return createSelectDriver(reactUniDriver(elem));
};

describe('select', () => {
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

	it('Should have the loaded options', async () => {
		const value = options[0];
		const expectedTitles = options.map((o) => o.label);

		const comp = createDriver({ value, options, placeholder, onChange: dummy });
		expect(await comp.getSelectionTitles()).to.eql(expectedTitles);
	});

	it('Should have the loaded options', async () => {
		const value = options[0];

		const comp = createDriver({ value, options, placeholder, onChange: dummy });
		expect(await comp.getSelectedValue()).to.eql(value.label);
	});

	it('Should call cb when selecting an option', async () => {
		const value = options[0];
		const indexToSelect = 1;
		const spy = sinon.spy();

		const comp = createDriver({ value, options, placeholder, onChange: spy });
		expect(spy.called).to.eql(false);
		await comp.selectAtIndex(indexToSelect);
		expect(spy.called).to.eql(true);
		expect(spy.lastCall.args).to.eql([options[indexToSelect]]);
	});

	it('Should be able to select an option by an option class name', async () => {
		const optionsWithClass = options.map((option, i) => ({...option, className: `option-${i + 1}`}));
		const value = optionsWithClass[0];
		const spy = sinon.spy();
		const classNameToSelect = 'option-1';

		const comp = createDriver({ value, options: optionsWithClass, placeholder, onChange: spy });
		expect(spy.called).to.eql(false);
		await comp.selectByOptionClassName(classNameToSelect);
		expect(spy.called).to.eql(true);
	});

	it('disables select', async () => {
		const disabled = true;
		const comp = createDriver({value: options[0], disabled, onChange: noop, options, placeholder});
		expect(await comp.isDisabled()).to.eql(true);
	});
});
