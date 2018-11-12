import { spy } from 'sinon';
import { assert } from 'chai';
import { testViewCompPropsCreator, renderAndMountComp, getFormattedDateString } from 'answers-toolkit';
import { reactUniDriver } from 'unidriver';
import { createDatePickerDriver } from './driver';
import { noop } from '../../common';
import { DatePicker, DatePickerProps } from '.';
import * as jsdomGlobal from 'jsdom-global';

const propsCreator = testViewCompPropsCreator<DatePickerProps>(() => ({
	value: getFormattedDateString(new Date()),
	onChange: noop,
}));

const setup = (partialProps: Partial<DatePickerProps>) => {
	const props = propsCreator(partialProps);
	const elem = renderAndMountComp<DatePickerProps>(DatePicker, props);
	const baseDriver = reactUniDriver(elem);
	return createDatePickerDriver(baseDriver);
};

describe('DatePicker', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
		document.body.innerHTML = '';
	});

	afterEach(() => {
		cleanup();
	});

	it('Shows the current day, month and year', async () => {
		const value = '2018-05-15';
		const driver = setup({value});

		assert.equal(await driver.selectedDay(), '15');
		assert.equal(await driver.selectedMonth(), 'May');
		assert.equal(await driver.selectedYear(), '2018');
	});

	it('Calls cb when changing a date', async () => {
		const value = '2016-12-05';
		const onChange = spy();
		const driver = setup({onChange, value});

		await driver.clickDay(2);
		const expectedDate = '2016-12-02';
		assert.equal(onChange.called, true);
		assert.equal(onChange.lastCall.args[0], expectedDate);
	});

	it('Shows next month when clicking next', async () => {
		const value = '2016-12-05';
		const driver = setup({value});

		await driver.clickNextMonth();
		assert.equal(await driver.selectedMonth(), 'January');
	});
});
