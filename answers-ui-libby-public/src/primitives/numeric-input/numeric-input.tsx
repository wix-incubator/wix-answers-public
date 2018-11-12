import * as React from 'react';
import { namespacedClassnames } from '../../common/namespace-classes';
import { Icon } from '../icon/icon';
import { numericInputControlIcon } from './control-icon';
import * as classnames from 'classnames';

export type NumericInputValue = number | null;

export type NumericInputProps = {
	value: NumericInputValue;
	onChange: (value: NumericInputValue) => void;
	placeholder: string;
	disabled?: boolean;
};

export class NumericInput extends React.Component<NumericInputProps, any> {
	inputElement: HTMLInputElement | null = null;

	onInputChange = (e: any) => {
		const valueAsString = e.target.value;
		const maybeValueAsNumber = parseInt(valueAsString, 10);

		if (!isNaN(maybeValueAsNumber)) {
			this.props.onChange(maybeValueAsNumber);
		}
	}

	onIncrement = (e: any) => {
		e.preventDefault();
		const currentValue = this.props.value as number;
		const newValue = currentValue + 1;
		this.props.onChange(newValue);
		if (this.inputElement) {
			this.inputElement.focus();
		}
	}

	onDecrement = (e: any) => {
		e.preventDefault();
		const currentValue = this.props.value as number;
		const newValue = currentValue - 1;
		this.props.onChange(newValue);
		if (this.inputElement) {
			this.inputElement.focus();
		}
	}

	setInputElement = (elem: any) => {
		this.inputElement = elem;
	}

	render () {
		const props = this.props;
		const classNames = namespacedClassnames('numeric-input');
		const spinButtonsClassNames = classnames('spin-buttons', props.disabled ? 'disabled' : '');
		const value = props.value === null ? '' : props.value;

		return (
			<span className={classNames}>
				<input
					type='number'
					placeholder={props.placeholder}
					value={value}
					onChange={this.onInputChange}
					disabled={props.disabled}
					ref={this.setInputElement}
				/>
				<div className={spinButtonsClassNames}>
					<button className='spin increment' onMouseDown={this.onIncrement} disabled={props.disabled}>
						<Icon icon={numericInputControlIcon}/>
					</button>
					<button className='spin decrement' onMouseDown={this.onDecrement} disabled={props.disabled}>
						<Icon icon={numericInputControlIcon}/>
					</button>
				</div>
			</span>
		);
	}
}
