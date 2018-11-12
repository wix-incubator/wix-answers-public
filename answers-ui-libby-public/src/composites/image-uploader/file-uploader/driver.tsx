import { UniDriver } from 'unidriver';
import { fileUploaderKey } from '.';

export type FileUploaderDriver = {
	getProgressPercentage: () => Promise<number>,
	isUploadErrorDisplayed: () => Promise<boolean>,
	base: UniDriver
};

export const createFileUploaderDriver = (wrapper: UniDriver): FileUploaderDriver => {
	const base = wrapper.$(`.${fileUploaderKey}`);
	return {
		getProgressPercentage: () => base.$('.progress-percentage').text().then((numStr) => parseInt(numStr, 10)),
		isUploadErrorDisplayed: () => base.$('.error-state').exists(),
		base
	};
};
