import * as React from 'react';
import { renderAndMountComponent } from 'answers-toolkit';
import {ColorPicker, ColorPickerProps} from './color-picker.comp';
import { LegacyBaseDriver } from '../../common/base-driver';
import { createLegacyInputDriver, getBaseReactDriver } from '../../drivers';

export type ColorPickerDriver = {
	getDisplayedColor: () => string,
	enterColor: (color: string) => void,
	isInputValid: () => boolean,
	base: LegacyBaseDriver
};

export const createColorPickerDriver = (elemOrLegacyBaseDriver: Element | LegacyBaseDriver): ColorPickerDriver => {
	const base = getBaseReactDriver(elemOrLegacyBaseDriver);
	const inputDriver = createLegacyInputDriver(base.elem);
	return {
		getDisplayedColor: () => base.find('.color-string').getText(),
		enterColor: (color) => {
			inputDriver.enterValue(color);
			inputDriver.pressEnter();
		},
		isInputValid: () => inputDriver.isValid(),
		base
	};
};

export const renderColorPickerAndReturnDriver = (props: ColorPickerProps): ColorPickerDriver => {
	const elem = renderAndMountComponent(<ColorPicker {...props}/>);
	return createColorPickerDriver(elem);
};
