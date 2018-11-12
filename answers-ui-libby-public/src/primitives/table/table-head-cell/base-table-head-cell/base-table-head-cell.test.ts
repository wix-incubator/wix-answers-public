import * as jsdomGlobal from 'jsdom-global';
import * as driver from './base-table-head-cell.legacy-driver';
import * as sinon from 'sinon';
import { expect } from 'chai';

describe('Table heading cell', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('Should call cb when cell is clicked', () => {
		const onClick = sinon.spy();
		const comp = driver.createBaseTableHeadCell({ onClick });

		expect(onClick.called).to.eql(false);
		comp.click();
		expect(onClick.called).to.eql(true);
	});
});
