const cancellableDelay = (delay: number) => {
	let resolvePromise: any;
	const timer = setTimeout(() => resolvePromise(), delay);
	const promise = new Promise((res) => {
		resolvePromise = res;
	});
	return {
		promise,
		cancel: () => {
			clearTimeout(timer);
		},
	};
};

const isPromise = <T>(item: T | Promise<T>): item is Promise<T> => {
	const i: any = item;
	return i && i.then && i.catch;
};

export function debounce<T> (func: (...args: any[]) => T | Promise<T>, wait: number): (...args: any[]) => Promise<T> {
	let delayManager = cancellableDelay(wait);
	let runningPromises: Array<Promise<T>> = [];

	return (...args: any[]) => {
		delayManager.cancel();
		delayManager = cancellableDelay(wait);

		return delayManager.promise.then((): Promise<any> => {
			return Promise.all(runningPromises);
		}).then(() => {
			const result = func.apply({}, args);
			if (isPromise(result)) {
				runningPromises.push(result);

				// cleanup
				result.then(() => {
					runningPromises = runningPromises
						.filter((p) => p !== result);
				});
			}
			return result;
		});
	};

}
