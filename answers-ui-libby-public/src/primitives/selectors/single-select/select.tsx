import { BaseProps } from '../../../common';
import {namespacedClassnames} from '../../../common/namespace-classes';
import * as React from 'react';
import { ReactSelectAsync } from './../../../common/react-select';
import { SelectOption } from '../common';

export type SelectProps = {
	value: any;
	options: SelectOption[];
	onChange: (selectedOption: SelectOption) => void;
	placeholder: string;
	disabled?: boolean;
	searchable?: boolean;
	optionRenderer?: (option: SelectOption) => JSX.Element;
	valueRenderer?: (option: SelectOption) => JSX.Element;
	onOpen?: () => void;
	onClose?: () => void;
	onFocus?: () => void;
	onBlur?: () => void;
	onInputChange?: (newInput: string) => void;
	noResultsText?: string;
	disableOptionFiltering?: boolean;
	autoFocus?: boolean;
} & BaseProps;

const defaultProps = {
	disabled: false,
	searchable: true,
	openOnFocus: true,
	clearable: false,
	autosize: false
};

export class Select extends React.PureComponent<SelectProps> {
	fakeLoadOptions = (_: string, cb: any) => {
		cb(null, {options: this.props.options});
	}

	render () {
		const props: any = {
			...defaultProps,
			...this.props,

			// This is needed when options are loaded async (like user search)
			// https://github.com/JedWatson/react-select/issues/761
			filterOption: this.props.disableOptionFiltering ? () => true : undefined
		};

		const classNames = namespacedClassnames('select', props.className);

		return (
			<ReactSelectAsync
				{...props}
				loadOptions={this.fakeLoadOptions}
				onSelectResetsInput={false}
				onBlurResetsInput={false}
				className={classNames}
			/>
		);
	}
}
