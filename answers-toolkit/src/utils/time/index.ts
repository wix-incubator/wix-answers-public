import * as moment from 'moment';
import { TranslateFn } from '../../ui';

export const getMomentInstance = (timestamp: number) => moment(timestamp).utc();

export const prettyTimestamp = (timestamp: number, timeAgo: boolean = false, withoutSuffix: boolean = false) => {
	const date = new Date(timestamp);
	const momentInstance = moment(date);
	return timeAgo ? momentInstance.fromNow(withoutSuffix) : momentInstance.format('lll');
};

export const getFormattedDateString = (date: any): string => {
	return moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD').toString();
};

export const getTimePeriodInDays = (start: string, end: string) => {
	const startDate = new Date(start);
	const endDate = new Date(end);
	const msPerDay = 1000 * 60 * 60 * 24;
	const utcStart = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
	const utcEnd = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
	return Math.floor((utcEnd - utcStart) / msPerDay) + 1;
};

export const getFormattedDateFromTimestamp = (timestamp: number, daysOffset: number = 0): string => {
	return moment(timestamp).add(daysOffset, 'day').format('YYYY-MM-DD').toString();
};

export const getFilterFormattedFromDate = (fromDate: string): string => {
	const fromDateList = fromDate.split('-');
	return `${fromDateList[0]}-${fromDateList[1]}-${fromDateList[2]}T00:00:00`;
};

export const getFilterFormattedToDate = (toDate: string): string => {
	const toDateList = toDate.split('-');
	return `${toDateList[0]}-${toDateList[1]}-${toDateList[2]}T23:59:59`;
};

export const getFilterFormattedDateString = (date: any): string => {
	return moment(date, 'YYYY-MM-DDTHH:MM:SS').format('YYYY-MM-DDTHH:MM:SS').toString();
};

export const getPrettyCalendarDate = (uglyDate: string) => {
	const date = new Date(uglyDate);
	const momentInstance = moment(date);
	return momentInstance.format('MMM Do YY');
};

export const getPrettyDateRange = (rangeStart: string, rangeEnd: string, t: TranslateFn) => {
	const translateKey = 'app.common.date-range';
	const getNDaysAgo = (days: number) => getMomentInstance(new Date().valueOf()).subtract(days, 'days').format('D/M/YYYY');

	if (rangeEnd !== getNDaysAgo(1) && rangeEnd !== getNDaysAgo(0)) {
		return `${rangeStart}-${rangeEnd}`;
	}

	if (rangeEnd === getNDaysAgo(0)) {
		return t(`${translateKey}.today`);
	}
	if (rangeEnd === getNDaysAgo(1) && rangeStart === rangeEnd) {
		return t(`${translateKey}.last-day`);
	}
	if (rangeStart === getNDaysAgo(7)) {
		return t(`${translateKey}.7-days`);
	}
	if (rangeStart === getNDaysAgo(30)) {
		return t(`${translateKey}.30-days`);
	}
	if (rangeStart === getNDaysAgo(60)) {
		return t(`${translateKey}.60-days`);
	}
	if (rangeStart === getNDaysAgo(90)) {
		return t(`${translateKey}.90-days`);
	}

	return `${rangeStart}-${rangeEnd}`;
};
