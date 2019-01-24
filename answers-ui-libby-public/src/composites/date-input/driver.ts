import { UniDriver } from 'unidriver';
import { DateInputKey } from './';
import { createInputDriver, createLinkButtonDriver, popoverDriver } from '../../primitives/drivers';
import { createDatePickerDriver, DatePickerDriver } from '../date-picker/driver';

export type DateInputDriver = {
	date: () => Promise<string>;
	openCalendar: () => Promise<void>;
	datePicker: DatePickerDriver;
	base: UniDriver
};

export const createDateInputDriver = (wrapper: UniDriver, global: UniDriver): DateInputDriver => {
	const base = wrapper.$(`.${DateInputKey}`);
	const inputDriver = createInputDriver(wrapper);
	const popover = popoverDriver(global);

	return {
		date: () => inputDriver.value(),
		openCalendar: () => createLinkButtonDriver(wrapper).click(),
		datePicker: createDatePickerDriver(popover),
		base
	};
};
