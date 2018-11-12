import * as React from 'react';
import { Input } from '../..';
import { namespacedClassnames } from '../../common';
import { getIdealTextColor } from 'answers-toolkit';

export type ColorPickerProps = {
	value: string;
	t: (key: string) => string;

	onChange: (value: string) => void;
};

export type ColorPickerState = {
	color: string;
	validationError: string;
};

const withHash = (color: string) => `#${color.replace('#', '')}`;
const isPartialValidHexColor = (color: string) => /^#[0-9A-F]{0,6}$/i.test(withHash(color));
const isValidHexColor = (color: string) => isPartialValidHexColor(color) && withHash(color).length === 7;
export class ColorPicker extends React.PureComponent<ColorPickerProps, ColorPickerState> {

	state: ColorPickerState = {
		color: this.props.value,
		validationError: ''
	};

	onChangeColor = (color: string) => {
		this.setState({color});
		this.validateInput(color);
		if (isValidHexColor(color)) {
			this.props.onChange(withHash(color));
		}
	}

	validateInput = (color: string) => {
		if (isPartialValidHexColor(color)) {
			this.setState({validationError: ''});
		} else {
			this.setState({validationError: this.props.t('app.common.invalid-hex')});
		}
	}

	strictlyValidateInput = () => {
		if (!isValidHexColor(this.state.color)) {
			this.setState({validationError: this.props.t('app.common.invalid-hex')});
		}
	}

	render () {
		const {props, state} = this;

		const textColor = getIdealTextColor(props.value);

		return (
			<div className={namespacedClassnames('color-picker')}>
				<div className='color-display' style={{background: props.value}}>
					<div className='color-string' style={{color: textColor}}>{props.value}</div>
				</div>
				<div className='color-input-wrapper'>
					<Input
						onChange={this.onChangeColor}
						value={state.color}
						validationError={state.validationError}
						onEnter={this.strictlyValidateInput}
						onBlur={this.strictlyValidateInput}
						spellCheck={false}
						autoFocus={true}
					/>
				</div>
			</div>
		);
	}
}
