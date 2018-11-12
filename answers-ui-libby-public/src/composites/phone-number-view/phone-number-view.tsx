import * as React from 'react';
import { namespacedClassnames } from '../../common/namespace-classes';
import { LinkButton } from '../../primitives/buttons/link-button/link-button';
import { Popover } from '../../primitives/popover/popover';
import {
	PositiveButton,
	HollowButton
} from '../../primitives/buttons/button/button';
import { Text } from '../../typography';
import { Select, SelectOption } from '../..';
import { PhoneLine, PhoneNumber } from '../../common';

export type CallData = {
	phoneNumber: PhoneNumber;
	lineId: string | null;
};

export type PhoneNumberViewProps = {
	lines?: PhoneLine[];
	phoneNumber: PhoneNumber;
	t: (key: string, params?: any) => string;
	onCall?: (callData: CallData) => void;
};

export type PhoneNumberViewState = {
	selectedLineId: string | null;
	isPopoverOpen: boolean;
	isFocused: boolean;
};

export class PhoneNumberView extends React.PureComponent<PhoneNumberViewProps, PhoneNumberViewState> {
	state: PhoneNumberViewState = {
		selectedLineId: this.props.lines && this.props.lines.length ? this.props.lines[0].id : null,
		isPopoverOpen: false,
		isFocused: false,
	};

	componentWillReceiveProps (nextProps: PhoneNumberViewProps) {
		if (!this.state.selectedLineId && nextProps.lines && nextProps.lines.length) {
			this.setState({ selectedLineId: nextProps.lines[0].id });
		}
	}

	tp = (key: string, params?: any) => this.props.t(`common.phone-number-view.${key}`, params);

	onLineSelected = (selectedLine: SelectOption) => {
		this.setState({ selectedLineId: selectedLine.value });
	}

	onPhoneNumberClick () {
		this.setState({ isPopoverOpen: !this.state.isPopoverOpen });
	}

	closePopover () {
		if (!this.state.isFocused) {
			this.setState({ isPopoverOpen: false });
		}
	}

	onCallClick (callData: CallData) {
		this.closePopover();
		if (this.props.onCall) {
			this.props.onCall(callData);
		}
	}

	toggleFocus = (isFocused: boolean) => () => this.setState({ isFocused });

	render () {
		const { props } = this;
		const { phoneNumber } = this.props;

		const renderLabel = (line: PhoneLine) => {
			return (
				<div className='options-label'>
					<span className='line-name'>{line.name}</span> <span className='line-number'>({line.phoneNumber})</span>
				</div>
			);
		};

		const options = props.lines ? props.lines.map((line) => ({
			value: line.id,
			label: renderLabel(line)
		})) : [];

		const callData = { phoneNumber, lineId: this.state.selectedLineId };
		const phoneNumberString = `+${phoneNumber.countryCode}-${
			phoneNumber.number
			}`;
		const isDisabled = !this.props.onCall;

		const classNames = namespacedClassnames('phone-number-view', {
			disabled: isDisabled
		});

		const handlePhoneNumberClick = () => this.onPhoneNumberClick();
		const handleClosePopover = () => this.closePopover();
		const handleCallClick = () => this.onCallClick(callData);

		const hasMultipleLines = props.lines && props.lines.length > 1 || false;
		const hasLines = props.lines && props.lines.length > 0 || false;

		const lineSelector = (
			<Select
				className={'phone-selector'}
				value={this.state.selectedLineId}
				options={options}
				placeholder='Select Option'
				onChange={this.onLineSelected}
				onFocus={this.toggleFocus(true)}
				onBlur={this.toggleFocus(false)}
			/>
		);

		const callTitle = (multipleLines: boolean) => {
			return multipleLines
				? this.tp('multiple-line.title')
				: this.tp('single-line.title');
		};

		const callActionsBody = (
				<div className='call-actions-body'>
					<Text className='phone-title' type='h2'>{callTitle(hasMultipleLines)}</Text>
					{hasMultipleLines && lineSelector}
					<div className='call-actions'>
						<HollowButton onClick={handleClosePopover}>
							{this.tp('call-cancel')}
						</HollowButton>
						<PositiveButton disabled={!hasLines ? this.tp('call-disabled') : false} onClick={handleCallClick}>
							{this.tp('call-now')}
						</PositiveButton>
					</div>
				</div>
			);

		const isPopoverOpen = this.state.isPopoverOpen;
		const phoneAsTextOrButton = isDisabled ? (
			<Text type='t2a' className='phone-number'>
				{phoneNumberString}
			</Text>
		) : (
				<LinkButton className='phone-number' onClick={handlePhoneNumberClick}>
					{phoneNumberString}
				</LinkButton>
			);

		return (
			<div className={classNames}>
				<Popover
					isOpen={isPopoverOpen}
					preferPlace='above'
					body={callActionsBody}
					onOuterAction={handleClosePopover}
				>
					{phoneAsTextOrButton}
				</Popover>
			</div>
		);
	}
}
