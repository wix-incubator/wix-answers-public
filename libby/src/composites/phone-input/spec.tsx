import { assert } from 'chai';
import { testViewCompPropsCreator, renderAndMountComp } from 'answers-lib';
import { reactUniDriver } from 'unidriver';

import { PhoneInput, PhoneInputProps } from '.';
import { createPhoneInputDriver } from './driver';
import { noop } from '../../common';
import { spy } from 'sinon';
import * as jsdomGlobal from 'jsdom-global';

const propsCreator = testViewCompPropsCreator<PhoneInputProps>(() => ({
	placeholder: '',
	value: {
		countryCode: '',
		number: ''
	},
	onChange: noop
}));

const setup = (partialProps: Partial<PhoneInputProps>) => {
	const props = propsCreator(partialProps);
	const elem = renderAndMountComp<PhoneInputProps>(PhoneInput, props);
	const baseDriver = reactUniDriver(elem);
	return createPhoneInputDriver(baseDriver);
};

describe('PhoneInput', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
		document.body.innerHTML = '';
	});

	afterEach(() => {
		cleanup();
	});

	it('Shows the phone number and calls cb on change', async () => {
		const value = {
			number: '526444444',
			countryCode: '972'
		};
		const onChange = spy();

		const driver = setup({value, onChange});
		const expectedNumber = '+972-5-264-44444';
		assert.equal(await driver.getNumber(), expectedNumber);
		await driver.enterNumber('+154224');
		assert.equal(onChange.called, true);
		const expectedValue = {countryCode: '1', number: '54224'};
		assert.deepEqual(onChange.lastCall.args[0], expectedValue);
	});
});
