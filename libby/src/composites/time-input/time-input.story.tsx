import * as React from 'react';
import { TimeInput, TimeInputValue } from './time-input';
import { Column } from '../../common/story-utils';

export class StoryOfTimeInput extends React.Component<any, any> {
	state = {
		timeValue: {
			hours: 1,
			minutes: 53
		}
	};

	componentDidMount () {
		const dateNow = new Date(Date.now());
		const hours = dateNow.getHours();
		const minutes = dateNow.getMinutes();

		this.setState({ value: {hours, minutes} });
	}

	handleTimeChange (newTimeValue: TimeInputValue) {
		alert(`${newTimeValue.hours} - ${newTimeValue.minutes}`);
		this.setState({ timeValue: newTimeValue });
	}

	render () {
		const handleTimeChange = this.handleTimeChange.bind(this);

		return (
			<span className='row'>
				<Column title='Regular'>
					<TimeInput value={this.state.timeValue} onChange={handleTimeChange} />
				</Column>
			</span>
		);
	}
}
