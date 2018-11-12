import * as React from 'react';
import {PhoneInput} from '.';
import { PhoneNumber } from '../../common';

export class StoryOfPhoneInput extends React.Component<any, any> {
	state = {
		value: {
			countryCode: '972',
			number: '526470337'
		}
	};

	onChange = (value: PhoneNumber) => {
		this.setState({value});
	}

	render () {
		return (
			<span className='row'>
				<div className='column'>
					<PhoneInput
						value={this.state.value}
						placeholder='Placeholder'
						onChange={this.onChange}
						autoFocus={true}
					/>
				</div>
			</span>
		);
	}
}
