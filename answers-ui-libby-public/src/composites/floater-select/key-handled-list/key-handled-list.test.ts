import {ItemRenderer} from './test-utils/key-handler-test-comps';
import {renderKeyHandledListAndReturnDriver} from './key-handled-list.driver';
import {keyCodes} from './key-handled-list.comp';
import { spy } from 'sinon';
import { expect } from 'chai';
import * as jsdomGlobal from 'jsdom-global';

describe('key handled list meta component', () => {

	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('should select items in a generated list and call a callback when enter is pressed', () => {

		const items = [{id: 1, name: 'Bob'}, {id: 2, name: 'Bobbette'}, {id: 3, name: 'Georgette'}];
		const selectSpy = spy();

		const driver = renderKeyHandledListAndReturnDriver(items as any, ItemRenderer, selectSpy);

		expect(selectSpy.called).to.eql(false);

		expect(driver.getAllTextBySelector('.name')).to.eql(items.map((item) => item.name));
		expect(driver.getAllTextBySelector('.selectedItem')).to.eql([]);

		driver.simulateKeyPress('.search', keyCodes.downArrow);
		expect(selectSpy.called).to.eql(false);

		driver.simulateKeyPress('.search', keyCodes.enter);
		expect(selectSpy.called).to.eql(true);
		expect(selectSpy.args[0][0]).to.eql(items[0]);

		driver.simulateKeyPress('.search', keyCodes.downArrow);
		driver.simulateKeyPress('.search', keyCodes.enter);
		expect(selectSpy.args[1][0]).to.eql(items[1]);
		expect(driver.getSelectedItemText('.selectedItem')).to.eql(items[1].name);

		driver.simulateKeyPress('.search', keyCodes.downArrow);
		driver.simulateKeyPress('.search', keyCodes.enter);
		expect(selectSpy.args[2][0]).to.eql(items[2]);
		expect(driver.getSelectedItemText('.selectedItem')).to.eql(items[2].name);

		driver.simulateKeyPress('.search', keyCodes.downArrow);
		driver.simulateKeyPress('.search', keyCodes.enter);
		expect(selectSpy.args[3][0]).to.eql(items[0]);
		expect(driver.getSelectedItemText('.selectedItem')).to.eql(items[0].name);

		driver.simulateKeyPress('.search', keyCodes.upArrow);
		driver.simulateKeyPress('.search', keyCodes.enter);
		expect(selectSpy.args[4][0]).to.eql(items[2]);
		expect(driver.getSelectedItemText('.selectedItem')).to.eql(items[2].name);

		driver.simulateKeyPress('.search', keyCodes.upArrow);
		driver.simulateKeyPress('.search', keyCodes.enter);
		expect(selectSpy.args[5][0]).to.eql(items[1]);
		expect(driver.getSelectedItemText('.selectedItem')).to.eql(items[1].name);
	});

	it('should select items in a generated list when some are disabled', () => {
		const items = [{id: 1, name: 'Bob'}, {id: 2, name: 'Bobbette', disabled: true}, {id: 3, name: 'Georgette'}];
		const selectSpy = spy();

		const driver = renderKeyHandledListAndReturnDriver(items as any, ItemRenderer, selectSpy);

		expect(selectSpy.called).to.eql(false);
		driver.simulateKeyPress('.search', keyCodes.downArrow);
		expect(driver.getSelectedItemText('.selectedItem')).to.eql(items[0].name);
		driver.simulateKeyPress('.search', keyCodes.downArrow);
		expect(driver.getSelectedItemText('.selectedItem')).to.eql(items[2].name);
		driver.simulateKeyPress('.search', keyCodes.downArrow);
		expect(driver.getSelectedItemText('.selectedItem')).to.eql(items[0].name);

		driver.simulateKeyPress('.search', keyCodes.upArrow);
		expect(driver.getSelectedItemText('.selectedItem')).to.eql(items[2].name);
		driver.simulateKeyPress('.search', keyCodes.upArrow);
		expect(driver.getSelectedItemText('.selectedItem')).to.eql(items[0].name);

		driver.simulateKeyPress('.search', keyCodes.enter);
		expect(selectSpy.called).to.eql(true);
		expect(selectSpy.lastCall.args[0]).to.eql(items[0]);

		driver.simulateKeyPress('.search', keyCodes.upArrow);
		driver.simulateKeyPress('.search', keyCodes.enter);
		expect(selectSpy.lastCall.args[0]).to.eql(items[2]);
	});
});
