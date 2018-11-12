import {PauseIcon} from './icons/pause-icon';
import {PlayIcon} from './icons/play-icon';
import {namespacedClassnames} from '../../common/namespace-classes';

import * as React from 'react';
import { PlayerLoader } from './icons/player-loader';
import { EllipsisText } from '../ellipsis-text/ellipsis-text';

export type SimpleAudioPlayerProps = {
	audioUrl: string;
	playbackRate?: number;
	title?: string;
	updateDisabled?: (disabled: boolean) => void;
};

export type SimpleAudioPlayerState = {
	paused: boolean;
	disabled: boolean;
	currentTime: number;
	hoverBarPercentage: number;
};

export class SimpleAudioPlayer extends React.Component<SimpleAudioPlayerProps, SimpleAudioPlayerState> {
	audio: HTMLAudioElement | null = null;
	audioProgressContainer: HTMLDivElement | null = null;
	seekInProgress: boolean = false;

	state: SimpleAudioPlayerState = {
		paused: true,
		disabled: true,
		currentTime: 0,
		hoverBarPercentage: 0
	};

	componentDidMount () {
		window.addEventListener('mouseup', this.seek);
		document.addEventListener('touchend', this.seek);
		window.addEventListener('mousemove', this.adjustDisplayedTime);
		document.addEventListener('touchmove', this.adjustDisplayedTime);

		const audio = this.audio = document.createElement('audio');
		audio.playbackRate = this.props.playbackRate || 1;

		audio.addEventListener('timeupdate', this.updateCurrentTime);
		audio.addEventListener('loadedmetadata', this.updateCurrentTime);
		audio.addEventListener('ended', this.togglePause);
		audio.addEventListener('canplay', this.enablePlay);
		audio.addEventListener('error', this.logError);
		audio.addEventListener('stalled', this.logStalled);
		audio.src = this.props.audioUrl;
	}

	componentWillUnmount () {
		window.removeEventListener('mousemove', this.adjustDisplayedTime);
		document.removeEventListener('touchmove', this.adjustDisplayedTime);
		window.removeEventListener('mouseup', this.seek);
		document.removeEventListener('touchend', this.seek);

		if (this.audio) {
			this.audio.removeEventListener('timeupdate', this.updateCurrentTime);
			this.audio.removeEventListener('loadedmetadata', this.updateCurrentTime);
			this.audio.removeEventListener('canplaythrough', this.enablePlay);
			this.audio.removeEventListener('error', this.logError);
			this.audio.removeEventListener('stalled', this.logStalled);
			this.audio.pause();
		}
	}

	componentWillReceiveProps (nextProps: SimpleAudioPlayerProps) {
		if (this.audio) {
			if (this.props.playbackRate !== nextProps.playbackRate) {
				this.audio.playbackRate = nextProps.playbackRate || 1;
			}
			if (this.props.audioUrl !== nextProps.audioUrl) {
				this.audio.src = nextProps.audioUrl;
			}
		}
	}

	isAudioPlayerDebugEnabled = () => {
		return localStorage.getItem('__ansAudioPlayerDebug') === 'true';
	}

	logError = () => {
		if (this.isAudioPlayerDebugEnabled()) {
			console.log('Audio Player Error: ', this.audio ? this.audio.error : 'No audion element!'); // tslint:disable-line
		}
	}

	logStalled = () => {
		if (this.isAudioPlayerDebugEnabled()) {
			console.log('stalled'); // tslint:disable-line
		}
	}

	updateCurrentTime = () => {
		if (!this.seekInProgress && this.audio) {
			this.setState({currentTime: this.audio.currentTime});
		}
	}

	enablePlay = () => {
		this.setState({disabled: false});
		if (this.props.updateDisabled) {
			this.props.updateDisabled(false);
		}
	}

