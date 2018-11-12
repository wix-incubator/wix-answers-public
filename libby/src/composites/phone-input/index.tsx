import * as React from 'react';
import { namespacedClassnames } from '../../common/namespace-classes';
import { BaseProps, PhoneNumber } from '../../common';
import { ReactTelephoneInput } from 'react-telephone-input';
import { ValueCompProps } from '../../todo-move-to-lib';

export const phoneInputKey = 'phone-input';

export type PhoneInputProps = ValueCompProps<PhoneNumber, OptionalPhoneInputProps>;

export type OptionalPhoneInputProps = {
	placeholder?: string;
	onFocus?: () => void;
	onBlur?: () => void;
	autoFocus?: boolean;
} & BaseProps;

export type PhoneInputState = {
	isFocused: boolean;
};

export class PhoneInput extends React.PureComponent<PhoneInputProps, PhoneInputState> {
	// tslint:disable-next-line:max-line-length
	flagsImagePath = 'https://d2x3xhvgiqkx42.cloudfront.net/12345678-1234-1234-1234-1234567890ab/2017/02/19/7fe0a748-752c-4a0a-9c0b-45aa87afce89.png';
	preferredCountries = ['il', 'us', 'gb', 'ru', 'br', 'fr', 'ca', 'au', 'de', 'it', 'es', 'pt', 'jp', 'kr', 'cn'];

	state: PhoneInputState = {
		isFocused: false
	};

	private inputElem: HTMLInputElement | null = null;

	componentDidMount () {
		if (this.inputElem) {
			const v = this.inputElem.value;
			this.inputElem.value = '';
			this.inputElem.value = v;
		}
	}

	stringToUserPhoneNumber = (phoneNumber: string): PhoneNumber => {
		const regex = /\+|\-|\(|\)| /g;
		const phoneNumberArray = phoneNumber.split(regex);
		return {
			countryCode: phoneNumberArray[1],
			number: phoneNumberArray.slice(2).join('').replace(regex, '')
		};
	}

	onInputPhoneNumberChange = (num: string) => {
		const n = this.stringToUserPhoneNumber(num);
		this.props.onChange(n);
	}

	onFocus = () => {
		this.setState({isFocused: true});
		if (this.props.onFocus) {
			this.props.onFocus();
		}
	}

	onBlur = () => {
		this.setState({isFocused: false});
		if (this.props.onBlur) {
			this.props.onBlur();
		}
	}

	render () {
		const {props, state} = this;
		const isFocused = state.isFocused ? 'is-focused' : '';
		const classNames = namespacedClassnames(phoneInputKey, this.props.className, isFocused);

		const inputProps = {
			autoFocus: props.autoFocus,
			ref: (elem: HTMLInputElement) => this.inputElem = elem
		};

		return (
			<div className={classNames}>
				<ReactTelephoneInput
					flagsImagePath={this.flagsImagePath}
					preferredCountries={this.preferredCountries}
					value={`${props.value.countryCode}${props.value.number}`}
					onChange={this.onInputPhoneNumberChange}
					onFocus={this.onFocus}
					onBlur={this.onBlur}
					inputProps={inputProps}
				/>
			</div>
		);
	}
}
