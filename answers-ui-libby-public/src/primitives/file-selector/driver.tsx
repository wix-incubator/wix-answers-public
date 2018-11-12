import { UniDriver } from 'unidriver';
import { fileSelectorKey } from '.';

export type FileSelectorDriver = {
	selectFile: (file: File) => Promise<void>,
	base: UniDriver
};

declare const window: {
	testFileSelectHook: (file: File) => void;
};

export const createFileSelectorDriver = (wrapper: UniDriver): FileSelectorDriver => {
	const base = wrapper.$(`.${fileSelectorKey}`);
	return {
		selectFile: (file) => Promise.resolve(window.testFileSelectHook(file)),
		base
	};
};
