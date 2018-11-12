import * as React from 'react';
import { namespacedClassnames } from '../../common/namespace-classes';
import { BaseProps, ValueCompProps } from '../../common';
import { DateRangePicker } from '../date-range-picker';
import { CalendarTheme } from 'react-date-range';
import { getTimePeriodInDays, getMomentInstance } from 'answers-lib';

export const DateRangeCompareKey = 'date-range-compare';

export type DateRangeCompareValue = {
	startDate: string;
	endDate: string;
};

export type DateRangeCompareMetaProps = {
	compareTo: DateRangeCompareValue;
	minDate?: string;
};

export type DateRangeCompareProps = ValueCompProps<DateRangeCompareValue> & DateRangeCompareMetaProps & BaseProps;

export type DateRangeCompareState = {};

export class DateRangeCompare extends React.PureComponent<DateRangeCompareProps, DateRangeCompareState> {
	calendarTheme: CalendarTheme = {
		Calendar : {width: 300, color: '#577083', background: '#fcfcfc'},
		PredefinedRanges : {display: 'none'},
		PredefinedRangesItem : {
			background: '#ffffff', color: '#445868', fontSize: 14, paddingTop: 8, paddingBottom: 8, paddingLeft: 12, margin: 0},
		PredefinedRangesItemActive : {background: '#f2f8fd', color: '#445868'},
		MonthAndYear: {fontWeight: 300, fontSize: 16, marginTop: 5, marginBottom: 5},
		Weekday: {fontWeight: 500, fontSize: 16, marginTop: 5},
		DaySelected: {background: '#445868'},
		DayInRange: {color: '#fcfcfc', background: '#577083'},
		MonthButton: {background: '#fcfcfc', color: '#445868'},
	};

	state: DateRangeCompareState = {};

	getCompareRangeSize = (): number => {
		return getTimePeriodInDays(this.props.compareTo.startDate, this.props.compareTo.endDate) || 0;
	}

	getLastSelectableDate = () => {
		const ts = new Date(this.props.compareTo.startDate).valueOf();
		return getMomentInstance(ts).subtract(1, 'day').format('YYYY-MM-DD');
	}

	render () {
		const {props} = this;
		const classNames = namespacedClassnames(DateRangeCompareKey, props.className);

		const compareRangeSize = this.getCompareRangeSize();
		const maxDate = this.getLastSelectableDate();

		return (
			<div className={classNames}>
				<DateRangePicker
					value={props.value}
					onChange={props.onChange}
					compareModeRangeSize={compareRangeSize}
					minDate={this.props.minDate}
					maxDate={maxDate}
					theme={this.calendarTheme}
				/>
			</div>
		);
	}
}
