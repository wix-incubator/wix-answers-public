import { DateRangePicker } from '.';
import { getFormattedDateString } from 'answers-lib';
import * as React from 'react';

export class StoryOfDateRangePicker extends React.PureComponent<any> {
	state = {
		fromLastUpdateDate: getFormattedDateString(new Date(new Date().valueOf() - 6 * 24 * 60 * 60 * 1000)),
		toLastUpdateDate: getFormattedDateString(new Date())
	};

	onCalendarDateRangePick = (val: {startDate: string, endDate: string}) => {
		this.setState({fromLastUpdateDate: val.startDate, toLastUpdateDate: val.endDate});
	}

	render () {
		const {state} = this;

		const fromDate = getFormattedDateString(new Date(state.fromLastUpdateDate.substring(0, 10).replace(/-/g, '/')));
		const toDate = getFormattedDateString(new Date(state.toLastUpdateDate.substring(0, 10).replace(/-/g, '/')));

		const value = {
			startDate: fromDate,
			endDate: toDate
		};

		return (
			<div className='row'>
				<div className='column'>
					<DateRangePicker
						value={value}
						onChange={this.onCalendarDateRangePick}
						maxDate='2018-07-08'
					/>
				</div>
			</div>
		);
	}
}
