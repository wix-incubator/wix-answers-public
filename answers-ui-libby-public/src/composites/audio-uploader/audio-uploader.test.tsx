import * as jsdomGlobal from 'jsdom-global';
import {expect} from 'chai';
import { renderAudioUploaderAndReturnDriver } from './audio-uploader.driver';

describe('AudioUploader', () => {

	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('should render audio player if passed Url', () => {
		const props = {
			audioUrl: 'audio.mp3',
			translateFn: () => 'text',
			onAudioFileChange: () => console.log('changed'), // tslint:disable-line
			fileUploader: {supportedFileTypes: []} as any
		};
		const driver = renderAudioUploaderAndReturnDriver(props);
		expect(driver.isAudioPlayerVisible()).to.eql(true);
	});

	it('should render empty state if not passed Url', () => {
		const props = {
			translateFn: () => 'text',
			onAudioFileChange: () => console.log('changed'), // tslint:disable-line
			fileUploader: {supportedFileTypes: []} as any
		};
		const driver = renderAudioUploaderAndReturnDriver(props);
		expect(driver.isEmptyState()).to.eql(true);
	});
});
