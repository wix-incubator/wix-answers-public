import { Calendar, CalendarTheme, Range } from 'react-date-range';
import * as moment from 'moment';
import * as React from 'react';
import { namespacedClassnames } from '../../common/namespace-classes';
import { ValueCompProps } from '../../common';
import { getFormattedDateString } from 'answers-lib';

export type DatePickerProps = ValueCompProps<string>;

export const DatePickerKey = 'date-picker';

export class DatePicker extends React.PureComponent<DatePickerProps> {
	onChange = (date: Range) => {
		const dateString: string = getFormattedDateString(date);
		this.props.onChange(dateString);
	}

	render () {
		const {props} = this;

		const theme: CalendarTheme = {
			Calendar : {width: 280, color: '#577083', background: '#fcfcfc'},
			PredefinedRanges : {width: 0},
			MonthAndYear: {fontWeight: 300, fontSize: 16, marginTop: 5, marginBottom: 5},
			Weekday: {fontWeight: 500, fontSize: 16, marginTop: 5},
			DaySelected: {background: '#445868'},
			DayInRange: {color: '#fcfcfc', background: '#577083'},
			MonthButton: {background: '#fcfcfc', color: '#445868'},
		};

		const initialDate = (_: any) => moment(props.value);

		return (
			<div className={namespacedClassnames(DatePickerKey)}>
				<Calendar
					firstDayOfWeek={1}
					date={initialDate}
					onChange={this.onChange}
					theme={theme}
				/>
			</div>
		);
	}
}
