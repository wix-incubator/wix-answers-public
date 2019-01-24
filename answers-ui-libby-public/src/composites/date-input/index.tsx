import * as React from 'react';
import { namespacedClassnames } from '../../common/namespace-classes';
import { BaseProps } from '../../common';
import { noop, ValueCompProps, classNames } from 'answers-toolkit';
import { Icon, Popover, Input, LinkButton, Tooltip } from '../../primitives';
import { iconsMap } from '../../icons';
import { DatePicker } from '../date-picker';
import * as moment from 'moment';

export const DateInputKey = 'date-input';

export type DateInputProps = ValueCompProps<string> & {
	dateFormat?: string;
	disabled?: string;
} & BaseProps;

export type DateInputState = {
	isOpen: boolean;
	isFocused: boolean;
};

export class DateInput extends React.PureComponent<DateInputProps, DateInputState> {

	state: DateInputState = {
		isOpen: false,
		isFocused: false
	};

	openCalendar = () => this.setState({isOpen: true});
	closeCalender = () => this.setState({isOpen: false});

	onFocus = () => this.setState({isFocused: true});
	onBlur = () => this.setState({isFocused: false});

	formatDate = (date: string) => moment.utc(date).format(this.props.dateFormat || 'D/M/YYYY');

	onChange = (date: string) => {
		this.closeCalender();
		this.props.onChange(date);
	}

	render () {
		const {props, state} = this;
		const dateString = this.formatDate(props.value);
		const popoverBody = <DatePicker value={props.value} onChange={this.onChange} />;

		const focused = state.isFocused;
		const disabled = !!props.disabled;
		const cn = namespacedClassnames(DateInputKey, props.className, {'dd-open': state.isOpen, focused, disabled});
		const buttonCn = classNames('calendar-cta', {'dd-open': state.isOpen});

		const comp = (
			<>
				<Input value={dateString} onFocus={this.onFocus} onBlur={this.onBlur} onChange={noop} disabled={!!props.disabled} />
				<Popover isOpen={state.isOpen} onOuterAction={this.closeCalender} body={popoverBody}>
					<LinkButton className={buttonCn} onClick={this.openCalendar} disabled={!!props.disabled}>
						<Icon icon={iconsMap.date} />
					</LinkButton>
				</Popover>
			</>
		);

		return (
			<div className={cn}>
				{!!props.disabled ? <Tooltip body={props.disabled}>{comp}</Tooltip> : comp}
			</div>
		);
	}
}
