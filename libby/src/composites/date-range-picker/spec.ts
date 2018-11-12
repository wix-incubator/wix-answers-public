import { spy } from 'sinon';
import { assert } from 'chai';
import { getFormattedDateString, testViewCompPropsCreator, renderAndMountComp } from 'answers-lib';
import { reactUniDriver } from 'unidriver';
import { DateRangePicker, DateRangePickerProps } from '.';
import { createDateRangePickerDriver } from './driver';
import { noop } from '../../common';

const propsCreator = testViewCompPropsCreator<DateRangePickerProps>(() => ({
	value: {
		startDate: '2018-05-01',
		endDate: '2018-05-07'
	},
	onChange: noop
}));

const setup = (partialProps: Partial<DateRangePickerProps>) => {
	const props = propsCreator(partialProps);
	const elem = renderAndMountComp<DateRangePickerProps>(DateRangePicker, props);
	const baseDriver = reactUniDriver(elem);
	return createDateRangePickerDriver(baseDriver);
};

describe('DateRangePicker', () => {
	it('Shows the current range', async () => {
		const driver = setup({});
		const expectedRangeStart = '1';
		const expectedRangeEnd = '7';

		assert.equal(await driver.rangeStartDay(), expectedRangeStart);
		assert.equal(await driver.rangeEndDay(), expectedRangeEnd);
	});

	it('Calls cb when changing the selected range', async () => {
		const onChange = spy();
		const value = {
			startDate: '2018-05-01',
			endDate: '2018-05-05'
		};

		const driver = setup({value, onChange});

		await driver.clickDay(2);
		await driver.clickDay(10);

		const expectedValue = {
			startDate: '2018-05-02',
			endDate: '2018-05-10'
		};
		assert.equal(onChange.called, true);
		assert.deepEqual(onChange.lastCall.args[0], expectedValue);
	});

	it('Calls cb when selecting a predefined range', async () => {
		const onChange = spy();
		const driver = setup({onChange});

		await driver.selectPredefinedRange(2);

		const dEnd = new Date();
		dEnd.setDate(dEnd.getDate() - 1);

		const dStart = new Date();
		dStart.setDate(dStart.getDate() - 30);

		const expectedValue = {
			startDate: getFormattedDateString(dStart),
			endDate: getFormattedDateString(dEnd)
		};

		assert.equal(onChange.called, true);
		assert.deepEqual(onChange.lastCall.args[0], expectedValue);
	});
});
