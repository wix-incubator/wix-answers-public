import * as React from 'react';
import {FormInput} from './form-input.comp';
import { Column } from '../../common';

export class StoryOfFormInput extends React.Component<any, any> {
	state = {
		value: ''
	};

	changeValue = (value: string) => {
		this.setState({value});
	}

	render () {
		const {state} = this;

		return (
			<span className='row'>
				<Column title='Default' style={{maxWidth: 200}}>
					<FormInput
						value={state.value}
						placeholder='Placeholder'
						validationError={this.state.value ? 'I will appear when error' : ''}
						label='this is label'
						onChange={this.changeValue}
					/>
				</Column>
				<Column title='Readonly'>
					<FormInput
						value={'Cant touch this'}
						placeholder='Placeholder'
						validationError=''
						label='this is label'
						onChange={this.changeValue}
						readOnly={true}
					/>
				</Column>
				<Column title='Disabled'>
					<FormInput
						value={'I am disabled'}
						placeholder='Placeholder'
						validationError=''
						label='this is label'
						onChange={this.changeValue}
						disabled={true}
					/>
				</Column>
				<Column title='Disabled with validation'>
					<FormInput
						value={'Disabled value'}
						placeholder='Placeholder'
						validationError='This is error msg'
						label='this is label'
						onChange={this.changeValue}
						disabled={true}
					/>
				</Column>
				<Column title='Readonly with validation'>
					<FormInput
						value={'Cant touch this'}
						placeholder='Placeholder'
						validationError='This is error msg'
						label='this is label'
						onChange={this.changeValue}
						readOnly={true}
					/>
				</Column>
			</span>
		);
	}
}
