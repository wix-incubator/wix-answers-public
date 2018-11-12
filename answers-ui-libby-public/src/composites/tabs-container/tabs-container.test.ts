import * as jsdomGlobal from 'jsdom-global';
import { spy } from 'sinon';
import { expect } from 'chai';
import * as driver from './tabs-container.legacy-driver';

describe('Tabs Container', () => {
	let cleanup: any;

	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	const tabItems = [
		{
			element: 'Bob',
			key: 'bob-1'
		},
		{
			element: 'Bob 2',
			key: 'bob-2'
		}
	];

	it('Should show the tab list and call cb on change', () => {
		const onChange = spy();
		const comp = driver.createTabsContainer({tabItems, selected: 'bob-1', onChange });

		const expectedTabTexts = tabItems.map((i) => i.element);
		const indexToSelect = 1;

		expect(comp.getTabTexts()).to.eql(expectedTabTexts);
		expect(onChange.called).to.eql(false);
		comp.selectTabAtIndex(indexToSelect);
		expect(onChange.called).to.eql(true);
		expect(onChange.lastCall.args[0]).to.eql(tabItems[indexToSelect].key);
	});
});
