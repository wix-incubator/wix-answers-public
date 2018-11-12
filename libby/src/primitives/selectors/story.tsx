import * as React from 'react';
import { Select } from './single-select/select';
import { MultiSelect } from './multi-select/multi-select';
import { SelectOption } from './common';

export type StoryOfSelectorsState = {
	selectedOptionValue: SelectOption | null,
	multiSelectedOptionValues: SelectOption[]
};

export class StoryOfSelectors extends React.Component<any, any> {

	state: StoryOfSelectorsState = {
		selectedOptionValue: null,
		multiSelectedOptionValues: []
	};

	changeValue = (selectedOption: SelectOption) => {
		this.setState({selectedOptionValue: selectedOption.value});
	}

	changeMultiValues = (selectedOptions: SelectOption[]) => {
		this.setState({multiSelectedOptionValues: selectedOptions});
	}

	render () {
		const options: SelectOption[] = [
			{ value: 1, label: 'Option 1' },
			{ value: 2, label: 'Option 2' },
			{ value: 3, label: 'Option 3' },
			{ value: 4, label: 'Option 4', disabled: true },
			{ value: 5, label: 'Option 5' },
			{ value: 6, label: 'Option 6' },
			{ value: 7, label: 'Option 7' },
			{ value: 8, label: 'Option 8', className: 'type-1' }
		];

		const colStyle = {
			width: '170px'
		};

		return (
			<div className='story-container'>
				<div>
					<h3 className='h3-title'>Select</h3>
					<div className='column' style={colStyle}>
						<h5 className='h5-title'>Regular</h5>
						<Select
							value={this.state.selectedOptionValue}
							options={options}
							placeholder='Select Option'
							onChange={this.changeValue}
						/>
					</div>
					<div className='column' style={colStyle}>
						<h5 className='h5-title'>Disabled</h5>
						<Select
							value={this.state.selectedOptionValue}
							options={options}
							placeholder='Select Option'
							onChange={this.changeValue}
							disabled={true}
						/>
					</div>
				</div>
				<div>
					<h3 className='h3-title'>Multi Select</h3>
					<div className='column' style={colStyle}>
						<h5 className='h5-title'>Default</h5>
						<MultiSelect
							value={this.state.multiSelectedOptionValues}
							options={options}
							placeholder='Select Option'
							allowCreate={true}
							onChange={this.changeMultiValues}
						/>
					</div>
					<div className='column' style={colStyle}>
						<h5 className='h5-title'>Multi Select - Disabled</h5>
						<MultiSelect
							value={this.state.multiSelectedOptionValues}
							options={options}
							placeholder='Select Option'
							onChange={this.changeMultiValues}
							disabled={true}
						/>
					</div>
				</div>
			</div>
		);
	}
}
