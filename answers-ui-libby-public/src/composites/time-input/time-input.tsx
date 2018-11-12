import * as React from 'react';
import { namespacedClassnames } from '../../common/namespace-classes';
import * as moment from 'moment';
import { SelectOption } from '../../primitives/selectors/common';
import { BaseProps } from '../../common';
import { Input, Icon } from '../../primitives';
import { iconsMap } from '../../icons';
import { ClickOutside } from '../../common/click-outside.comp';

export type TimeInputValue = {
	hours: number;
	minutes: number;
};

export type TimeInputProps = {
	value: TimeInputValue;
	onChange: (val: TimeInputValue) => void;
} & BaseProps;

export class TimeInput extends React.Component<TimeInputProps, any> {
	state = {
		stagedInput: '',
		timeOptionsVisible: false,
		isPm: false,
		isFocused: false
	};

	timeInputWrapper: HTMLElement | null = null;

	timeOptions: SelectOption[] = [
		{value: 1, label: '01:00'},
		{value: 2, label: '02:00'},
		{value: 3, label: '03:00'},
		{value: 4, label: '04:00'},
		{value: 5, label: '05:00'},
		{value: 6, label: '06:00'},
		{value: 7, label: '07:00'},
		{value: 8, label: '08:00'},
		{value: 9, label: '09:00'},
		{value: 10, label: '10:00'},
		{value: 11, label: '11:00'},
		{value: 12, label: '12:00'}
	];

	constructor (props: any) {
		super(props);

		this.state.stagedInput = this.timeInputValueToString(this.props.value);
		this.state.isPm = props.value.hours >= 12;
	}

	componentWillReceiveProps (nextProps: TimeInputProps) {
		if (nextProps && nextProps.value && !this.state.isPm) {
			this.setState({ isPm: nextProps.value.hours >= 12 });
		}

		// handles business hours apply to all functionality
		if (nextProps.value.hours !== this.props.value.hours || nextProps.value.minutes !== this.props.value.minutes) {
			this.state.stagedInput = this.timeInputValueToString(nextProps.value);
			this.state.isPm = nextProps.value.hours >= 12;
		}
	}

	handleTimeInputChange = (value: string) => {
		this.setState({stagedInput: value});
	}

	handleTimeSelect = (selectedOption: SelectOption) => {
		this.setState({stagedInput: selectedOption.label, timeOptionsVisible: false}, this.handleTimeChange);
	}

	handleAmPmToggle = () => {
		this.setState({ isPm: !this.state.isPm }, this.handleTimeInputBlur);
	}

	forceSelectBlur = () => {
		if (this.timeInputWrapper) {
			const input: HTMLElement | null = this.timeInputWrapper.querySelector('input');
			if (input) {
				input.blur();
			}
		}
	}

	handleTimeInputFocus = () => {
		this.setState({ isFocused: true });
	}

	handleTimeChange = () => {
		const stagedInput = this.state.stagedInput;
		const time = moment(stagedInput, 'HH:mm');

		const isTimeValid = time.isValid();
		const rawHours = time.hours();

		const isPm = this.state.isPm;

		const hours = isPm ? (rawHours < 12 ? (rawHours + 12) % 24 : rawHours) : rawHours === 12 ? 0 : rawHours;
		const minutes = time.minutes();

		const maybeUpdatedValue = isTimeValid ? {hours, minutes} : this.props.value;
		const updatedStagedValue = this.timeInputValueToString(maybeUpdatedValue);
		this.setState({stagedInput: updatedStagedValue, isFocused: false});
		this.props.onChange(maybeUpdatedValue);
	}

	handleTimeInputBlur = () => {
		this.handleTimeChange();
		this.setState({isFocused: false, timeOptionsVisible: false});
	}

	// Return 12-hour string representation of the value
	timeInputValueToString = (value: TimeInputValue) => {
		const {hours, minutes} = value;

		return moment({hours, minutes}).format('hh:mm');
	}

	setTimeInputWrapperElement = (e: HTMLDivElement) => {
		this.timeInputWrapper = e;
	}

	toggleTimeOptions = () => this.setState({timeOptionsVisible: !this.state.timeOptionsVisible});

	closeTimeOptions = () => {
		setTimeout(() => this.setState({timeOptionsVisible: false}), 10);
	}

	renderOption = (option: SelectOption) => {
		const handleTimeSelect = () => this.handleTimeSelect(option);
		const isSelected = option.label === this.state.stagedInput;
		const cn = namespacedClassnames('time-option', {selected: isSelected});

		// tslint:disable-next-line:max-line-length
		return <div key={option.value} onClick={handleTimeSelect} className={cn} data-value={option.value}>{option.label}</div>;
	}

	renderTimeOptionsMenu = () => {
		return (
			<ClickOutside onOuterClick={this.closeTimeOptions}>
				<div className='time-options-menu'>
					{this.timeOptions.map((o) => this.renderOption(o))}
				</div>
			</ClickOutside>
		);
	}

	render () {
		const {state} = this;
		const classNames = namespacedClassnames('time-input', {
			'is-focused': state.isFocused,
			'dd-open': state.timeOptionsVisible
		});

		const renderedTime = this.state.stagedInput;
		const renderedPeriod = this.state.isPm ? 'pm' : 'am';

		const ddOpen = state.timeOptionsVisible;

		return (
			<div className={classNames} ref={this.setTimeInputWrapperElement}>
				<Input
					value={state.stagedInput}
					placeholder={renderedTime}
					onChange={this.handleTimeInputChange}
					onFocus={this.handleTimeInputFocus}
					onBlur={this.handleTimeInputBlur}
				/>
				<div className='toggle-options-button' onClick={this.toggleTimeOptions}>
					<Icon icon={iconsMap.buttonDd}/>
				</div>
				{ddOpen ? this.renderTimeOptionsMenu() : null}
				<div className='period' onClick={this.handleAmPmToggle}>{renderedPeriod}</div>
			</div>
		);
	}
}
