import {expect} from 'chai';
import * as sinon from 'sinon';
import jsdomGlobal = require('jsdom-global');
import * as driver from './link-button.legacy-driver';

describe('Linked Button', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('should show label', () => {
		const label = 'Linked Button';
		const comp = driver.createLinkButton({onClick: sinon.spy(), children: label });
		expect(comp.getText()).to.eql(label);
	});

	it('should call cb when clicked', () => {
		const spy = sinon.spy();
		const elem = driver.createLinkButton({onClick: spy});
		expect(spy.called).to.eql(false);
		elem.click();
		expect(spy.called).to.eql(true);
	});

	it('should not call cb when clicked if disabled', () => {
		const spy = sinon.spy();
		const elem = driver.createLinkButton({onClick: spy, disabled: true});
		expect(elem.isDisabled()).to.eql(true);
		expect(spy.called).to.eql(false);
		elem.click();
		expect(spy.called).to.eql(false);
	});
});
