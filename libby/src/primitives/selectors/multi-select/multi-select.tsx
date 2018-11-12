import { BaseProps } from '../../../common';
import { namespacedClassnames } from '../../../common/namespace-classes';
import { SelectOption } from '../common';
import * as React from 'react';
import { ReactSelectCreatable, ReactSelectAsync } from './../../../common/react-select';

export type MultiSelectProps = {
	value: any;
	options: SelectOption[];
	placeholder: string | JSX.Element;
	onChange: (selectedOptions: SelectOption[]) => void;
	onInputChange?: (newInput: string) => void;
	optionRenderer?: (option: SelectOption) => JSX.Element;
	valueRenderer?: (option: SelectOption) => JSX.Element;
	onOpen?: () => void;
	onClose?: () => void;
	disabled?: boolean;
	allowCreate?: boolean;
	disableOptionFiltering?: boolean;
	createOptionPlaceholder?: string;
	isLoading?: boolean;
	newOptionValidator?: (text: string) => boolean;
	onPaste?: (e: ClipboardEvent) => void;
} & BaseProps;

export class MultiSelect extends React.Component<MultiSelectProps, any> {
	// Massive hack here for creatable multi-select
	// Want to know the secrets? Come visit me in London.
	creatableSelectElem: any;

	setCreatableSelectElem = (elem: any) => {
		this.creatableSelectElem = elem;
	}

	fakeLoadOptions = (_: string, cb: any) => {
		cb(null, {options: this.props.options});
	}

	onCreateNewOption = (obj: any) => {
		const newOptions = [...this.props.value, obj];
		this.onChange(newOptions);
		if (this.creatableSelectElem) {
			this.creatableSelectElem.select.setState({inputValue: ''});
		}
	}

	onChange = (options: SelectOption[]) => {
		this.props.onChange(options);
	}

	isValidNewOption = (option: {label: string}) => {
		return this.props.newOptionValidator ? this.props.newOptionValidator(option.label) : !!option.label;
	}

	promptTextCreator = (label: string) => {
		return `${this.props.createOptionPlaceholder || 'Create option'}: "${label}"`;
	}

	render () {
		const classNames = namespacedClassnames('multi-select', this.props.className);
		const props: any = {
			...this.props,
			loadOptions: this.fakeLoadOptions,
			className: classNames,
			clearable: false,
			openOnFocus: true,
			multi: true,
			backspaceToRemoveMessage: '',
			inputProps: {
				onPaste: this.props.onPaste
			},

			// This is needed when options are loaded async (like user search)
			// https://github.com/JedWatson/react-select/issues/761
			filterOption: this.props.disableOptionFiltering ? () => true : undefined
		};

		return this.props.allowCreate ? (
			<ReactSelectCreatable
				{...props}
				promptTextCreator={this.promptTextCreator}
				isValidNewOption={this.isValidNewOption}
				onSelectResetsInput={false}
				onBlurResetsInput={false}
				closeOnSelect={false}
				ref={this.setCreatableSelectElem}
				onNewOptionClick={this.onCreateNewOption}
			/>
		) : <ReactSelectAsync {...props}/>;
	}
}
