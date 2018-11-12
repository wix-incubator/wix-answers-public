import * as React from 'react';
import { getBaseReactDriver } from '../../drivers';
import { renderAndMountComponent } from 'answers-toolkit';
import {SimpleAudioPlayer, SimpleAudioPlayerProps} from './simple-audio-player.comp';
import { LegacyBaseDriver } from '../../common/base-driver';

export type SimpleAudioPlayerDriver = {
	getTimeString: () => string;
	isPlaying: () => boolean;
	clickPlayPause: () => void;
	base: LegacyBaseDriver;
};

export const createSimpleAudioPlayerDriver = (elem: Element): SimpleAudioPlayerDriver => {
	const base = getBaseReactDriver(elem);
	const getTimeString = () => base.find('.time').getText();
	return {
		getTimeString,
		isPlaying: () => {
			return base.isChildVisible('.svg-icon.pause');
		},
		clickPlayPause: () => base.find('.play-icon').click(),
		base
	};
};

export const renderSimpleAudioPlayerAndReturnDriver = (props: SimpleAudioPlayerProps): SimpleAudioPlayerDriver => {
	const elem = renderAndMountComponent(<SimpleAudioPlayer {...props} />);
	return createSimpleAudioPlayerDriver(elem);
};
