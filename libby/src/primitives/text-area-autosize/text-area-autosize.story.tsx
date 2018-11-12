import * as React from 'react';
import { TextAreaAutosize } from './text-area-autosize';

export class TextAreaAutosizeStory extends React.Component<any, any> {
	state = {
		value: ''
	};

	render () {
		const changeValue = (value: string) => {
			this.setState({value});
		};

		const noOp = () => '';

		return (
			<span className='row'>
				<div className='column'>
					<h5 className='h5-title'>Regular</h5>
					<TextAreaAutosize value={this.state.value} placeholder='Placeholder text' onChange={changeValue}/>
				</div>
				<div className='column'>
					<h5 className='h5-title'>Read only</h5>
					<TextAreaAutosize value='You can’t edit this text' placeholder='Placeholder text' onChange={noOp} readOnly={true}/>
				</div>
				<div className='column'>
					<h5 className='h5-title'>Disabled</h5>
					<TextAreaAutosize value='' placeholder='This field is disabled' onChange={noOp} disabled={true}/>
				</div>
			</span>
		);
	}
}
