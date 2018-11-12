
import { assert } from 'chai';
import { MultiInputProps } from './multi-input';
import { renderMultiInputAndReturnDriver } from './multi-input.driver';
import * as sinon from 'sinon';
import * as jsdomGlobal from 'jsdom-global';
import { noop } from '../../common';

const propsCreator = (props: Partial<MultiInputProps>): MultiInputProps => {
	return {
		values: ['bob'],
		onChange: noop,
		errorMessage: '',
		validationRegex: /.*/i,
		placeholder: 'placeholder',
		...props
	};
};

describe('MultiInput', () => {
	let cleanup: any;

	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('should show tags correctly', () => {
		const expectedValues = ['bob', 'bob1', 'bob13'];
		const props = propsCreator({values: expectedValues});
		const driver = renderMultiInputAndReturnDriver({...props});

		assert.deepEqual(driver.getTags(), expectedValues);
		assert.equal(driver.isErrorMsgVisible(), false);
		assert.equal(driver.isDisabled(), false);
	});

	it('should add Tag correctly once it is validated', () => {
		const spy = sinon.spy();
		const tagToAdd = 'LOL';
		const props = propsCreator({onChange: spy});
		const driver = renderMultiInputAndReturnDriver(props);

		assert.equal(spy.called, false);
		driver.addTag(tagToAdd);
		assert.equal(spy.called, true);
		assert.deepEqual(spy.lastCall.args[0], [...props.values, tagToAdd]);
	});

	it('should not add Tag if validation regex failed', () => {
		const spy = sinon.spy();
		const testRegex = /(bob1)/i;
		const tagToAdd = 'notAddingThisBob';
		const props = propsCreator({validationRegex: testRegex, onChange: spy});
		const driver = renderMultiInputAndReturnDriver(props);

		assert.equal(driver.isTagRejected(), false);
		assert.equal(spy.called, false);

		driver.addTag(tagToAdd);

		assert.equal(driver.isTagRejected(), true);
		assert.equal(spy.called, false);
	});

	it('calls onBlur correctly', () => {
		const spy = sinon.spy();
		const props = propsCreator({onBlur: spy});
		const driver = renderMultiInputAndReturnDriver(props);

		assert.equal(spy.called, false);
		driver.addTag('');
		driver.blur();
		assert.equal(spy.called, true);
	});

	it('should disable input when disabled is passed via props', () => {
		const props = propsCreator({disabled: true});
		const driver = renderMultiInputAndReturnDriver(props);

		assert.equal(driver.isDisabled(), true);
	});

	it('should show error msg if passed via props', () => {
		const props = propsCreator({errorMessage: 'HI, THIS IS ERROR'});
		const driver = renderMultiInputAndReturnDriver(props);

		assert.equal(driver.isErrorMsgVisible(), true);
	});
});
