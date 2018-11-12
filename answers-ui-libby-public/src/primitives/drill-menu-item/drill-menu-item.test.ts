import { noop } from 'answers-toolkit';
import { expect } from 'chai';
import { createDrillMenuItem } from './drill-menu-item.driver';
import { spy } from 'sinon';
import * as jsdomGlobal from 'jsdom-global';

describe ('Drill menu item', () => {
	let cleanup: any;

	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('Calls cb when drill menu item is clicked', async () => {
		const onClick = spy();
		const props = {onClick};

		const driver = createDrillMenuItem(props);
		expect(onClick.called).to.eql(false);
		driver.click();
		expect(onClick.called).to.eql(true);
	});

	it('Shows disabled drill menu item', async () => {
		const onClick = spy();
		const props = {onClick: noop, disabled: true};

		const driver = createDrillMenuItem(props);
		driver.click();
		expect(driver.isDisabled()).to.eql(true);
		expect(onClick.called).to.eql(false);
	});
});
