import { createDatePickerDriver } from '../date-picker/driver';
import { UniDriver } from 'unidriver';
import { DateRangePickerKey } from '.';

export type DateRangePickerDriver = {
	rangeStartDay: () => Promise<string>;
	rangeEndDay: () => Promise<string>;
	selectedMonth: () => Promise<string>;
	selectedYear: () => Promise<string>;
	clickDay: (day: number) => Promise<void>;
	clickNextMonth: () => Promise<void>;
	clickPreviousMonth: () => Promise<void>;
	selectPredefinedRange: (idx: number) => Promise<void>;
	base: UniDriver
};

export const createDateRangePickerDriver = (wrapper: UniDriver): DateRangePickerDriver => {
	const base = wrapper.$(`.${DateRangePickerKey}`);
	const datePicker = createDatePickerDriver(wrapper, DateRangePickerKey);

	return {
		rangeStartDay: () => datePicker.selectedDay(0),
		rangeEndDay: () => datePicker.selectedDay(1),
		selectedMonth: () => datePicker.selectedMonth(),
		selectedYear: () => datePicker.selectedYear(),
		clickDay: (day: number) => datePicker.clickDay(day),
		clickNextMonth: () => datePicker.clickNextMonth(),
		clickPreviousMonth: () => datePicker.clickPreviousMonth(),
		selectPredefinedRange: (idx: number) => base.$$('.rdr-PredefinedRangesItem').get(idx).click(),
		base
	};
};
