import {namespacedClassnames} from '../../common';
import * as React from 'react';
import { InputSelection, calculateTextAreaSelection } from '../../common/user-input-commons';

export type TextAreaProps = {
	onChange: (value: string) => void;
	value: string;
	placeholder?: string;
	readOnly?: boolean;
	disabled?: boolean;
	onBlur?: () => void;
	onKeyDown?: (e: any) => void;
	onSelect?: (selection: InputSelection) => void;
};

const defaultProps = {
	disabled: false,
};

export class TextArea extends React.Component<TextAreaProps> {
	onChange = (e: any) => {
		this.props.onChange(e.target.value);
	}

	onSelect = (e: any) => {
		if (this.props.onSelect) {
			const t = e.target;

			const selection = calculateTextAreaSelection(t, this.props.value);
			this.props.onSelect(selection);
		}
	}

	render () {
		const partialProps = this.props;
		const props = {...defaultProps, ...partialProps};
		const classNames = namespacedClassnames('text-area');

		return (
			<textarea
				className={classNames}
				placeholder={props.placeholder}
				value={props.value}
				onChange={this.onChange}
				onSelect={this.onSelect}
				disabled={props.disabled}
				readOnly={props.readOnly}
				onBlur={props.onBlur}
				onKeyDown={props.onKeyDown}
			/>
		);
	}
}
