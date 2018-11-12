import { noop, renderAndMountComponent } from 'answers-toolkit';
import * as React from 'react';
import {expect} from 'chai';
import * as sinon from 'sinon';
// import * as driver from './floater-menu.driver';
import * as jsdomGlobal from 'jsdom-global';

import {FloaterMenu, MenuItem} from './floater-menu';

import {createLegacyFloaterMenuDriver} from './floater-menu.legacy-driver';

describe('Floater menu', () => {
	let cleanup: any;

	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	const createItems = (n: number) => {
		return Array(n).fill(<MenuItem onSelect={noop}>Item {n}</MenuItem>);
	};

	it('should render correctly', async () => {
		const items = createItems(3);
		const Menu = () => (<FloaterMenu>{items}</FloaterMenu>);
		renderAndMountComponent(<Menu/>);
		const comp = createLegacyFloaterMenuDriver(document.body);
		expect(comp.getItemsCount()).to.eql(3);
	});

	it('calls cb on click', async () => {
		const spy = sinon.spy();
		const items = [<MenuItem key='1' onSelect={spy}>test</MenuItem>];
		const Menu = () => (<FloaterMenu>{items}</FloaterMenu>);
		renderAndMountComponent(<Menu/>);
		const comp = createLegacyFloaterMenuDriver(document.body);
		expect(spy.called).to.eql(false);
		comp.clickOn(0);
		expect(spy.called).to.eql(true);
	});

	it('doesnt calls cb on click when disabled', async () => {
		const spy = sinon.spy();
		const items = [<MenuItem key='1' onSelect={spy} disabled={true}>test</MenuItem>];
		const Menu = () => (<FloaterMenu>{items}</FloaterMenu>);
		renderAndMountComponent(<Menu/>);
		const comp = createLegacyFloaterMenuDriver(document.body);
		expect(spy.called).to.eql(false);
		comp.clickOn(0);
		expect(spy.called).to.eql(false);
	});
});
