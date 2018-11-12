import { assert } from 'chai';
import { noop, delay } from '../../../common';
import { spy } from 'sinon';
import { testViewCompPropsCreator, renderAndMountComp } from 'answers-toolkit';
import { reactUniDriver } from 'unidriver';
import * as jsdomGlobal from 'jsdom-global';

import { FileUploader, FileUploaderProps } from '.';
import { createFileUploaderDriver } from './driver';

const dummyFileUploaderApi = {
	uploadFile: () => Promise.resolve({} as any),
	uploadImageFromUrl: () => Promise.resolve({filelink: 'bobob', extension: 'jpg', fileSizeBytes: 50} as any),
	supportedFileTypes: ['.jpg'],
	uploadLimitInBytes: 5000
};

const propsCreator = testViewCompPropsCreator<FileUploaderProps>(() => ({
	t: () => 'bob',
	onChange: noop,
	fileUploader: dummyFileUploaderApi,
	fileToUpload: '',
	onError: noop
}));

const setup = (partialProps: Partial<FileUploaderProps>) => {
	const props = propsCreator(partialProps);
	const elem = renderAndMountComp<FileUploaderProps>(FileUploader, props);
	const baseDriver = reactUniDriver(elem);
	return createFileUploaderDriver(baseDriver);
};

describe('UploadProgress', () => {
	let cleanup: any;

	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});
	it('calls uploadImageFromURL when passed url', async () => {
		const uploadSpy = spy();
		const uploadImageFromUrl = (urlDto: {url: string}) => {
			uploadSpy(urlDto.url);
			return Promise.resolve({filelink: 'bob'} as any);
		};
		setup({
			fileUploader: {...dummyFileUploaderApi, uploadImageFromUrl},
			fileToUpload: 'http://lorempixel.com/100/100/people/?ck=9795'
		});
		assert.equal(uploadSpy.callCount, 1);
		assert.equal(uploadSpy.args[0][0], 'http://lorempixel.com/100/100/people/?ck=9795');
	});

	it('shows upload progress', async () => {
		const uploadImageFromUrl = async (_: {url: string}, onProgress?: (progress: ProgressEvent) => void) => {
			onProgress = onProgress || noop;
			const total = 100;
			const progress = {loaded: 20, total};
			await delay(20);
			onProgress(progress as ProgressEvent);
			await delay(20);
			progress.loaded = 50;
			onProgress(progress as ProgressEvent);
			await delay(20);
			progress.loaded = 80;
			onProgress(progress as ProgressEvent);
			await delay(20);
			return Promise.resolve({filelink: 'bob'} as any);
		};
		const driver = setup({
			fileUploader: {...dummyFileUploaderApi, uploadImageFromUrl},
			fileToUpload: 'http://www.bob.com/bob.jpg'
		});
		assert.equal(await driver.getProgressPercentage(), 0);
		await delay(20);
		assert.equal(await driver.getProgressPercentage(), 20);
		await delay(20);
		assert.equal(await driver.getProgressPercentage(), 50);
		await delay(20);
		assert.equal(await driver.getProgressPercentage(), 80);
	});

	it('calls onChange cb once upload is complete', async () => {
		const changeSpy = spy();
		const uploadImageFromUrl = async (_: {}) => {
			await delay(50);
			return Promise.resolve({filelink: 'bobob', extension: 'jpg', fileSizeBytes: 50} as any);
		};
		setup({
			onChange: changeSpy,
			fileUploader: {...dummyFileUploaderApi, uploadImageFromUrl},
			fileToUpload: 'http://www.bob.com/bob.jpg'
		});
		assert.equal(changeSpy.called, false);
		await delay(60);
		assert.equal(changeSpy.calledOnce, true);
		assert.equal(changeSpy.calledWith('bobob'), true);
	});

	it('displays error message on upload error and calls onError cb', async () => {
		const errorSpy = spy();
		const uploadImageFromUrl = async (_: {}) => {
			await delay(5);
			return Promise.reject({errorCode: 666} as any);
		};
		const driver = setup({
			onError: errorSpy,
			fileUploader: {...dummyFileUploaderApi, uploadImageFromUrl},
			fileToUpload: 'http://www.bob.com/bob.jpg'
		});
		assert.equal(await driver.isUploadErrorDisplayed(), false);
		await delay(10);
		assert.equal(await driver.isUploadErrorDisplayed(), true);
	});
});
