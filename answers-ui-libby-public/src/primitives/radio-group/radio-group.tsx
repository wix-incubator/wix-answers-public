import {InternalRadioButton} from './internal-radio-button/internal-radio-button';
import { namespacedClassnames, BaseProps } from '../../common';
import * as React from 'react';
import * as propTypes from 'prop-types';

export type RadioValue = string | number;

export type RadioButtonProps = {
	value: RadioValue;
	disabled?: boolean;
} & BaseProps;

export type RadioGroupProps = {
	selectedValue: RadioValue;
	onChange: (newVal: RadioValue) => void;
} & BaseProps;

export class RadioButton extends React.Component<RadioButtonProps, any> {
	static contextTypes = {
		radioGroup: propTypes.object
	};

	render () {
		const props = this.props;
		const {selectedValue, onChange} = this.context.radioGroup;
		const checked = props.value === selectedValue;
		const disabled = props.disabled;
		const onSelect = onChange.bind(null, props.value);

		const classNames = namespacedClassnames('radio-button', {checked, disabled}, props.className);

		return (
			<label className={classNames} data-value={props.value}>
				<InternalRadioButton checked={checked} disabled={disabled} onSelect={onSelect}>
					{props.children}
				</InternalRadioButton>
			</label>
		);
	}
}

// tslint:disable-next-line:max-classes-per-file
export class RadioGroup extends React.Component<RadioGroupProps, any> {

	static childContextTypes = {
		radioGroup: propTypes.object
	};

	getChildContext () {
		const {selectedValue, onChange} = this.props;
		return {radioGroup: {selectedValue, onChange}};
	}

	render () {
		const props = this.props;
		const classNames = namespacedClassnames('radio-group', props.className);

		return <div className={classNames}>{props.children}</div>;
	}
}
