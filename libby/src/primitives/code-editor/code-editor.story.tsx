import * as React from 'react';
import { CodeEditor } from './code-editor';

export class CodeEditorStory extends React.Component<any, any> {
	state = {
		value: ''
	};

	changeValue = (val: string) => {
		this.setState({value: val});
	}

	render () {
		return (
			<div className='demo'>
				<h2>HTML</h2>
				<CodeEditor value={this.state.value} onChange={this.changeValue} mode='html'/>
				<h2>JS</h2>
				<CodeEditor value={this.state.value} onChange={this.changeValue} mode='javascript'/>
			</div>
		);
	}
}
