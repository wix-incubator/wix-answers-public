import {namespacedClassnames, ValueCompProps} from '../../common';
import * as React from 'react';
import { KeyCode } from '../../common/key-codes.enum';
import * as ReactDOM from 'react-dom';
import { deprecatedMsg } from 'answers-lib';
import { InputSelection, calculateInputSelection } from '../../common/user-input-commons';
import { Tooltip } from '../tooltip/tooltip';

export type OptionalInputProps = {
	placeholder?: string;
	readOnly?: boolean;
	disabled?: boolean | string;
	onKeyDown?: (e: KeyboardEvent) => void;
	onEnter?: () => void;
	validationError?: string;
	onBlur?: () => void;
	onFocus?: () => void;
	className?: string;
	autoFocus?: boolean;
	spellCheck?: boolean;
	onSelect?: (selection: InputSelection) => void;
	type?: 'text' | 'password' | 'number';
	tooltipRelativeToBody?: boolean;
};

export type InputProps = ValueCompProps<string, OptionalInputProps>;

const defaultProps = {
	disabled: false
};

export const inputKey = 'input';

export class Input extends React.PureComponent<InputProps, {}> {
	inputRef: any = null;

	componentDidMount () {
		if (this.props.validationError !== undefined) {
			deprecatedMsg('Usage of validationError prop in <Input/> is no longer valid');
		}
	}

	setInputRef = (ref: any) => this.inputRef = ref;

	focus = () => {
		if (this.inputRef) {
			const input = ReactDOM.findDOMNode(this.inputRef) as HTMLInputElement;
			input.focus();
		}
	}

	onChange = (e: any) => {
		this.props.onChange(e.target.value);
	}

	onKeyDown = (e: any) => {
		const {props} = this;
		if (e.keyCode === KeyCode.ENTER && props.onEnter) {
			props.onEnter();
		}

		if (props.onKeyDown) {
			props.onKeyDown(e);
		}
	}

	onSelect = (e: any) => {
		if (this.props.onSelect) {
			const t = e.target;
			const selection = calculateInputSelection(t);
			this.props.onSelect(selection);
		}
	}

	render () {
		const disabledTooltipText = (typeof this.props.disabled === 'string') ? this.props.disabled : '';

		const props = {...defaultProps, ...this.props, disabled: !!this.props.disabled};
		const invalid = !!props.validationError;
		const classNames = namespacedClassnames(inputKey, props.className);
		const inputFieldClassNames = namespacedClassnames('input-field', {invalid});

		const inputField = (
			<input
				{...props}
				className={inputFieldClassNames}
				type={props.type || 'text'}
				ref={this.setInputRef}
				onChange={this.onChange}
				onKeyDown={this.onKeyDown}
				onSelect={this.onSelect}
			/>
		);

		const renderInputField = () => {
			return disabledTooltipText ? (
				<Tooltip body={disabledTooltipText} relativeToBody={props.tooltipRelativeToBody}>
					{inputField}
				</Tooltip>
			) : inputField;
		};

		return (
			<span className={classNames}>
				{renderInputField()}
				{invalid ? <div className='validation-error'>{props.validationError}</div> : null}
			</span>
		);
	}
}
