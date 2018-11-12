
import { assert } from 'chai';
import { LocalePickerProps } from './locale-picker.comp';
import { renderLegacyLocalePickerAndReturnDriver } from './locale-picker.legacy-driver';
import {  testDataCreator, noop } from 'answers-lib';
import * as sinon from 'sinon';
import * as jsdomGlobal from 'jsdom-global';

const propsCreator = testDataCreator<LocalePickerProps>(() => ({
	t: (key: string) => {
		const keys = {
			en: 'English',
			pt: 'Port',
			es: 'Espanhol'
		} as any;
		return keys[key];
	},
	locales: ['en', 'es', 'pt'],
	value: 'en',
	onChange: noop,
}));

describe('LocalePicker', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('show the selected locale', () => {
		const onChange = sinon.spy();
		const props = propsCreator({ onChange, value: 'es' });
		const driver = renderLegacyLocalePickerAndReturnDriver(props);

		assert.equal(driver.getPickedLocale(), 'es');
		assert.equal(driver.getPickedLocaleText(), 'Espanhol');
	});

	it('change the locale', () => {
		const onChange = sinon.spy();
		const props = propsCreator({ onChange });
		const driver = renderLegacyLocalePickerAndReturnDriver(props);

		driver.pickLocale('pt');

		assert.equal(onChange.called, true);
		assert.equal(onChange.lastCall.args[0], 'pt');
	});
});
