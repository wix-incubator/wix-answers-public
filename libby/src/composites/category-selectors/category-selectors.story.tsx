import * as React from 'react';
import { Column, FlatCategory, FlatCategoryList, randomFlatCategoryTree } from '../../common';
import { CategorySelector } from './category-selector/category-selector.comp';
import { MultiCategorySelector } from './multi-category-selector/multi-category-selector.comp';

export class StoryOfCategorySelectors extends React.PureComponent<any> {
	flatCats = randomFlatCategoryTree(10, 4);

	state = {
		singleCat: null as any,
		multiCat: [] as any
	};

	singleOnChange = (newVal: FlatCategory) => {
		this.setState({singleCat: newVal});
	}

	multiOnChange = (newVals: FlatCategoryList) => {
		this.setState({multiCat: newVals});
	}

	render () {
		const {state} = this;
		const currentCat = state.singleCat;
		const multiCurrentCat = state.multiCat;
		this.flatCats[2].parentName = '123902139012 as as3';
		const style = {
			style: {width: 210}
		};

		return (
			<div>
				<div className='row'>
					<h4 className='h4-title'>Single</h4>
					<Column title='Default' {...style}>
						<CategorySelector
							value={currentCat}
							categories={this.flatCats}
							onChange={this.singleOnChange}
							placeholder='placeholder'
						/>
					</Column>
					<Column title='Error' {...style}>
						<CategorySelector
							value={currentCat}
							categories={this.flatCats}
							onChange={this.singleOnChange}
							placeholder='placeholder'
							errorMsg='Hello, this is error'
						/>
					</Column>
					<Column title='Disabled' {...style}>
						<CategorySelector
							disabled={true}
							value={currentCat}
							categories={this.flatCats}
							onChange={this.singleOnChange}
							placeholder='placeholder'
						/>
					</Column>
				</div>
				<div className='row'>
					<h4 className='h4-title'>Multi</h4>
					<Column title='Default' {...style}>
						<MultiCategorySelector
							value={multiCurrentCat}
							categories={this.flatCats}
							onChange={this.multiOnChange}
							placeholder='placeholder'
						/>
					</Column>
					<Column title='Error' {...style}>
						<MultiCategorySelector
							value={multiCurrentCat}
							categories={this.flatCats}
							onChange={this.multiOnChange}
							placeholder='placeholder'
							errorMsg='Hello, this is error'
						/>
					</Column>
					<Column title='Disabled' {...style}>
						<MultiCategorySelector
							value={multiCurrentCat}
							categories={this.flatCats}
							onChange={this.multiOnChange}
							placeholder='placeholder'
							disabled={true}
						/>
					</Column>
				</div>
			</div>
		);
	}
}
