import * as React from 'react';
import { createLegacyInputDriver, getBaseReactDriver } from '../../drivers';
import {findInPopover} from '../../common/find-in-popover';
import { renderAndMountComponent } from 'answers-toolkit';
import {ImageUploader, ImageUploaderProps} from './image-uploader.comp';
import { LegacyBaseDriver } from '../../common/base-driver';

export type ImageUploaderDriver = {
	getImageURL: () => string,
	addImageFromWeb: (url: string) => void;
	changeImageFromWebUrl: (url: string) => void;
	getProgressPercentage: () => number;
	isUrlValidationErrorDisplayed: () => boolean;
	isUploadError: () => boolean;
	base: LegacyBaseDriver
};

export const createImageUploaderDriver = (elemOrLegacyBaseDriver: Element | LegacyBaseDriver): ImageUploaderDriver => {
	const base = getBaseReactDriver(elemOrLegacyBaseDriver);
	return {
		getImageURL: () => base.find('.image-container').getDataAttr('image-url'),
		addImageFromWeb: async (url) => {
			base.find('.add-button').click();
			const uploadPopover = findInPopover('.upload-image-popover-body');
			uploadPopover.find('.image-from-web').click();
			const inputDriver = createLegacyInputDriver(uploadPopover.elem);
			inputDriver.enterValue(url);
			uploadPopover.find('.save-button').click();
		},
		changeImageFromWebUrl: async (url) => {
			const uploadPopover = findInPopover('.upload-image-popover-body');
			const inputDriver = createLegacyInputDriver(uploadPopover.elem);
			inputDriver.enterValue(url);
			uploadPopover.find('.save-button').click();
		},
		isUrlValidationErrorDisplayed: () => {
			const popoverVisible = base.find('.add-button').hasClass('show');
			if (popoverVisible) {
				const uploadPopover = findInPopover('.upload-image-popover-body');
				const inputDriver = createLegacyInputDriver(uploadPopover.elem);
				return inputDriver && !inputDriver.isValid();
			} else {
				return false;
			}
		},
		getProgressPercentage: () => parseInt(base.find('.progress-percentage').getText(), 10),
		isUploadError: () => base.isChildVisible('.error-state'),
		base
	};
};

export const renderImageUploaderAndReturnDriver = (props: ImageUploaderProps): ImageUploaderDriver => {
	const elem = renderAndMountComponent(<ImageUploader {...props}/>);
	return createImageUploaderDriver(elem);
};
