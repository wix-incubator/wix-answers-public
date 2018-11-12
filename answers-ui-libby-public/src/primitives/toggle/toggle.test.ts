import {expect} from 'chai';
import * as sinon from 'sinon';

import * as driver from './toggle.driver';
import * as jsdomGlobal from 'jsdom-global';
import { delay } from '../../common';

describe('toggle', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('should be "on" when value is true', () => {
		const comp = driver.createToggle({value: true, onChange: sinon.spy()});
		expect(comp.isOn()).to.eql(true);
		expect(comp.isOff()).to.eql(false);
	});

	it('should not show active when value is false', () => {
		const comp = driver.createToggle({value: false, onChange: sinon.spy()});
		expect(comp.isOn()).to.eql(false);
		expect(comp.isOff()).to.eql(true);
	});

	it('should call cb when toggled', () => {
		const spy = sinon.spy();
		const comp = driver.createToggle({onChange: spy, value: false});
		expect(spy.called).to.eql(false);
		comp.toggle();
		expect(spy.called).to.eql(true);
		expect(spy.calledWith()).to.eql(true);
		expect(spy.callCount).to.eql(1);
	});

	it('should not call cb when toggled if disabled', () => {
		const spy = sinon.spy();
		const comp = driver.createToggle({onChange: spy, value: false, disabled: true});
		expect(spy.called).to.eql(false);
		expect(comp.isOff()).to.eql(true);
		comp.toggle();
		expect(spy.called).to.eql(false);
		expect(comp.isOff()).to.eql(true);
	});

	it('disables on click when passed a promise', async () => {
		const spy = sinon.spy();
		const delayTime = Math.random() * 1000;
		const onChangePromise = () => delay(delayTime).then(() => spy());
		const comp = driver.createToggle({onChange: onChangePromise, value: false});

		expect(spy.called).to.eql(false);
		expect(comp.isOff()).to.eql(true);
		comp.toggle();
		expect(spy.called).to.eql(false);
		await delay(delayTime);
		expect(comp.isOff()).to.eql(true);
		expect(spy.called).to.eql(true);
	});
});
