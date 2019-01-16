import { assert } from 'chai';
import { testViewCompPropsCreator, renderAndMountComp } from '@wix/answers-app-core';
import { reactUniDriver } from 'unidriver';
import { FormControl, FormControlProps } from './';
import { createFormControlDriver } from './driver';

const propsCreator = testViewCompPropsCreator<FormControlProps>(() => ({
	label: 'label'
}));

const setup = (partialProps: Partial<FormControlProps>) => {
	const props = propsCreator(partialProps);
	const elem = renderAndMountComp<FormControlProps>(FormControl, props);
	const baseDriver = reactUniDriver(elem);
	return createFormControlDriver(baseDriver);
};

describe('FormControl', () => {
	it('Shows label with no validation error', async () => {
		const label = 'this is bob';
		const driver = setup({label, validationError: ''});
		assert.equal(await driver.label(), label);
		assert.equal(await driver.hasError(), false);
	});

	it('Shows validation error', async () => {
		const validationError = 'error message';
		const driver = setup({validationError});
		assert.equal(await driver.hasError(), true);
		assert.equal(await driver.errorMessage(), validationError);
	});
});
