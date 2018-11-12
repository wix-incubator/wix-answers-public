export interface ErrorReporter {
	setup: (version: string) => void;
	indentify: (user: {email: string, id: string, fullName: string}) => void;
	reportError: (e: Error) => void;
	logMessage: (msg: string) => void;
	trackEvent: (event: any) => void;
}

export const createSentryReporter = (raven: any, key: string): ErrorReporter => {

	return {
		setup: (appVersion: string) => {
			raven.config(key, {release: appVersion}).install();
		},
		indentify: (user) => raven.setUserContext({email: user.email, name: user.fullName, id: user.id}),
		reportError: (e) => raven.captureException(e),
		logMessage: (msg) => raven.captureMessage(msg),
		trackEvent: (ev) => raven.captureBreadcrumb(ev)
	};
};
