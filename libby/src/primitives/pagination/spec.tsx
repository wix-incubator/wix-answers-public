import { assert } from 'chai';
import { testViewCompPropsCreator, renderAndMountComp } from 'answers-lib';
import { reactUniDriver } from 'unidriver';
import { Pagination, PaginationProps } from '.';
import { createPaginationDriver } from './driver';
import * as sinon from 'sinon';
import * as jsdomGlobal from 'jsdom-global';

const propsCreator = testViewCompPropsCreator<PaginationProps>(() => ({
	page: 1,
	numPages: 10,
	onPageClick: sinon.spy()
}));

const setup = (partialProps: Partial<PaginationProps>) => {
	const props = propsCreator(partialProps);
	const elem = renderAndMountComp<PaginationProps>(Pagination, props);
	const baseDriver = reactUniDriver(elem);
	return createPaginationDriver(baseDriver);
};

describe('Pagination', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
		document.body.innerHTML = '';
	});

	afterEach(() => {
		cleanup();
	});

	it('shows the first page selected', async () => {
		const driver = setup({});
		assert.deepEqual(await driver.getVisiblePages(), ['1', '2', '3', '4', '5', '10']);
	});
	it('shows the first page selected', async () => {
		const driver = setup({});
		assert.equal(await driver.getSelected(), '1');
	});
	it('shows the call page 3', async () => {
		const spy = sinon.spy();
		const driver = setup({ onPageClick: spy});
		assert.equal(spy.called, false);
		await driver.selectedPage(3);
		assert.equal(spy.calledWith(3), true);
	});
});
