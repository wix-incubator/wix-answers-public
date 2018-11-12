import { noop } from '../../common';
import * as React from 'react';
import { NumericInput } from './numeric-input';

export class StoryOfNumericInput extends React.Component<any, any> {
	state = {
		value: 0
	};

	render () {
		const changeValue = (value: number | null) => {
			this.setState({value});
		};

		return (
			<span className='row'>
				<div className='column'>
					<h5 className='h5-title'>Regular</h5>
					<NumericInput value={this.state.value} placeholder='Number' onChange={changeValue}/>
				</div>
				<div className='column'>
					<h5 className='h5-title'>Disabled</h5>
					<NumericInput value={this.state.value} placeholder='Disabled' onChange={noop} disabled={true}/>
				</div>
			</span>
		);
	}
}
