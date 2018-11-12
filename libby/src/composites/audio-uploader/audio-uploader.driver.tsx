import * as React from 'react';
import { getBaseReactDriver } from '../../drivers';
import { renderAndMountComponent } from 'answers-lib';
import {AudioUploader, AudioUploaderProps} from './audio-uploader.comp';
import { LegacyBaseDriver } from '../../common/base-driver';

export type AudioUploaderDriver = {
	isAudioPlayerVisible: () => boolean,
	isEmptyState: () => boolean,
	base: LegacyBaseDriver
};

export const createAudioUploaderDriver = (elem: Element): AudioUploaderDriver => {
	const base = getBaseReactDriver(elem);
	return {
		isAudioPlayerVisible: () => base.isChildVisible('.simple-audio-player'),
		isEmptyState: () => base.isChildVisible('.empty-state'),
		base
	};
};

export const renderAudioUploaderAndReturnDriver = (props: AudioUploaderProps): AudioUploaderDriver => {
	const elem = renderAndMountComponent(<AudioUploader {...props} />);
	return createAudioUploaderDriver(elem);
};
