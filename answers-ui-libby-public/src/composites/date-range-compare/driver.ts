import { createDateRangePickerDriver } from '../date-range-picker/driver';
import { UniDriver } from 'unidriver';
import { DateRangeCompareKey } from '.';

export type DateRangeCompareDriver = {
	rangeStartDay: () => Promise<string>;
	rangeEndDay: () => Promise<string>;
	clickDay: (day: number) => Promise<void>;
	base: UniDriver
};

export const createDateRangeCompareDriver = (wrapper: UniDriver): DateRangeCompareDriver => {
	const base = wrapper.$(`.${DateRangeCompareKey}`);
	const rangePicker = () => createDateRangePickerDriver(base);

	return {
		rangeStartDay: () => rangePicker().rangeStartDay(),
		rangeEndDay: () => rangePicker().rangeEndDay(),
		clickDay: (day) => rangePicker().clickDay(day),
		base
	};
};
