import {simulateClick, LegacyBaseDriver} from '../../common/base-driver';
import {delay} from '../../common';

import * as React from 'react';
import { getBaseReactDriver } from '../../drivers';
import { renderAndMountComponent } from 'answers-lib';
import {AudioPlayer, AudioPlayerProps} from './audio-player.comp';

export type AudioPlayerDriver = {
	getPlaybackSpeed: () => string;
	changePlaybackSpeed: () => void;
	base: LegacyBaseDriver;
};

export const createAudioPlayerDriver = (elem: Element): AudioPlayerDriver => {
	const base = getBaseReactDriver(elem);
	const numberRegex = /[^0-9\.]/g;
	return {
		getPlaybackSpeed: () => base.find('.play-rate-container .play-rate').getText().replace(numberRegex, ''),
		changePlaybackSpeed: async () => {
			base.find('.play-rate-container .play-rate').click();
			await delay(50);
			const playRate = document.querySelectorAll('.play-rate-item')[0];
			if (playRate) {
				simulateClick(playRate);
			}
		},
		base
	};
};

export const renderAudioPlayerAndReturnDriver = (props: AudioPlayerProps): AudioPlayerDriver => {
	const elem = renderAndMountComponent(<AudioPlayer {...props} />);
	return createAudioPlayerDriver(elem);
};
