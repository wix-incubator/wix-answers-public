import { spy } from 'sinon';
import { assert } from 'chai';
import { testViewCompPropsCreator, renderAndMountComp } from 'answers-lib';
import { reactUniDriver } from 'unidriver';
import { DateRangeCompare, DateRangeCompareProps } from '.';
import { createDateRangeCompareDriver } from './driver';
import { noop } from '../../common';
import * as jsdomGlobal from 'jsdom-global';

const propsCreator = testViewCompPropsCreator<DateRangeCompareProps>(() => ({
	value: {startDate: '2018-05-01', endDate: '2018-05-07'},
	compareTo: {startDate: '2018-05-08', endDate: '2018-05-14'},
	onChange: noop,
}));

const setup = (partialProps: Partial<DateRangeCompareProps>) => {
	const props = propsCreator(partialProps);
	const elem = renderAndMountComp<DateRangeCompareProps>(DateRangeCompare, props);
	const baseDriver = reactUniDriver(elem);
	return createDateRangeCompareDriver(baseDriver);
};

describe('DateRangeCompare', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
		document.body.innerHTML = '';
	});

	afterEach(() => {
		cleanup();
	});

	it('Shows the selected range', async () => {
		const driver = setup({});

		assert.equal(await driver.rangeStartDay(), '1');
		assert.equal(await driver.rangeEndDay(), '7');
	});

	it('Calls cb when changing range based on range size', async () => {
		const onChange = spy();
		const value = {startDate: '2018-05-01', endDate: '2018-05-02'};
		const compareTo = {startDate: '2018-05-10', endDate: '2018-05-11'};
		const driver = setup({onChange, value, compareTo});

		await driver.clickDay(6);
		assert.equal(onChange.called, true);
		const expectedValue = {startDate: '2018-05-05', endDate: '2018-05-06'};
		assert.deepEqual(onChange.lastCall.args[0], expectedValue);
	});
});
