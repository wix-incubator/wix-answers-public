import { assert } from 'chai';
import { testViewCompPropsCreator, renderAndMountComp } from 'answers-toolkit';
import { reactUniDriver } from 'unidriver';
import { SideBar, SideBarProps } from '.';
import { createSideBarDriver } from './driver';
import * as jsdomGlobal from 'jsdom-global';

const propsCreator = testViewCompPropsCreator<SideBarProps>(() => ({}));

const setup = (partialProps: Partial<SideBarProps>) => {
	const props = propsCreator(partialProps);
	const elem = renderAndMountComp<SideBarProps>(SideBar, props);
	const baseDriver = reactUniDriver(elem);
	return createSideBarDriver(baseDriver);
};

describe('SideBar', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
		document.body.innerHTML = '';
	});

	afterEach(() => {
		cleanup();
	});

	it('Shows header if passed', async () => {
		const headerRenderer: any = (): any => null;
		const driver = setup({headerRenderer});
		assert.equal(await driver.hasHeader(), true);
	});
});
