import * as React from 'react';
import { namespacedClassnames } from '../../common/namespace-classes';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import { InputSelection } from '../../common/user-input-commons';
import { getCodeEditorUserInputSelection } from './code-editor-utils';

const maybeRequireLanguageModes = (() => {
	let required = false;
	return () => {
		if (!required) {
			// tslint:disable-next-line:no-var-require
			require('codemirror/mode/htmlmixed/htmlmixed');
		}
		required = true;
	};
})();

export type CodeEditorMode = 'html' | 'javascript';

export type CodeEditorProps = {
	value: string;
	onChange: (value: string) => void;
	mode: CodeEditorMode
	onBlur?: () => void;
	onKeyDown?: (e: any) => void;
	onSelect?: (selection: InputSelection) => void;
};

export type CodeEditorState = {
	isFocused: boolean;
};

export class CodeEditor extends React.PureComponent<CodeEditorProps, CodeEditorState> {
	state: CodeEditorState = {
		isFocused: false
	};

	componentWillMount () {
		maybeRequireLanguageModes();
	}

	onChangeHandler = (_: any, __: any, value: string) => {
		this.props.onChange(value);
	}

	handleFocus = () => this.setState({isFocused: true});

	handleBlur = () => {
		this.setState({isFocused: false});
		if (this.props.onBlur) {
			this.props.onBlur();
		}
	}

	handleKeyDown = (_: any, e: Event) => {
		if (this.props.onKeyDown) {
			this.props.onKeyDown(e);
		}
	}

	getCodeMirrorMode = (): string => {
		const mode = this.props.mode;
		return mode === 'html' ? 'htmlmixed' : mode;
	}

	handleSelection = (editor: any, data: any) => {
		if (this.props.onSelect && data) {
			const sel = getCodeEditorUserInputSelection(editor, data);
			this.props.onSelect(sel);
		}
	}

	render () {
		const props = this.props;
		const classNames = namespacedClassnames('code-editor', {'has-focus': this.state.isFocused});

		const options = {
			mode: this.getCodeMirrorMode(),
			lineNumbers: true
		};

		return (
			<div className={classNames}>
				<CodeMirror
					value={props.value}
					onChange={this.onChangeHandler}
					options={options}
					autoCursor={false}
					onFocus={this.handleFocus}
					onBlur={this.handleBlur}
					onKeyDown={this.handleKeyDown}
					onSelection={this.handleSelection}
				/>
			</div>
		);
	}
}
