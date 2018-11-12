
import { assert } from 'chai';
import { MultiCategorySelectorProps } from './multi-category-selector.comp';
import { renderMultiCategorySelectorAndReturnDriver } from './multi-category-selector.driver';
import { testDataCreator, noop } from 'answers-lib';
import { renderFlatCatName } from '../common';
import * as jsdomGlobal from 'jsdom-global';
import { spy } from 'sinon';
import { randomFlatCategoryTree } from '../../../common';

const propsCreator = (props: Partial<MultiCategorySelectorProps>) => {
	const flatCats = randomFlatCategoryTree(3, 2);

	return testDataCreator<MultiCategorySelectorProps>(() => ({
		value: [],
		categories: flatCats,
		onChange: noop,
		placeholder: 'placeholder text'
	}))(props);
};

describe('MultiCategorySelector', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('shows selected value', () => {
		const options = randomFlatCategoryTree(4, 2);
		const selectedOptions = [options[2], options[3]];
		const expectedSelectionTitles = options
			.filter((i) => !selectedOptions.includes(i))
			.map((i) => renderFlatCatName(i).label);
		const props = propsCreator({categories: options, value: selectedOptions});
		const driver = renderMultiCategorySelectorAndReturnDriver(props);

		assert.deepEqual(driver.getSelectedValues(), props.value.map((i) => renderFlatCatName(i).label));
		assert.deepEqual(driver.getSelectionTitles(), expectedSelectionTitles);
	});

	it('call cb on change', () => {
		const spyChange = spy();
		const props = propsCreator({onChange: spyChange});
		const driver = renderMultiCategorySelectorAndReturnDriver(props);

		assert.equal(spyChange.called, false);
		driver.selectAtIndex(1);
		assert.equal(spyChange.called, true);
		assert.deepEqual(spyChange.lastCall.args[0], [props.categories[1]]);
	});
});
