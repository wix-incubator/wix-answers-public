import * as jsdomGlobal from 'jsdom-global';
import {expect} from 'chai';
import { renderSimpleAudioPlayerAndReturnDriver } from './simple-audio-player.driver';

describe('SimpleAudioPlayer', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('should render and display "0:00/0:00" for invalid url', () => {
		const props = {audioUrl: 'no-audio.mp3'};
		const driver = renderSimpleAudioPlayerAndReturnDriver(props);
		expect(driver.getTimeString()).to.eql('0:00/0:00');
	});

	// tslint:disable-next-line:no-skipped-tests
	it.skip('should play and pause when button is clicked', async () => {
		const audioUrl = 'http://www.sample-videos.com/audio/mp3/crowd-cheering.mp3';
		const props = {audioUrl};
		const driver = renderSimpleAudioPlayerAndReturnDriver(props);
		expect(driver.isPlaying()).to.eql(false);
		driver.clickPlayPause();
		expect(driver.isPlaying()).to.eql(true);
		driver.clickPlayPause();
		expect(driver.isPlaying()).to.eql(false);
	});
});
