import { DateRange, CalendarTheme } from 'react-date-range';
import * as moment from 'moment';
import * as React from 'react';
import { getFormattedDateString, getTimePeriodInDays } from 'answers-toolkit';
import { namespacedClassnames } from '../../common/namespace-classes';
import { ValueCompProps } from '../../common';

export type DateRangePickerValue = {
	startDate: string;
	endDate: string;
};

export type DateRangePickerMetaProps = {
	maxDate?: string;
	minDate?: string;
	theme?: CalendarTheme;
	compareModeRangeSize?: number;
};

export type DateRangePickerProps = ValueCompProps<DateRangePickerValue> & DateRangePickerMetaProps;

export type DateRagePickerState = {
	dates: {
		startDate: string;
		endDate: string;
	};
	prevStartDate: string;
	prevEndDate: string;
};

export const DateRangePickerKey = 'date-range-picker';

export class DateRangePicker extends React.PureComponent<DateRangePickerProps, DateRagePickerState> {
	calendarTheme: CalendarTheme = {
		Calendar : {width: 300, color: '#577083', background: '#fcfcfc'},
		PredefinedRangesItem : {
			background: '#ffffff', color: '#445868', fontSize: 14, paddingTop: 8, paddingBottom: 8, paddingLeft: 12, margin: 0},
		PredefinedRangesItemActive : {background: '#f2f8fd', color: '#445868'},
		MonthAndYear: {fontWeight: 300, fontSize: 16, marginTop: 5, marginBottom: 5},
		Weekday: {fontWeight: 500, fontSize: 16, marginTop: 5},
		DaySelected: {background: '#50e3c2'},
		DayInRange: {color: '#fcfcfc', background: '#577083'},
		MonthButton: {background: '#fcfcfc', color: '#445868'},
	};

	state: DateRagePickerState = {
		dates: {
			startDate: getFormattedDateString(this.props.value.startDate),
			endDate: getFormattedDateString(this.props.value.endDate)
		},
		prevStartDate: '',
		prevEndDate: ''
	};

	handleChange (payload: any) {
		this.setState({dates: payload}, () => {
			const startDate = this.props.compareModeRangeSize ?
			this.props.value.startDate :
				getFormattedDateString(this.state.dates.startDate);
			const endDate = this.props.compareModeRangeSize ?
				this.props.value.endDate :
				getFormattedDateString(this.state.dates.endDate);

			this.props.onChange({startDate, endDate});
		});
	}

	handleComparedDatesChange (payload: any) {
		if (moment(new Date(payload.endDate.toString())).format('YYYY-MM-DD') === this.state.prevEndDate &&
			moment(new Date(payload.startDate.toString())).format('YYYY-MM-DD') === this.state.prevStartDate) {
			this.setState({dates: payload});
		} else if (this.props.compareModeRangeSize) {
			let updatedEndDate;
			let updatedEndDateString;
			if (payload.endDate.format('YYYY-MM-DD') === this.state.prevStartDate) {
				updatedEndDate = payload.startDate;
				updatedEndDateString = moment(new Date(updatedEndDate.toString())).format('YYYY-MM-DD');
			} else {
				updatedEndDate = payload.endDate;
				updatedEndDateString = moment(new Date(updatedEndDate.toString())).format('YYYY-MM-DD');
			}
			const updatedStartDate = payload.startDate.add(-this.props.compareModeRangeSize + 1, 'days');
			const updatedStartDateString = moment(new Date(updatedStartDate.toString())).format('YYYY-MM-DD');
			if (getTimePeriodInDays(updatedStartDateString, updatedEndDateString) === this.props.compareModeRangeSize) {
				this.setState({prevStartDate: updatedStartDateString, prevEndDate: updatedEndDateString});
				this.props.onChange({
					startDate: updatedStartDateString,
					endDate: updatedEndDateString
				});
			} else {
				const correctEndDate = payload.endDate;
				const correctEndDateString = moment(new Date(correctEndDate.toString())).format('YYYY-MM-DD');
				const correctStartDate = payload.endDate.add(-this.props.compareModeRangeSize + 1, 'days');
				const correctStartDateString = moment(new Date(correctStartDate.toString())).format('YYYY-MM-DD');
				this.setState({prevStartDate: correctStartDateString, prevEndDate: correctEndDateString});
				this.props.onChange({
					startDate: correctStartDateString,
					endDate: correctEndDateString
				});
			}
		}
	}

	createPredefinedRange = (rangeSize: number) => {
		return {
			startDate: (now: any) => rangeSize > 0 ? now.add(-rangeSize, 'days') : now,
			endDate: (now: any) => rangeSize > 0 ? now.add(-1, 'days') : now,
			predefinedRangeClass: `range-size-${rangeSize}`
		};
	}

	render () {
		const maxDate = this.props.maxDate ? moment(this.props.maxDate) : undefined;
		const minDate = this.props.minDate ? moment(this.props.minDate) : undefined;

		const validRangeSize = (rangeSize: number): boolean => {
			const range = this.createPredefinedRange(rangeSize);

			if (!maxDate && !minDate) {
				return true;
			} else {
				const now = moment(Date.now());
				const maxCondition = maxDate ?
					range.endDate(now).startOf('day').valueOf() <= maxDate.startOf('day').valueOf() : true;
				const minCondition = minDate ?
					range.startDate(now).startOf('day').valueOf() >= minDate.startOf('day').valueOf() : true;
				return maxCondition && minCondition;
			}
		};

		const predefinedRanges = {
			...(validRangeSize(0) ? {Today: this.createPredefinedRange(0)} : {}),
			...(validRangeSize(1) ? {'Last Day': this.createPredefinedRange(1)} : {}),
			...(validRangeSize(7) ? {'Last 7 Days': this.createPredefinedRange(7)} : {}),
			...(validRangeSize(30) ? {'Last 30 Days': this.createPredefinedRange(30)} : {}),
			...(validRangeSize(60) ? {'Last 60 Days': this.createPredefinedRange(60)} : {}),
			...(validRangeSize(90) ? {'Last 90 Days': this.createPredefinedRange(90)} : {}),
		};

		const comparedPredefinedRanges = {};

		const isCompareMode = !!this.props.compareModeRangeSize;

		const ranges = isCompareMode ? comparedPredefinedRanges : predefinedRanges;

		return (
			<div className={namespacedClassnames(DateRangePickerKey)}>
				<DateRange
					startDate={moment(this.props.value.startDate)}
					endDate={moment(this.props.value.endDate)}
					ranges={ranges}
					onChange={isCompareMode ? this.handleComparedDatesChange.bind(this) : this.handleChange.bind(this)}
					calendars={1}
					format={'DD-MM-YYYY'}
					theme={this.props.theme || this.calendarTheme}
					maxDate={maxDate}
					minDate={minDate}
				/>
			</div>
		);
	}
}
