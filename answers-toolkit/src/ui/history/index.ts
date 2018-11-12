import { NavBlocker, createNavBlocker } from './../..';
import { createBrowserHistory, createMemoryHistory, History } from 'history';

export type AnsHistory = History;

type HistoryCreationParams = {
	basename?: string;
	getUserConfirmation?: (message: string, callback: (result: boolean) => void) => void;
};

export const createHistory = (type: 'memory' | 'browser', navBlocker: NavBlocker, basename: string): AnsHistory => {

	let unblock: any = () => null; // default value to begin with

	const createFn: ((p: HistoryCreationParams) => AnsHistory) = type === 'memory' ? createMemoryHistory : createBrowserHistory;

	const history = createFn({
		getUserConfirmation: (_, callback) => {
			navBlocker.setBlockReleaser(callback);
			navBlocker.reportBlocked();
		},
		basename
	});

	navBlocker.addListener((isBlocked: boolean) => {
		if (isBlocked) {
			const dummyMsg = 'needed so get user confirmation gets called';
			unblock = history.block(dummyMsg);
		} else {
			unblock();
		}

	});

	return history;
};

export const createTestHistory = () => {
	return createHistory('memory', createNavBlocker(), '');
};
