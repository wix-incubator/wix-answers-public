import * as jsdomGlobal from 'jsdom-global';
import * as driver from './sortable-table-head-cell.legacy-driver';
import * as sinon from 'sinon';
import { expect } from 'chai';

describe('Sortable table heading cell', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('Should have the correct ordering if sortOrder prop is passed, and call cb with opposite', () => {
		const sortOrder = 'asc';
		const onSortOrderChange = sinon.spy();
		const comp = driver.createSortableTableHeadCell({ sortOrder, onSortOrderChange });

		expect(comp.getSortOrder()).to.eql(sortOrder);
		expect(onSortOrderChange.called).to.eql(false);
		comp.click();
		expect(onSortOrderChange.called).to.eql(true);
		expect(onSortOrderChange.lastCall.args[0]).to.eql('desc');
	});

	it('has ordering, but disabled if onSortChange cb is not passed', () => {
		const sortOrder = 'asc';
		const comp = driver.createSortableTableHeadCell({sortOrder});

		expect(comp.getSortOrder()).to.eql(sortOrder);
		expect(comp.disabled()).to.eql(true);
		comp.click();
		expect(comp.getSortOrder()).to.eql(sortOrder);
		expect(comp.disabled()).to.eql(true);
	});

	it('Should call cb with descending order if initial order set to none', () => {
		const onSortOrderChange = sinon.spy();
		const comp = driver.createSortableTableHeadCell({ sortOrder: 'none', onSortOrderChange });

		expect(onSortOrderChange.called).to.eql(false);
		comp.click();
		expect(onSortOrderChange.called).to.eql(true);
		expect(onSortOrderChange.lastCall.args[0]).to.eql('desc');
	});
});
