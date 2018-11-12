
import * as React from 'react';
import { MultiSelect, SelectOption, Text } from '../../..';
import { namespacedClassnames, ValueCompProps, FlatCategoryList, FlatCategory } from '../../../common';
import { renderFlatCatName, BaseCategorySelectorProps, categoryOptionRenderer, categoryValueRenderer } from '../common';

export type MultiCategorySelectorProps = ValueCompProps<FlatCategoryList> & BaseCategorySelectorProps;

export class MultiCategorySelector extends React.PureComponent<MultiCategorySelectorProps> {

	onChange = (vals: SelectOption[]) => {
		const valsIds = vals.map((i) => i.value);
		const selectedCats = this.props.categories.filter((i) => valsIds.indexOf(i.id) > -1);
		this.props.onChange(selectedCats);
	}

	render () {
		const {props} = this;
		const options = props.categories.map((i: FlatCategory) => renderFlatCatName(i));
		const selectedVals = props.value.map((i) => renderFlatCatName(i));
		const classes = namespacedClassnames('multi-category-selector', {'with-error': !!props.errorMsg});

		return (
			<div className={classes}>
				<MultiSelect
					value={selectedVals}
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
