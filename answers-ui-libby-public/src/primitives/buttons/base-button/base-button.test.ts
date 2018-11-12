import {expect} from 'chai';
import * as sinon from 'sinon';

import * as driver from './base-button.driver';
import * as jsdomGlobal from 'jsdom-global';
import { delay } from '../../../common';

describe('Base Button', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('should show label', () => {
		const label = 'Bob';
		const comp = driver.createBaseButton({onClick: sinon.spy() }, label);
		expect(comp.getText()).to.eql(label);
	});

	it('should call cb when clicked', () => {
		const spy = sinon.spy();
		const elem = driver.createBaseButton({onClick: spy});
		expect(spy.called).to.eql(false);
		elem.click();
		expect(spy.called).to.eql(true);
	});

	it('should not call cb when clicked if disabled', () => {
		const spy = sinon.spy();
		const elem = driver.createBaseButton({onClick: spy, disabled: true});
		expect(elem.isDisabled()).to.eql(true);
		expect(spy.called).to.eql(false);
		elem.click();
		expect(spy.called).to.eql(false);
	});

	describe('async action', () => {
		it('should be disabled and show loader until promise resolves', async () => {
			const onClick = () => delay(100);
			const elem = driver.createBaseButton({onClick});
			expect(elem.isDisabled()).to.eql(false);
			expect(elem.loaderVisible()).to.eql(false);
			elem.click();
			expect(elem.isDisabled()).to.eql(true);
			expect(elem.loaderVisible()).to.eql(true);
			await delay(110);
			expect(elem.isDisabled()).to.eql(false);
			expect(elem.loaderVisible()).to.eql(false);
		});
	});

});
