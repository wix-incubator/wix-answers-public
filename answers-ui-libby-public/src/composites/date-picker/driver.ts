import { UniDriver } from 'unidriver';
import { DatePickerKey } from '.';

export type DatePickerDriver = {
	selectedDay: (idx?: number) => Promise<string>;
	selectedMonth: () => Promise<string>;
	selectedYear: () => Promise<string>;
	clickDay: (day: number) => Promise<void>;
	clickNextMonth: () => Promise<void>;
	clickPreviousMonth: () => Promise<void>;
	base: UniDriver
};

export const createDatePickerDriver = (wrapper: UniDriver, key: string = DatePickerKey): DatePickerDriver => {
	const base = wrapper.$(`.${key}`);

	return {
		selectedDay: (idx: number = 0) => base.$$('.rdr-Day.is-selected').get(idx).text(),
		selectedMonth: () => base.$('.rdr-MonthAndYear-month').text(),
		selectedYear: () => base.$('.rdr-MonthAndYear-year').text(),
		clickDay: (day: number) => base.$$('.rdr-Day:not(.is-passive)').get(day - 1).click(),
		clickNextMonth: () => base.$('.rdr-MonthAndYear-button.next').click(),
		clickPreviousMonth: () => base.$('.rdr-MonthAndYear-button.prev').click(),
		base
	};
};
