import {SimpleTooltip} from '../../primitives/simple-tooltip/simple-tooltip';
import {namespacedClassnames} from '../../common/namespace-classes';
import {DownloadIcon} from './download-icon';
import {PlaybackRate} from './playback-rate';

import * as React from 'react';
import { SimpleAudioPlayer } from '../simple-audio-player/simple-audio-player.comp';

export type AudioPlayerProps = {
	audioUrl: string;
	translateFn?: (key: string) => string;
};

export type AudioPlayerState = {
	playbackRate: number;
	playerDisabled: boolean;
};

export class AudioPlayer extends React.Component<AudioPlayerProps, AudioPlayerState> {

	state: AudioPlayerState = {
		playbackRate: 1,
		playerDisabled: true
	};

	onSelectPlaybackRate = (rate: number) => {
		this.setState({playbackRate: rate});
	}

	updatePlayerDisabledState = (disabled: boolean) => {
		this.setState({playerDisabled: disabled});
	}

	render () {
		const props = this.props;
		const key = 'audio-player';
		const disabled = this.state.playerDisabled;
		const classNames = namespacedClassnames(key, {disabled});
		const downloadText = props.translateFn ? props.translateFn('common.download') : 'Download';
		const text = this.props.translateFn ? this.props.translateFn('common.playback-speed') : 'Playback speed';
		const downloadButton = <a className='download-button' href={props.audioUrl} download={true}><DownloadIcon /></a>;
		return (
			<div className={classNames}>
				<SimpleAudioPlayer
					updateDisabled={this.updatePlayerDisabledState}
					audioUrl={props.audioUrl}
					playbackRate={this.state.playbackRate}
				/>
				<SimpleTooltip position='above' text={downloadText}>
					{disabled ? <span className='disabled-download-button'><DownloadIcon /></span> : downloadButton}
				</SimpleTooltip>
				<SimpleTooltip text={text} position='above'>
					<PlaybackRate onSelect={this.onSelectPlaybackRate} currentRate={this.state.playbackRate}/>
				</SimpleTooltip>
			</div>
		);
	}
}
