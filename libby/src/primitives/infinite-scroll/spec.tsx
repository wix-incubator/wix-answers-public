import { assert } from 'chai';
import { testViewCompPropsCreator, renderAndMountComp } from 'answers-app-core';
import { reactUniDriver } from 'unidriver';
import { InfiniteScroll, InfiniteScrollProps } from './';
import { createInfiniteScrollDriver } from './driver';
import { spy, stub } from 'sinon';
import * as React from 'react';
import { AvatarUser, randomAvatarUsers } from '../../common';

const propsCreator = testViewCompPropsCreator<InfiniteScrollProps<any>>(() => ({
}));

const setup = (partialProps: Partial<InfiniteScrollProps<any>>) => {
	const props = propsCreator(partialProps);
	const elem = renderAndMountComp<InfiniteScrollProps<any>>(InfiniteScroll, props);
	const baseDriver = reactUniDriver(elem);
	return createInfiniteScrollDriver(baseDriver);
};

describe('InfiniteScroll', () => {
	it('shows correct amount of initial items', async () => {
		const users = randomAvatarUsers(8);
		const itemHeight = 10;
		const listHeight = 80;
		const fetchData = async () => users;
		const renderItem = (t: AvatarUser) => <h1 style={{ height: itemHeight }}>{t.fullName}</h1>;
		const driver = setup({ itemHeight, listHeight, fetchData, renderItem });

		assert.equal(await driver.itemsCount(), 8);
	});

	it('fetches default initial data', async () => {
		const itemHeight = 10;
		const listHeight = 80;
		const buffer = 4;
		const fetchData = spy();
		setup({ itemHeight, listHeight, buffer, fetchData });

		assert.equal(fetchData.called, true);
		assert.deepEqual(fetchData.lastCall.args, [0, 12]);
	});

	it('scrolls down and fetches more data', async () => {
		const users = randomAvatarUsers(8);
		const moreUsers = randomAvatarUsers(12);
		const itemHeight = 10;
		const listHeight = 80;
		const buffer = 4;
		const fetchData = stub()
		.withArgs(0, 12)
		.returns(users)
		.withArgs(0, 15)
		.returns(moreUsers);
		const renderItem = (t: AvatarUser) => <h1 style={{ height: itemHeight }}>{t.fullName}</h1>;
		const driver = setup({ itemHeight, listHeight, buffer, fetchData, renderItem });

		assert.equal(fetchData.called, true);
		assert.deepEqual(fetchData.lastCall.args, [0, 12]);

		await driver.scroll(32);

		assert.deepEqual(fetchData.lastCall.args, [0, 15]);
	});

	it('scrolls down just a bit and does not fetch more data', async () => {
		const users = randomAvatarUsers(8);
		const itemHeight = 10;
		const listHeight = 80;
		const buffer = 4;
		const fetchData = stub()
		.withArgs(0, 12)
		.returns(users);
		const renderItem = (t: AvatarUser) => <h1 style={{ height: itemHeight }}>{t.fullName}</h1>;
		const driver = setup({ itemHeight, listHeight, buffer, fetchData, renderItem });

		assert.equal(fetchData.called, true);
		assert.deepEqual(fetchData.lastCall.args, [0, 12]);

		await driver.scroll(12);

		assert.deepEqual(fetchData.lastCall.args, [0, 12]);
	});

	it('polls data if polling is enabled', async () => {
		const itemHeight = 10;
		const listHeight = 80;
		const buffer = 4;
		const fetchData = spy();
		const enablePolling = true;
		const pollingInterval = 200;
		const driver = setup({ itemHeight, listHeight, buffer, fetchData, enablePolling, pollingInterval });

		assert.equal(fetchData.callCount, 1);

		await driver.wait(pollingInterval);

		assert.equal(fetchData.callCount, 2);
	});

	it('does not poll data if polling is not enbaled', async () => {
		const itemHeight = 10;
		const listHeight = 80;
		const buffer = 4;
		const fetchData = spy();
		const pollingInterval = 200;
		const driver = setup({ itemHeight, listHeight, buffer, fetchData, pollingInterval });

		assert.equal(fetchData.callCount, 1);

		await driver.wait(pollingInterval);

		assert.equal(fetchData.callCount, 1);
	});
});
