import { SpeedIcon } from './speed-icon';
import {Popover} from '../../primitives/popover/popover';
import * as React from 'react';
import * as classNames from 'classnames';

export type PlaybackRateProps = {
	currentRate: number;
	onSelect: (newRate: number) => void;
};

export type PlaybackRateState = {
	isOpen: boolean;
};

export class PlaybackRate extends React.Component<PlaybackRateProps, PlaybackRateState> {
	state: PlaybackRateState = {
		isOpen: false
	};

	playbackRateOptions = [0.75, 1, 1.25, 1.5, 2, 2.5, 3];

	getPlaybackItems = () => {
		return this.playbackRateOptions.map((rate) => {
			const onClickRate = () => {
				this.props.onSelect(rate);
				this.closePlaybackRateSelect();
			};
			return (
				<div
					className={classNames('play-rate-item', {selected: this.props.currentRate === rate})}
					onClick={onClickRate}
					key={rate}
				>
					<SpeedIcon/>{rate.toFixed(2)}
				</div>
			);
		});
	}

	openPlaybackRateSelect = () => {
		this.setState({isOpen: !this.state.isOpen});
	}

	closePlaybackRateSelect = () => {
		this.setState({isOpen: false});
	}

	render () {
		const classnames = classNames('play-rate', {open: this.state.isOpen});
		return (
			<div className='play-rate-container'>
				<Popover onOuterAction={this.closePlaybackRateSelect} isOpen={this.state.isOpen} body={this.getPlaybackItems()}>
					<div onClick={this.openPlaybackRateSelect} className={classnames}>
						<SpeedIcon/>{this.props.currentRate.toFixed(2)}
					</div>
				</Popover>
			</div>
		);
	}
}