	togglePause = () => {
		if (!this.state.disabled && this.audio) {
			const shouldPause = !this.state.paused;
			this.setState({paused: shouldPause});
			try {
				if (shouldPause) {
					this.audio.pause();
				} else {
					this.audio.play();
				}
			} catch (error) {
				// tslint:disable-next-line
				console.info(error);
			}
		}
	}

	adjustDisplayedTime = (event: any) => {
		const disabled = this.state.disabled;
		const isStartSeekEvent = event.type === 'mousedown' || event.type === 'touchstart';
		if (!disabled && isStartSeekEvent) {
			this.seekInProgress = true;
		} else if (!this.seekInProgress) {
			return;
		}
		event.preventDefault();

		if (this.audioProgressContainer && this.audio) {
			const boundingRect = this.audioProgressContainer.getBoundingClientRect();
			const isTouch = event.type === 'touchmove' || event.type === 'touchstart';
			const pageX = isTouch ? event.targetTouches.item(0).pageX : event.pageX;
			const position = pageX - boundingRect.left - document.body.scrollLeft;
			const containerWidth = boundingRect.width;
			const progressPercentage = Math.max(0, Math.min(1, position / containerWidth));
			this.setState({
				currentTime: progressPercentage * this.audio.duration,
				hoverBarPercentage: 0
			});
		}
	}

	seek = (event: any) => {
		if (!this.seekInProgress || !this.audio) {
			return;
		}

		event.preventDefault();
		this.seekInProgress = false;
		this.audio.currentTime = this.state.currentTime;
	}

	formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds: number = Math.floor(time % 60);
		return `${ minutes }:${ seconds < 10 ? '0' : '' }${ seconds }`;
	}

	setProgressContainerRef = (ref: HTMLDivElement | null) => {
		if (ref) {
			this.audioProgressContainer = ref;
		}
	}

	onProgressBarMouseMove = (event: any) => {
		if (this.audioProgressContainer && this.audio) {
			const boundingRect = this.audioProgressContainer.getBoundingClientRect();
			const position = event.pageX - boundingRect.left - document.body.scrollLeft;
			const containerWidth = boundingRect.width;
			const progressPercentage = (this.state.currentTime / this.audio.duration);
			const hoverBarPercentage = 100 * Math.max(0, Math.min(1, (position / containerWidth) - progressPercentage));
			this.setState({hoverBarPercentage});
		}
	}

	onProgressBarMouseOut = () => {
		this.setState({hoverBarPercentage: 0});
	}

	render () {
		const key = 'simple-audio-player';
		const classNames = namespacedClassnames(key, {'with-title': this.props.title, disabled: this.state.disabled});

		const fullTime = this.audio && this.audio.duration || 0;
		const {currentTime} = this.state;
		const progressBarWidth = `${100 * currentTime / (fullTime || 1)}%`;

		const maybeTitle = this.props.title ? (
			<EllipsisText><div className='title'>{this.props.title}</div></EllipsisText>
		) : null;

		return (
			<div className={classNames}>
				<span className='play-icon' onClick={this.togglePause}>
					{this.state.paused ? <PlayIcon/> : <PauseIcon/>}
					{this.state.disabled && <PlayerLoader />}
				</span>
				<div className='main-wrapper'>
					{maybeTitle}
					<div className='progress-bar-wrapper'>
						<div
							className='progress-bar'
							ref={this.setProgressContainerRef}
							onMouseDown={this.adjustDisplayedTime}
							onTouchStart={this.adjustDisplayedTime}
							onMouseMove={this.onProgressBarMouseMove}
							onMouseOut={this.onProgressBarMouseOut}
						>
							<div className='progress-bar-track'>
								<div className='progress-bar-inner' style={{width: progressBarWidth}}/>
								<div className='hover-bar' style={{width: `${this.state.hoverBarPercentage}%`}}/>
							</div>
						</div>
						<span className='time'>{`${this.formatTime(currentTime)}/${this.formatTime(fullTime)}`}</span>
					</div>
				</div>
			</div>
		);
	}
}
