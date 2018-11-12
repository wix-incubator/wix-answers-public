import { assert } from 'chai';
import { spy } from 'sinon';
import * as driver from './form-input.legacy.driver';
import * as jsdomGlobal from 'jsdom-global';
import { FormInputProps } from '../..';

const propsCreator = (props: Partial<FormInputProps>): FormInputProps => {
	return {
		value: 'bob',
		label: 'i r label',
		onChange: spy(),
		validationError: '',
		placeholder: 'placeholder',
		...props
	};
};

describe('input', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('renders label and value correctly', () => {
		const props = propsCreator({value: 'bobs kitchen', label: 'bobs label'});
		const comp = driver.createFormInput(props);
		assert.equal(comp.getLabel(), props.label);
		assert.equal(comp.getValue(), props.value);
	});

	it('does not show validation msg', () => {
		const props = propsCreator({});
		const comp = driver.createFormInput(props);
		assert.equal(comp.isValid(), true);
		assert.equal(comp.getValidationMessage(), '');
	});

	it('shows validation msg', () => {
		const props = propsCreator({validationError: 'test'});
		const comp = driver.createFormInput(props);
		assert.equal(comp.isValid(), false);
		assert.equal(comp.getValidationMessage(), props.validationError);
	});
});
