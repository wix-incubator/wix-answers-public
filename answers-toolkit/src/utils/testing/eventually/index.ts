
import { delay } from '../index';

export const eventually = async (callback: () => void, timeout = 1200, retryDelay = 30, lastError: any = null): Promise<void> => {
	if (timeout < 0) {
		throw new Error(`[Eventually timeout exceeded after: timeout with error]: ${lastError}`);
	}
	try {
		await callback();
	} catch (e) {
		const now = Date.now();
		await delay(retryDelay);
		const delta = Date.now() - now;
		return eventually(callback, timeout - delta, retryDelay, e);
	}
};
