import { assert } from 'chai';
import { renderColorPickerAndReturnDriver } from './color-picker.driver';
import { noop } from '../../common';
import { spy } from 'sinon';
import * as jsdomGlobal from 'jsdom-global';

describe('ColorPicker', () => {
	let cleanup: any;
	const t = () => 'bob';

	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('should show the color that it receives in props', () => {
		const props = {value: '#3899ec', onChange: noop, t};
		const driver = renderColorPickerAndReturnDriver(props);
		assert.equal(driver.getDisplayedColor(), '#3899ec');
	});

	it('should call cb with color string when new color is entered', () => {
		const colorSpy = spy();
		const props = {value: '#ffffff', onChange: colorSpy, t};
		const driver = renderColorPickerAndReturnDriver(props);
		assert.equal(colorSpy.called, false);
		driver.enterColor('#3899ec');
		assert.equal(colorSpy.calledOnce, true);
		assert.equal(colorSpy.calledWithExactly('#3899ec'), true);
	});

	it('should not call cb with input that is not valid hex color', () => {
		const colorSpy = spy();
		const props = {value: '#ffffff', onChange: colorSpy, t};
		const driver = renderColorPickerAndReturnDriver(props);
		assert.equal(colorSpy.called, false);
		driver.enterColor('#3899e');
		assert.equal(colorSpy.called, false);
		driver.enterColor('#zzzzzz');
		assert.equal(colorSpy.called, false);
		driver.enterColor('#3899ecc');
		assert.equal(colorSpy.called, false);
		driver.enterColor('#3899ec');
		assert.equal(colorSpy.called, true);
	});

	it('should show validation error if invalid color entered', () => {
		const props = {value: '#ffffff', onChange: noop, t};
		const driver = renderColorPickerAndReturnDriver(props);
		assert.equal(driver.isInputValid(), true);
		driver.enterColor('#zzzzzz');
		assert.equal(driver.isInputValid(), false);
		driver.enterColor('#3899ecc');
		assert.equal(driver.isInputValid(), false);
		driver.enterColor('3899ec');
		assert.equal(driver.isInputValid(), true);
		driver.enterColor('#3899e');
		assert.equal(driver.isInputValid(), false);
	});
});
