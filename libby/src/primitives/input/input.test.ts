import {expect} from 'chai';
import * as sinon from 'sinon';

import * as driver from './input.legacy-driver';
import * as jsdomGlobal from 'jsdom-global';

describe('input', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	const dummy = (_: any) => 42;

	it('loads an input with value', () => {
		const initialValue = 'bob';
		const comp = driver.createInput({value: initialValue, placeholder: 'placeholder', onChange: dummy});
		expect(comp.getValue()).to.eql(initialValue);
	});

	it('calls cb on input change', () => {
		const spy = sinon.spy();
		const comp = driver.createInput({value: '', placeholder: 'placeholder', onChange: spy});
		const valueToEnter = 'blablabla!';
		expect(comp.getValue()).to.eql('');
		comp.enterValue(valueToEnter);
		expect(spy.called).to.eql(true);
		expect(spy.callCount).to.eql(1);
		expect(spy.lastCall.args).to.eql([valueToEnter]);
	});

	it('calls cb on input enter press', () => {
		const spy = sinon.spy();
		const comp = driver.createInput({value: '', placeholder: 'placeholder', onChange: dummy, onEnter: spy });
		expect(spy.called).to.eql(false);
		comp.pressEnter();
		expect(spy.called).to.eql(true);
	});

	it('renders as disabled when passing a disabeld value', () => {
		const initialValue = 'bob';
		const comp = driver.createInput({value: initialValue, placeholder: 'placeholder', onChange: dummy, disabled: true});
		expect(comp.isDisabled()).to.eql(true);
	});

	it('renders as disabled when passing a disabeld string message', () => {
		const initialValue = 'bob';
		const disabled = 'I will be a message';
		const comp = driver.createInput({value: initialValue, placeholder: 'placeholder', onChange: dummy, disabled});
		expect(comp.isDisabled()).to.eql(true);
	});

	it('renders as readOnly when passing a readOnly value', () => {
		const initialValue = 'bob';
		const comp = driver.createInput({value: initialValue, placeholder: 'placeholder', onChange: dummy, readOnly: true});
		expect(comp.isReadOnly()).to.eql(true);
	});

	it('shows the validation message and be invalid when validationError is passed', () => {
		const initialValue = 'yo';
		const validationError = 'This is not right';

		const comp = driver.createInput({value: initialValue, placeholder: 'something', onChange: dummy, validationError});
		expect(comp.getValidationErrorMessage()).to.eql(validationError);
		expect(comp.isValid()).to.eql(false);
	});

	it('has the right placeholder', () => {
		const ph = 'Bob!!';

		const comp = driver.createInput({value: '', placeholder: ph, onChange: dummy});
		expect(comp.getPlaceholder()).to.eql(ph);
	});
});
