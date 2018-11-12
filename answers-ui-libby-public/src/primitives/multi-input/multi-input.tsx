
import * as React from 'react';
import * as TagsInput from 'react-tagsinput';
import AutosizeInput from 'react-input-autosize';
import { namespacedClassnames } from '../../common/namespace-classes';
import { Text } from '../../typography';
import { KeyCode } from '../../common/key-codes.enum';
import * as classNames from 'classnames';

export type MultiInputProps = {
	values: string[];
	placeholder: string;
	errorMessage?: string;
	validationRegex?: RegExp;
	additionalAddKeys?: KeyCode[];
	disabled?: boolean;
	onBlur?: () => void;
	onChange: (values: string[]) => void;
};

export type MultiInputState = {
	validationRejected: boolean;
	isFocused: boolean;
};

export class MultiInput extends React.PureComponent <MultiInputProps, MultiInputState> {
	inputRef: any = null;

	state: MultiInputState = {
		validationRejected: false,
		isFocused: false
	};

	onInputRef = (ref: any) => this.inputRef = ref;

	onValidationReject = () => this.setState({validationRejected: true});

	onTagsChange = (tags: string[]) => {
		this.setState({validationRejected: false});
		this.props.onChange(tags);
	}

	onInputFocus = () => {
		if (this.inputRef) {
			this.inputRef.focus();
		}
	}

	autosizingRenderInput = (props: any) => {
		// https://github.com/olahol/react-tagsinput#how-do-i-fix-warning-unknown-prop-addtag
		const {addTag, ...other} = props;

		const isRejected = this.state.validationRejected ? 'is-rejected' : '';

		const onChange = (e: any) => {
			props.onChange(e);

			if (!e.target.value && this.state.validationRejected) {
				this.setState({validationRejected: false});
			}
		};

		const onFocus = (e: any) => {
			this.setState({isFocused: true});
			props.onFocus(e);
		};

		const onBlur = (e: any) => {
			this.setState({isFocused: false});
			props.onBlur(e);

			if (this.props.onBlur) {
				this.props.onBlur();
			}
		};

		return (
			<AutosizeInput
				{...other}
				inputClassName={isRejected}
				inputRef={this.onInputRef}
				onFocus={onFocus}
				onBlur={onBlur}
				onChange={onChange}
			/>
		);
	}

	render () {
		const props = this.props;
		const maybeHasValues = !!props.values.length ? 'has-values' : '';
		const maybeDisabled = !!props.disabled ? 'disabled' : '';
		const isFocused = this.state.isFocused ? 'focused' : '';
		const isErrored = !!props.errorMessage ? 'with-error' : '';

		const inputProps = !props.placeholder || !!maybeHasValues ?
			{placeholder: ''} : {placeholder: props.placeholder};

		const pasteSplit = (data: any) => [
			data
			.replace(/[\r\n,;]/g, ' ')
			.split(' ')
			.map((d: any) => d.trim())
			.join(' ')
		];

		const maybeIsInvalidMsg = !!props.errorMessage ?
			<Text className='invalid-msg' type='t4a'>{props.errorMessage}</Text> : null;

		const baseAddKeys = [KeyCode.TAB, KeyCode.ENTER];
		const addKeys = !!props.additionalAddKeys ? [...baseAddKeys, ...props.additionalAddKeys] : baseAddKeys;

		const namespaceclassNames = namespacedClassnames('multi-input', maybeHasValues, maybeDisabled);
		const wrapperClassNames = classNames('multi-input-wrapper', isFocused, isErrored);

		return (
			<div className={namespaceclassNames}>
				<div className={wrapperClassNames} onClick={this.onInputFocus}>
					<TagsInput
						renderInput={this.autosizingRenderInput}
						onChange={this.onTagsChange}
						value={props.values}
						validationRegex={props.validationRegex || /.*/i}
						onValidationReject={this.onValidationReject}
						addKeys={addKeys}
						addOnPaste={true}
						onlyUnique={true}
						addOnBlur={true}
						removeKeys={[]}
						maxTags={30}
						pasteSplit={pasteSplit}
						inputProps={inputProps}
						disabled={!!props.disabled}
					/>
				</div>

				{maybeIsInvalidMsg}
			</div>
		);
	}
}
