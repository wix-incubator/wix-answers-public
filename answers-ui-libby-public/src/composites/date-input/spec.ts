import { assert } from 'chai';
import { reactUniDriver } from 'unidriver';
import { DateInput, DateInputProps } from './';
import { createDateInputDriver } from './driver';
import { noop } from '../../common';
import { getFormattedDateString, cleanPopovers, testViewCompPropsCreator, renderAndMountComp } from 'answers-toolkit';
import { spy } from 'sinon';

const propsCreator = testViewCompPropsCreator<DateInputProps>(() => ({
	value: getFormattedDateString(new Date()),
	onChange: noop
}));

const setup = (partialProps: Partial<DateInputProps>) => {
	const props = propsCreator(partialProps);
	const elem = renderAndMountComp<DateInputProps>(DateInput, props);
	const baseDriver = reactUniDriver(elem);
	const global = reactUniDriver(document.body);
	return createDateInputDriver(baseDriver, global);
};

describe('DateInput', () => {
	beforeEach(cleanPopovers);

	it('shows date in default format', async () => {
		const value = '2018-01-22';
		const driver = setup({value});
		assert.equal(await driver.date(), '22/1/2018');
	});

	it('shows date in custom format', async () => {
		const value = '2018-01-22';
		const driver = setup({value, dateFormat: 'Y/M/D'});
		assert.equal(await driver.date(), '2018/1/22');
	});

	it('calls cb on change date', async () => {
		const value = '2018-01-22';
		const onChange = spy();
		const driver = setup({value, onChange});

		await driver.openCalendar();
		assert.equal(onChange.called, false);

		await driver.datePicker.clickDay(5);

		assert.equal(onChange.called, true);
		assert.deepEqual(onChange.lastCall.args, ['2018-01-05']);
	});

	it('doesnt change date if disabled', async () => {
		const onChange = spy();
		const driver = setup({onChange, disabled: 'disabled text'});

		await driver.openCalendar();

		assert.equal(onChange.called, false);
		assert.equal(await driver.datePicker.base.exists(), false);
	});
});
