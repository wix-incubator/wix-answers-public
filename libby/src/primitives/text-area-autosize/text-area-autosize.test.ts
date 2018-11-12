import {expect} from 'chai';
import * as sinon from 'sinon';

import * as driver from './text-area-autosize.legacy-driver';
import * as jsdomGlobal from 'jsdom-global';

describe('textAreaAutosize', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	const dummy = (_: any) => 42;

	it('should load the resizeable text area with value', () => {
		const initialValue = 'bob';
		const comp = driver.createTextAreaAutosize({value: initialValue, placeholder: 'placeholder', onChange: dummy});
		expect(comp.getValue()).to.eql(initialValue);
	});

	it('should call cb when value is changed', () => {
		const spy = sinon.spy();
		const comp = driver.createTextAreaAutosize({value: '', placeholder: 'placeholder', onChange: spy});
		const valueToEnter = 'Yo yo yo yo!';

		expect(spy.called).to.eql(false);
		comp.enterValue(valueToEnter);
		expect(spy.called).to.eql(true);
		expect(spy.lastCall.args).to.eql([valueToEnter]);
	});
});
