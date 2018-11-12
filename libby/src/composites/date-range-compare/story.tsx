import { DateRangeCompare } from '.';
import * as React from 'react';

export class StoryOfDateRangeCompare extends React.PureComponent<any> {
	state = {
		range: {startDate: '2018-05-01', endDate: '2018-05-03'},
		compareTo: {startDate: '2018-05-10', endDate: '2018-05-12'}
	};

	onCalendarDateRangePick = (compareValue: {startDate: string, endDate: string}) => {
		this.setState({range: compareValue});
	}

	render () {
		const {state} = this;

		return (
			<div className='row'>
				<div className='column'>
					<DateRangeCompare
						value={state.range}
						onChange={this.onCalendarDateRangePick}
						compareTo={state.compareTo}
					/>
				</div>
			</div>
		);
	}
}
