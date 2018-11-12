
import * as React from 'react';
import { Select, SelectOption, Text } from '../../..';
import { namespacedClassnames, FlatCategory } from '../../../common';
import {
	renderFlatCatName,
	BaseCategorySelectorProps,
	categoryOptionRenderer,
	categoryValueRenderer
} from '../common';

export type CategorySelectorProps = {
	value: FlatCategory | null;
	onChange: (newVal: FlatCategory) => void;
} & BaseCategorySelectorProps;

export class CategorySelector extends React.PureComponent<CategorySelectorProps> {

	onChange = (val: SelectOption) => {
		const selectedCat = this.props.categories.filter((i) => i.id === val.value)[0];
		this.props.onChange(selectedCat);
	}

	render () {
		const {props} = this;
		const options = props.categories.map((i: FlatCategory) => renderFlatCatName(i));
		const selectedVal = props.value ? renderFlatCatName(props.value) : null;
		const classes = namespacedClassnames('category-selector', {'with-error': !!props.errorMsg});

		return (
			<div className={classes}>
				<Select
					value={selectedVal}
					options={options}
					onChange={this.onChange}
					placeholder={props.placeholder}
					optionRenderer={categoryOptionRenderer}
					valueRenderer={categoryValueRenderer}
					disabled={props.disabled || false}
				/>
				{props.errorMsg ? <Text type='t4a' className='validation-error'>{props.errorMsg}</Text> : null}
			</div>
		);
	}
}
