import { UniDriver } from 'unidriver';

export const popoverDriver = (documentWrapper: UniDriver) => {
	return documentWrapper.$('.Popover');
};
