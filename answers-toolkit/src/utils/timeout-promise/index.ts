export const timeoutPromise = <T>(timeout: number, promise: Promise<T>): Promise<T> => {
	return new Promise((resolve, reject) => {
		promise.then(resolve);
		setTimeout(() => {
			reject('timeout');
		}, timeout);
	});
};
