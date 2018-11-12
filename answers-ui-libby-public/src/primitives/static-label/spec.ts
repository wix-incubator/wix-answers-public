import { assert } from 'chai';
import { testViewCompPropsCreator, renderAndMountComp } from 'answers-toolkit';
import { reactUniDriver } from 'unidriver';
import { StaticLabel, StaticLabelProps, StaticLabelSize, StaticLabelType } from '.';
import { createStaticLabelDriver } from './driver';

const propsCreator = testViewCompPropsCreator<StaticLabelProps>(() => ({
	name: 'Default',
	type: StaticLabelType.INFO,
	size: StaticLabelSize.SMALL
}));

const setup = (partialProps: Partial<StaticLabelProps>) => {
	const props = propsCreator(partialProps);
	const elem = renderAndMountComp<StaticLabelProps>(StaticLabel, props);
	const baseDriver = reactUniDriver(elem);
	const driver = createStaticLabelDriver(baseDriver);
	return { elem, driver };
};

describe('StaticLabel', () => {
	it('Shows text', async () => {
		const name = 'Joseph';
		const { driver } = setup({ name });
		assert.equal(await driver.text(), name);
	});

	it('Shows text and icon', async () => {
		const name = 'Joseph';
		const { driver } = setup({ name, type: StaticLabelType.NEUTRALICON });
		assert.include(await driver.text(), name);
		assert.isTrue(await driver.hasIcon());
	});

	it('Doesnt Show icon', async () => {
		const name = 'Joseph';
		const { driver } = setup({ name, type: StaticLabelType.NEUTRAL });
		assert.include(await driver.text(), name);
		assert.isFalse(await driver.hasIcon());
	});
});
