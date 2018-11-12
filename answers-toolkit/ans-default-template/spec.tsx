import { assert } from 'chai';
import { testViewCompPropsCreator, renderAndMountComp } from 'answers-app-core';
import { reactUniDriver } from 'unidriver';
import { {{camelCaseName}}, {{camelCaseName}}Props } from './';
import { create{{camelCaseName}}Driver } from './driver';

const propsCreator = testViewCompPropsCreator<{{camelCaseName}}Props>(() => ({
	value: 'bob',
	onChange: () => null
}));

const setup = (partialProps: Partial<{{camelCaseName}}Props>) => {
	const props = propsCreator(partialProps);
	const elem = renderAndMountComp<{{camelCaseName}}Props>({{camelCaseName}}, props);
	const baseDriver = reactUniDriver(elem);
	return create{{camelCaseName}}Driver(baseDriver);
};

describe('{{camelCaseName}}', () => {
	it('shows the title', async () => {
		const driver = setup({});
		assert.equal(await driver.text(), 'Dod shel gever');
	});
});
