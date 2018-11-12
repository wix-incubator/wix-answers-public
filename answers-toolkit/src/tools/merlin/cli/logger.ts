// tslint:disable-next-line:no-var-requires
const { dim, red, yellow, magenta, cyan } = require('chalk');

export enum LogLevel {
	ERROR = 1,
	WARN = 2,
	LOG = 3,
	INFO = 4,
	DEBUG = 5
}

export const createLogger = (log: any, logLevel: LogLevel): Logger => {

	const logger: Logger = {
		error: (...args) => {
			log(red('[error]'), ...args);
			return logger;
		},
		warn: (...args) => {
			if (logLevel >= LogLevel.WARN) {
				log(yellow('[warning]'), ...args);
			}
			return logger;
		},
		log: (...args) => {
			if (logLevel >= LogLevel.LOG) {
				log(...args);
			}
			return logger;
		},
		info: (...args) => {
			if (logLevel >= LogLevel.INFO) {
				log(dim(cyan('[info]')), ...args);
			}
			return logger;
		},
		debug: (...args) => {
			if (logLevel >= LogLevel.DEBUG) {
				log(dim(magenta('[debug]')), ...args);
			}
			return logger;
		}
	};

	return logger;
};

export type LogFn = (...args: any[]) => Logger;

export type Logger = {
	debug: LogFn,
	info: LogFn,
	log: LogFn,
	warn: LogFn,
	error: LogFn
};
