import * as React from 'react';
import { assert } from 'chai';
import { testViewCompPropsCreator, renderAndMountComp } from 'answers-toolkit';
import { reactUniDriver } from 'unidriver';
import { InfoBox, InfoBoxProps } from '.';
import { createInfoBoxDriver } from './driver';
import * as jsdomGlobal from 'jsdom-global';

const propsCreator = testViewCompPropsCreator<InfoBoxProps>(() => ({
	title: 'Some title',
	mainBody: 'bob' as any,
	additionalBody: 'bobs' as any,
	showLessText: 'Show less',
	showMoreText: 'Show more'
}));

const setup = (partialProps: Partial<InfoBoxProps>) => {
	const props = propsCreator(partialProps);
	const elem = renderAndMountComp<InfoBoxProps>(InfoBox, props);
	const baseDriver = reactUniDriver(elem);
	return createInfoBoxDriver(baseDriver);
};

describe('InfoBox', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
		document.body.innerHTML = '';
	});

	afterEach(() => {
		cleanup();
	});

	it('render title', async () => {
		const driver = setup({
			title: <div>title222~!!</div>,
		});
		assert.include(await driver.titleText(), 'title222~!!');
	});

	it('shows main body but hides additional', async () => {
		const driver = setup({
			mainBody: <div>This is visible!</div>,
			additionalBody: <div>This is hidden!</div>
		});
		assert.include(await driver.bodyText(), 'This is visible!');
		assert.notInclude(await driver.bodyText(), 'This is hidden!');
	});

	it('shows additional body when expanded', async () => {
		const driver = setup({
			additionalBody: <div>This is hidden!</div>
		});

		await driver.toggleExpand();
		assert.include(await driver.bodyText(), 'This is hidden!');
	});

	it('shows right labels on expand button', async () => {
		const driver = setup({
			showMoreText: 'bob1',
			showLessText: 'bob2'
		});

		assert.equal(await driver.toggleExpandText(), 'bob1');
		await driver.toggleExpand();
		assert.equal(await driver.toggleExpandText(), 'bob2');
		await driver.toggleExpand();
		assert.equal(await driver.toggleExpandText(), 'bob1');
	});

	it('does not show toggle expand btn when no additional body was passed', async () => {
		const driver = setup({
			additionalBody: undefined
		});

		assert.equal(await driver.hasToggleExpand(), false);
	});
});
