import {expect} from 'chai';
import * as sinon from 'sinon';

import * as jsdomGlobal from 'jsdom-global';
import * as driver from './numeric-input.driver';

describe('input', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('should render the component with value and call cb when changed', () => {
		const value = 2;
		const newValue = 14;
		const placeholder = 'Your value';
		const spy = sinon.spy();

		const comp = driver.createNumericInput({ value, placeholder, onChange: spy });

		expect(comp.getValue()).to.eql(value);
		expect(spy.called).to.eql(false);
		comp.enterValue(newValue);
		expect(spy.called).to.eql(true);
		expect(spy.lastCall.args).to.eql([newValue]);
	});

	it('Should allow incrementing and decrementing the value with buttons and call cb', () => {
		const value = 4;
		const placeholder = 'Something';
		const spy = sinon.spy();

		const comp = driver.createNumericInput({ value, placeholder, onChange: spy });

		expect(comp.getValue()).to.eql(value);
		expect(spy.called).to.eql(false);
		comp.clickDecrement();
		expect(spy.called).to.eql(true);
		expect(spy.lastCall.args).to.eql([value - 1]);
		comp.clickIncrement();
		expect(spy.lastCall.args).to.eql([value + 1]);
	});
});
