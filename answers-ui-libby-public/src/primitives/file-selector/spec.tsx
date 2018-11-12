import { assert } from 'chai';
import { testViewCompPropsCreator, renderAndMountComp, noop } from 'answers-toolkit';
import { reactUniDriver } from 'unidriver';

import { FileSelector, FileSelectorProps } from '.';
import { createFileSelectorDriver } from './driver';
import { spy } from 'sinon';
import * as jsdomGlobal from 'jsdom-global';

const propsCreator = testViewCompPropsCreator<FileSelectorProps>(() => ({
	onFileSelect: noop,
	supportedFileTypes: ['.jpg']
}));

const setup = (partialProps: Partial<FileSelectorProps>) => {
	const props = propsCreator(partialProps);
	const elem = renderAndMountComp<FileSelectorProps>(FileSelector, props);
	const baseDriver = reactUniDriver(elem);
	return createFileSelectorDriver(baseDriver);
};

describe('FileSelector', () => {
	let cleanup: any;
	beforeEach(() => {
		cleanup = jsdomGlobal();
	});

	afterEach(() => {
		cleanup();
	});

	it('calls onFileSelect cb when file is selected', async () => {
		const fileSelectSpy = spy();
		const file = new File([''], 'best file');
		const driver = setup({onFileSelect: fileSelectSpy});
		assert.equal(fileSelectSpy.called, false);
		await driver.selectFile(file);
		assert.equal(fileSelectSpy.called, true);
		assert.equal(fileSelectSpy.calledWith(file), true);
	});
});
