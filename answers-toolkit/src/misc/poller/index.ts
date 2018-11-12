export type PollerListener<T> = (value: T) => void;
export type ErrorPollerListener<T> = (value: T, retries: number) => boolean | void;

const intervalsMap = {
	short: 3000,
	normal: 5000,
	long: 10000
};

export type PollerInterval = 'short' | 'normal' | 'long';

export type PollerOptions<Err = Error> = {
	interval: PollerInterval | number;
	maxRetries: number;
	isPaused: () => boolean;
	errorCb: ErrorPollerListener<Err>;
	increaseIntervalFn: (retries: number, interval: any, error: Err) => number;
};

const defaultOptions: PollerOptions<Error> = {
	interval: 'normal',
	maxRetries: 4,
	isPaused: () => false,
	errorCb: () => false,
	increaseIntervalFn: (retries: number, interval: number) => {
		// interval, interval * 3, interval * 9, interval * 27 / 2000, 6000, 18000, 54000
		return interval * Math.pow(3, retries);
	}
};

export const Poller = <T>(pollingApi: () => Promise<T>, cb: PollerListener<T>, options?: Partial<PollerOptions<Error>>) => {
	let timer: NodeJS.Timer;
	let retries = 0;
	let pollingEnded = false;

	const allOptions = {...defaultOptions, ...options};
	const {maxRetries, isPaused, errorCb} = allOptions;
	const interval = typeof allOptions.interval === 'string' ? intervalsMap[allOptions.interval] : allOptions.interval;

	const poll = () => {
		if (isPaused()) {
			timer = setTimeout(() => poll(), interval);
		} else {
			pollingApi()
			.then((res) => {
				cb(res);
				retries = 0;
				if (!pollingEnded) {
					timer = setTimeout(() => poll(), interval);
				}
			})
			.catch((error) => {
				const forceStop = errorCb(error, retries);
				if (!forceStop) {
					retries++;
					if (retries < maxRetries) {
						if (!pollingEnded) {
							timer = setTimeout(() => poll(), allOptions.increaseIntervalFn(retries, interval, error));
						}
					}
				} else {
					endPolling();
				}
			});
		}
	};

	poll();

	const endPolling = () => {
		clearTimeout(timer);
		pollingEnded = true;
	};
	return endPolling;
};

export type SmartPollerOptions = {
	document: Document;
} & Partial<PollerOptions<Error>>;

export const SmartPoller = <T>(pollingApi: () => Promise<T>, cb: PollerListener<T>, options: SmartPollerOptions) => {

	const isPausedOrDocumentHidden = () => {
		const paused = options.isPaused && options.isPaused();
		return paused || options.document.visibilityState === 'hidden';
	};

	const combinedOptions: SmartPollerOptions = {...options, isPaused: isPausedOrDocumentHidden};
	const endPolling = Poller(pollingApi, cb, combinedOptions);

	return endPolling;
};
