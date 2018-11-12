import {delay} from '../../common';
import * as jsdomGlobal from 'jsdom-global';
import {expect} from 'chai';
import { renderAudioPlayerAndReturnDriver } from './audio-player.driver';

describe('AudioPlayer', () => {

	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('should change playback rate when different playback rate is selected', async () => {
		const audioUrl = 'https://www.html5tutorial.info/media/vincent.mp3';
		const props = {audioUrl};
		const driver = renderAudioPlayerAndReturnDriver(props);
		expect(driver.getPlaybackSpeed()).to.eql('1.00');
		driver.changePlaybackSpeed();
		await delay(500);
		expect(driver.getPlaybackSpeed()).to.eql('0.75');
	});
});
