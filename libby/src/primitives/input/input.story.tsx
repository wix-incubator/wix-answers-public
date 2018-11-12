import * as React from 'react';
import { Input } from './input';

export class StoryOfInput extends React.Component<any, any> {
	state = {
		value: ''
	};

	render () {
		const noOp = () => 42;

		const changeValue = (value: string) => {
			this.setState({value});
		};

		const onEnter = () => {
			alert('You pressed enter!');
		};

		return (
			<span className='row'>
				<div className='column'>
					<h5 className='h5-title'>Regular</h5>
					<Input value={this.state.value} placeholder='Placeholder' onChange={changeValue} />
				</div>
				<div className='column'>
					<h5 className='h5-title'>Read only</h5>
					<Input value='You can’t edit this text' placeholder='Placeholder text' onChange={noOp} readOnly={true}/>
				</div>
				<div className='column'>
					<h5 className='h5-title'>Disabled with tooltip</h5>
					<Input value='' placeholder='This field is disabled' onChange={noOp} disabled={'It is disabled'}/>
				</div>
				<div className='column'>
					<h5 className='h5-title'>With Enter Press</h5>
					<Input
						value={this.state.value}
						placeholder='Placeholder text'
						onChange={changeValue}
						onEnter={onEnter}
					/>
				</div>
			</span>
		);
	}
}
