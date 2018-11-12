import {expect} from 'chai';
import { renderLegacyFloaterSelectAndReturnDriver } from './floater-select.legacy-driver';
import { delay } from '../../common';
import * as React from 'react';
import { spy } from 'sinon';
import * as jsdomGlobal from 'jsdom-global';
import { FloaterSelectProps } from './floater-select.comp';

describe('FloaterSelect', () => {

	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('should search and display items when mounted', async () => {
		const items = ['Bob', 'Dave'];
		const selectSpy = spy();
		const search: any = () => Promise.resolve(items);
		const ItemRenderer = ({item}: any) => <li>{item}</li>;
		const debounceDelay = 100;
		const props = {
			search,
			ItemRenderer,
			debounceDelay,
			placeholderText: 'placeholder',
			onSelect: selectSpy,
			noResults: ''
		};
		const driver = renderLegacyFloaterSelectAndReturnDriver(props);
		await delay(10);
		expect(driver.getItemsContent()).to.eql(items);
	});

	it('should get new items after search', async () => {
		const noTermItems = ['Bob', 'Dave'].map((s, i) => ({id: i, str: s}));
		const nahumItems = ['nahum'].map((s, i) => ({id: i, str: s}));
		const selectSpy = spy();
		const search = async (term: string) => {
			return term === 'nahum' ? nahumItems : noTermItems;
		};
		const debounceDelay = 30;
		const ItemRenderer = ({item}: any) => <li>{item.str}</li>;
		const props: FloaterSelectProps<{str: string, id: number}> = {
			search,
			ItemRenderer,
			debounceDelay,
			placeholderText: 'placeholder',
			onSelect: selectSpy,
			noResults: ''
		};
		const driver = renderLegacyFloaterSelectAndReturnDriver(props);
		await delay(10);
		expect(driver.getItemsContent()).to.eql(['Bob', 'Dave']);
		driver.search('nahum');
		await delay(debounceDelay + 10);
		expect(driver.getItemsContent()).to.eql(['nahum']);
	});

	it('should only search after debounce', async () => {
		const noTermItems = ['Bob', 'Dave'];
		const nahumItems = ['nahum'];
		const selectSpy = spy();
		const search: any = async (term: string) => {
			return term === 'nahum' ? nahumItems : noTermItems;
		};
		const debounceDelay = 100;
		const ItemRenderer = ({item}: any) => <li>{item}</li>;
		const props = {
			search,
			ItemRenderer,
			debounceDelay,
			placeholderText: 'placeholder',
			onSelect: selectSpy,
			noResults: ''
		};
		const driver = renderLegacyFloaterSelectAndReturnDriver(props);
		await delay(10);
		expect(driver.getItemsContent()).to.eql(noTermItems);
		driver.search('nahum');
		await delay(10);
		expect(driver.getItemsContent()).to.eql(noTermItems);
		await delay(debounceDelay + 50);
		expect(driver.getItemsContent()).to.eql(nahumItems);
	});

	it('should display loader while waiting for search response', async () => {
		const noTermItems = ['Bob', 'Dave'];
		const nahumItems = ['nahum'];
		const searchResponseDelay = 50;
		const selectSpy = spy();
		const search: any = async (term: string) => {
			await delay(searchResponseDelay);
			return term === 'nahum' ? nahumItems : noTermItems;
		};
		const debounceDelay = 1;
		const ItemRenderer = ({item}: any) => <li>{item}</li>;
		const props = {
			search,
			ItemRenderer,
			debounceDelay,
			placeholderText: 'placeholder',
			onSelect: selectSpy,
			noResults: ''
		};
		const driver = renderLegacyFloaterSelectAndReturnDriver(props);
		await delay(searchResponseDelay + 10);
		expect(driver.getItemsContent()).to.eql(noTermItems);
		driver.search('nahum');
		await delay(10);
		expect(driver.getItemsContent()).to.eql([]);
		expect(driver.isLoading()).to.eql(true);
		await delay(debounceDelay + searchResponseDelay);
		expect(driver.getItemsContent()).to.eql(nahumItems);
	});

	it('should select with arrow key and call cb on enter', async () => {
		const items = ['Bob', 'Dave'];
		const search: any = () => Promise.resolve(items);
		const ItemRenderer = ({item}: any) => <li>{item}</li>;
		const debounceDelay = 30;
		const selectSpy = spy();
		const props = {
			search,
			ItemRenderer,
			debounceDelay,
			placeholderText: 'placeholder',
			onSelect: selectSpy,
			noResults: ''
		};
		const driver = renderLegacyFloaterSelectAndReturnDriver(props);
		await delay(10);
		expect(selectSpy.called).to.eql(false);
		driver.pressDownKey();
		driver.pressEnterKey();
		expect(selectSpy.called).to.eql(true);
		expect(selectSpy.args[0][0]).to.eql('Bob');
	});

	it('should select with arrow key and call cb on enter', async () => {
		const items = ['Bob', 'Dave'];
		const search: any = () => Promise.resolve(items);
		const ItemRenderer = ({item}: any) => <li>{item}</li>;
		const debounceDelay = 30;
		const selectSpy = spy();
		const props = {
			search,
			ItemRenderer,
			debounceDelay,
			placeholderText: 'placeholder',
			onSelect: selectSpy,
			noResults: ''
		};
		const driver = renderLegacyFloaterSelectAndReturnDriver(props);
		await delay(10);
		expect(selectSpy.called).to.eql(false);
		driver.select(1);
		expect(selectSpy.called).to.eql(true);
		expect(selectSpy.lastCall.args[0]).to.eql('Dave');
		await delay(5);
		driver.select(0);
		expect(selectSpy.lastCall.args[0]).to.eql('Bob');
		driver.pressEnterKey();
	});

	it('should search again when an item is selected', async () => {
		const items = ['Bob', 'Dave'];
		const selectSpy = spy();
		const search = () => {
			return Promise.resolve(items);
		};
		const searchSpy = spy(search);
		const ItemRenderer = ({item}: any) => <li>{item}</li>;
		const debounceDelay = 0;
		const props = {
			search: searchSpy,
			ItemRenderer,
			debounceDelay,
			placeholderText: 'placeholder',
			onSelect: selectSpy,
			noResults: '',
			autoFocus: true
		};
		const driver = renderLegacyFloaterSelectAndReturnDriver(props);
		expect(searchSpy.calledOnce).to.eql(true);
		await delay(10);
		driver.pressDownKey();
		driver.pressEnterKey();
		expect(selectSpy.calledOnce).to.eql(true);
		expect(searchSpy.calledTwice).to.eql(true);
	});
});
