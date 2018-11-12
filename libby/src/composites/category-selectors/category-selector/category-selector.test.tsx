
import { assert } from 'chai';
import { CategorySelectorProps } from './category-selector.comp';
import { renderCategorySelectorAndReturnDriver } from './category-selector.driver';
import { testDataCreator } from 'answers-lib';
import { renderFlatCatName } from '../common';
import { noop, randomFlatCategoryTree } from '../../../common';
import * as jsdomGlobal from 'jsdom-global';
import { spy } from 'sinon';

const propsCreator = (props: Partial<CategorySelectorProps>) => {
	const flatCats = randomFlatCategoryTree(3, 2);

	return testDataCreator<CategorySelectorProps>(() => ({
		value: flatCats[2],
		categories: flatCats,
		onChange: noop,
		placeholder: 'placeholder text'
	}))(props);
};

describe('CategorySelector', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('should render correctly', () => {
		const options = randomFlatCategoryTree(3, 2);
		const idx = 2;
		const props = propsCreator({categories: options, value: options[idx]});
		const driver = renderCategorySelectorAndReturnDriver(props);
		assert.equal(driver.getSelectedValue(), renderFlatCatName(options[idx]).label);
		assert.deepEqual(driver.getSelectionTitles(), options.map((i) => renderFlatCatName(i).label));
	});

	it('call cb on change', () => {
		const spyChange = spy();
		const props = propsCreator({onChange: spyChange});
		const driver = renderCategorySelectorAndReturnDriver(props);
		assert.equal(spyChange.called, false);
		driver.selectAtIndex(1);
		assert.equal(spyChange.called, true);
		assert.deepEqual(spyChange.lastCall.args, [props.categories[1]]);
	});
});
