import { assert } from 'chai';
import { renderImageUploaderAndReturnDriver } from './image-uploader.driver';
import { noop, delay } from '../../common';
import { spy } from 'sinon';
import * as jsdomGlobal from 'jsdom-global';

describe('ImageUploader', () => {
	let cleanup: any;

	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	const t = () => 'bob';

	const defaultProps = {
		t,
		onChange: noop,
		url: '',
		fileUploader: {
			uploadFile: () => Promise.resolve({} as any),
			uploadImageFromUrl: () => Promise.resolve({filelink: 'bobob', extension: 'jpg', fileSizeBytes: 50} as any),
			supportedFileTypes: ['.jpg'],
			uploadLimitInBytes: 5000
		},
		size: {height: 100, width: 100}
	};

	it('should display image if passed in props', () => {
		const url = 'http://lorempixel.com/100/100/people/?ck=7933';
		const props = {...defaultProps, url};
		const driver = renderImageUploaderAndReturnDriver(props);
		assert.equal(driver.getImageURL(), url);
	});

	it('should call onChange cb once upload is complete', async () => {
		const changeSpy = spy();
		const uploadImageFromUrl = async (_: {}) => {
			await delay(50);
			return Promise.resolve({filelink: 'bobob', extension: 'jpg', fileSizeBytes: 50} as any);
		};
		const props = {
			...defaultProps,
			onChange: changeSpy,
			fileUploader: {...defaultProps.fileUploader, uploadImageFromUrl}
		};
		const driver = renderImageUploaderAndReturnDriver(props);
		await driver.addImageFromWeb('http://lorempixel.com/100/100/people/?ck=9795');
		assert.equal(changeSpy.called, false);
		await delay(60);
		assert.equal(changeSpy.calledOnce, true);
		assert.equal(changeSpy.calledWith('bobob'), true);
	});

	it('validates input when uploading image from web', async () => {
		const changeSpy = spy();
		const props = {
			...defaultProps,
			onChange: changeSpy
		};
		const driver = renderImageUploaderAndReturnDriver(props);
		driver.addImageFromWeb('bob is dead');
		await delay(20);
		assert.equal(changeSpy.called, false);
		assert.equal(driver.isUrlValidationErrorDisplayed(), true);
		driver.changeImageFromWebUrl('http://longlivebob.com');
		await delay(20);
		assert.equal(changeSpy.called, true);
		assert.equal(driver.isUrlValidationErrorDisplayed(), false);
	});
});
