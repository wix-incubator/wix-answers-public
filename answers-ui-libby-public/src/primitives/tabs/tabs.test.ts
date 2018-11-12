import {expect} from 'chai';
import * as driver from './tabs.legacy-driver';
import * as jsdomGlobal from 'jsdom-global';

import {noop} from '../../common';
import { spy } from 'sinon';

describe('tabs', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	const items = [
			{
				element: 'Apple',
				key: 'apple'
			},
			{
				element: 'Tomato',
				key: 'tomato'
			},
			{
				element: 'Chicken',
				key: 'chicken'
			}
	];

	it('show tab list', () => {
		const comp = driver.createTabs({items, selected: 'apple', onChange: noop});
		expect(comp.getTabTexts()).to.eql(items.map((t) => t.element));
	});

	it('show selected tab', () => {
		const comp = driver.createTabs({items, selected: 'apple', onChange: noop});
		expect(comp.getSelected()).to.eql('Apple');
	});

	it('should call callback when tab selected with it\'s key', () => {
		const onChange = spy();
		const comp = driver.createTabs({items, selected: 'apple', onChange});
		expect(onChange.called).to.eql(false);
		expect(comp.selectTab(2));
		expect(onChange.called).to.eql(true);
		expect(onChange.lastCall.args).to.eql([items[2].key]);
	});

	it('show selected nested tab', () => {
		const comp = driver.createTabs({items, selected: 'apple/nested-apple', onChange: noop});
		expect(comp.getSelected()).to.eql('Apple');
	});
});
