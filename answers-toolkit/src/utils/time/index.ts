import * as moment from 'moment';

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
