import { assert } from 'chai';
import { testViewCompPropsCreator, renderAndMountComp, noop } from 'answers-toolkit';
import { reactUniDriver } from 'unidriver';

import { createBasePromptViewDriver, BasePromptViewDriver } from './driver';
import { spy } from 'sinon';
import { ValidatedValueCompDriverCreator, ValidatedValueComp } from '../../todo-move-to-lib';

import * as jsdomGlobal from 'jsdom-global';
import { PromptViewProps, promptViewCreator } from '.';
import { FormInput } from '../form-input/form-input.comp';
import { createFormInputDriver } from '../form-input/driver';

const propsCreator = testViewCompPropsCreator<PromptViewProps<any>>({
	onConfirm: noop,
	onCancel: noop,
	title: 'some title',
	confirmText: 'bob',
	cancelText: 'test',
	additionalProps: {
		placeholder: 'bbbob'
	},
	t: () => 'bob'
});

// tslint:disable-next-line:max-line-length
const setup = <T>(comp: ValidatedValueComp<T>, driverCreator: ValidatedValueCompDriverCreator<T>) => (partialProps: Partial<PromptViewProps<T>>): BasePromptViewDriver<T> => {
	const props = propsCreator(partialProps);
	const Comp = promptViewCreator(comp);
	const elem = renderAndMountComp<PromptViewProps<T>>(Comp, props);
	const baseDriver = reactUniDriver(elem);
	return createBasePromptViewDriver(driverCreator)(baseDriver);
};

describe('BasePromptView', () => {

	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('calls right cb when confirmed', async () => {
		const onConfirm = spy();
		const driver = setup(FormInput, createFormInputDriver)({onConfirm});
		await driver.enterValue('some val');
		assert.equal(onConfirm.lastCall.args[0], 'some val');
	});

	it('has initial value', async () => {
		const driver = setup(FormInput, createFormInputDriver)({initialValue: 'bobz'});
		assert.equal(await driver.value(), 'bobz');
	});

	it('shows right strings', async () => {
		const driver = setup(FormInput, createFormInputDriver)({
			title: 'Some title',
			confirmText: 'bob',
			cancelText: 'bab',
			additionalProps: {
				placeholder: 'bob2'
			}
		});
		await driver.enterValue('some val');
		assert.equal(await driver.title(), 'Some title');
		assert.equal(await driver.confirmText(), 'bob');
		assert.equal(await driver.cancelText(), 'bab');
		// assert.equal(await driver.placeholder(), 'bob2');
	});

	it('works for phone input', async () => {
		// const onConfirm = spy();
		// const driver = setup(Checkbox, createCheckboxDriver)({
		// 	initialValue: false,
		// 	onConfirm,
		// });

		// await driver.enterValue(true);
		// assert.equal(onConfirm.lastCall.args[0], true);
	});

	it('validates value if passed validator', async () => {
		const onConfirm = spy();
		const validator = (value: string) => value === 'invalid string' ? 'validation error text' : true;
		const driver = setup(FormInput, createFormInputDriver)({onConfirm, validator});
		await driver.enterValue('invalid string');
		assert.equal(onConfirm.called, false);
		assert.equal(await driver.valid(), false);
		await driver.enterValue('bob');
		assert.equal(onConfirm.called, true);
		assert.equal(await driver.valid(), true);
	});
});
