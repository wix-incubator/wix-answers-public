import {expect} from 'chai';
import * as sinon from 'sinon';

import * as driver from './text-area.driver';
import * as jsdomGlobal from 'jsdom-global';

describe('textArea', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	const dummy = (_: any) => 42;

	it('should load an textArea with value', () => {
		const initialValue = 'bob';
		const comp = driver.createTextArea({value: initialValue, placeholder: 'placeholder', onChange: dummy});
		expect(comp.getValue()).to.eql(initialValue);
	});

	it('should call cb on textArea change', () => {
		const spy = sinon.spy();
		const comp = driver.createTextArea({value: '', placeholder: 'placeholder', onChange: spy});
		const valueToEnter = 'blablabla!';
		expect(comp.getValue()).to.eql('');
		comp.enterValue(valueToEnter);
		expect(spy.called).to.eql(true);
		expect(spy.callCount).to.eql(1);
		expect(spy.lastCall.args).to.eql([valueToEnter]);
	});

	it('should be disabled when passing a disabeld value', () => {
		const initialValue = 'bob';
		const comp = driver.createTextArea({
			value: initialValue,
			placeholder: 'placeholder',
			onChange: dummy, disabled: true
		});
		expect(comp.isDisabled()).to.eql(true);
	});

	it('calls onBlur correctly', () => {
		const spy = sinon.spy();
		const comp = driver.createTextArea({value: '', placeholder: 'placeholder', onChange: dummy, onBlur: spy});
		expect(spy.called).to.eql(false);
		comp.blur();
		expect(spy.called).to.eql(true);
		expect(spy.callCount).to.eql(1);
	});

	it('should be readOnly when passing a readOnly value', () => {
		const initialValue = 'bob';
		const comp = driver.createTextArea({
			value: initialValue,
			placeholder: 'placeholder',
			onChange: dummy,
			readOnly: true
		});
		expect(comp.isReadOnly()).to.eql(true);
	});
});
