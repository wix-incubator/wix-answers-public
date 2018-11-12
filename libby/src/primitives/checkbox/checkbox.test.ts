import {expect} from 'chai';
import * as sinon from 'sinon';
import * as driver from './checkbox.driver';
import * as jsdomGlobal from 'jsdom-global';

const dummy = (): null => null;

describe('Checkbox (Good ol)', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('Should render correctly and be checked', () => {
		const children = 'testing label';
		const comp = driver.createCheckbox({ value: true, onChange: dummy, children });
		expect(comp.isChecked()).to.eql(true);
		expect(comp.getLabel()).to.eql(children);
	});

	it('Should call cb when toggling', () => {
		const spy = sinon.spy();
		const comp = driver.createCheckbox({ value: false, onChange: spy });
		expect(spy.called).to.eql(false);
		comp.click();
		expect(spy.called).to.eql(true);
	});

	it('Should show large checkbox', () => {
		const spy = sinon.spy();
		const comp = driver.createCheckbox({ value: false, onChange: spy, large: true });
		expect(comp.isLarge()).to.eql(true);
	});
});
