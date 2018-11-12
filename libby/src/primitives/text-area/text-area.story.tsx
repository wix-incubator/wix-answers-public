import * as React from 'react';
import {TextArea} from './text-area';

export class TextAreaStory extends React.Component<any, any> {
	state = {
		value: ''
	};

	render () {
		const noOp = () => 42;

		const changeValue = (value: string) => {
			this.setState({value});
		};

		return (
			<span className='row'>
				<div className='column'>
					<h5 className='h5-title'>Regular</h5>
					<TextArea value={this.state.value} placeholder='Placeholder text' onChange={changeValue}/>
				</div>
				<div className='column'>
					<h5 className='h5-title'>Read only</h5>
					<TextArea value='You can’t edit this text' placeholder='Placeholder text' onChange={noOp} readOnly={true}/>
				</div>
				<div className='column'>
					<h5 className='h5-title'>Disabled</h5>
					<TextArea value='' placeholder='This field is disabled' onChange={noOp} disabled={true}/>
				</div>
			</span>
		);
	}
}
