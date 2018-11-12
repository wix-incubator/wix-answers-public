import { assert } from 'chai';
import { testViewCompPropsCreator, renderAndMountComp } from 'answers-toolkit';
import { reactUniDriver } from 'unidriver';
import { CheckboxGroup, CheckboxGroupProps, CheckboxGroupItem } from './';
import { createCheckboxGroupDriver } from './driver';
import { noop } from '../../common';
import { spy } from 'sinon';
import * as jsdomGlobal from 'jsdom-global';

const defaultItems: CheckboxGroupItem[] = [
	{id: 'item1', label: 'bob item1'},
	{id: 'item2', label: 'bob item2'},
	{id: 'item3', label: 'bob item3'},
];

// tslint:disable-next-line:max-line-length
const createValue = (items: CheckboxGroupItem[]) => new Map(items.map<[string, boolean]>((item, i) => [item.id, i >= 2]));

const defaultProps = {
	value: createValue(defaultItems),
	items: defaultItems,
	onChange: noop,
	labelRenderer: (id: string) => `bob ${id}`
};

const propsCreator = testViewCompPropsCreator<CheckboxGroupProps>(() => ({
	...defaultProps
}));

const setup = (partialProps: Partial<CheckboxGroupProps>) => {
	const props = propsCreator(partialProps);
	const elem = renderAndMountComp<CheckboxGroupProps>(CheckboxGroup, props);
	const baseDriver = reactUniDriver(elem);
	return createCheckboxGroupDriver(baseDriver);
};

describe('CheckboxGroup', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
		document.body.innerHTML = '';
	});

	afterEach(() => {
		cleanup();
	});

	it('Renders checkboxes for each value in value map', async () => {
		const driver = setup({});
		const expectedLabels = ['bob item1', 'bob item2', 'bob item3'];

		assert.deepEqual(await driver.labels(), expectedLabels);
	});

	it('Filters checkboxes by search when at least 7 items', async () => {
		const items = [
			{id: 'item1', label: 'bob item1'},
			{id: 'item2', label: 'bob item2'},
			{id: 'item3', label: 'bob item3'},
			{id: 'item4', label: 'bob item4'},
			{id: 'item5', label: 'bob item5'},
			{id: 'item6', label: 'bob item6'},
			{id: 'item7', label: 'bob item7'},
		];
		const value = createValue(items);

		const driver = setup({items, value});
		const expectedLabels = ['bob item2'];

		await driver.search('item2');
		assert.deepEqual(await driver.labels(), expectedLabels);
	});

	it('Renders disabled unselected checkboxes if reached selection limit', async () => {
		const maxSelections = 1;
		const driver = setup({maxSelections});
		const expectedLabels = ['bob item1', 'bob item2'];

		assert.deepEqual(await driver.disabledLabels(), expectedLabels);
	});

	it('Calls cb when selecting checkbox', async () => {
		const onChange = spy();
		const value = new Map(createValue(defaultItems));
		const driver = setup({onChange, value});

		await driver.toggle(1);
		const expectedMap = new Map(value.entries()).set('item2', !defaultProps.value.get('item2'));
		const expectedValues = Array.from(expectedMap);

		assert.equal(onChange.called, true);
		assert.deepEqual(Array.from(onChange.lastCall.args[0].entries()), expectedValues);
	});
});
