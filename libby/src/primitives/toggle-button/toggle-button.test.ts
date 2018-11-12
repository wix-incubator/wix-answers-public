import {expect} from 'chai';
import * as sinon from 'sinon';

import * as driver from './toggle-button.driver';
import * as jsdomGlobal from 'jsdom-global';

describe('toggle-button', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	const dummy = (): null => null;

	it('Should show the label and be checked', () => {
		const label = 'My toggle';
		const comp = driver.createToggleButton({ isChecked: true, onClick: dummy }, label);
		expect(comp.getText()).to.eql(label);
		expect(comp.isChecked()).to.eql(true);
	});

	it('Should call cb on button click', () => {
		const label = 'My toggle';
		const spy = sinon.spy();
		const comp = driver.createToggleButton({ isChecked: false, onClick: spy }, label);
		expect(spy.called).to.eql(false);
		comp.click();
		expect(spy.called).to.eql(true);
	});
});
