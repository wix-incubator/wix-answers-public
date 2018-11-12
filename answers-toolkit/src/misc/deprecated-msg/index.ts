export const deprecatedMsg = (msg: string) => {
	if (process.env.NODE_ENV === 'development') {
		// tslint:disable-next-line:no-console
		console.log(`%c Deprecated:%c ${msg}`, 'background: #fac249; color: #000; font-weight: bold', '');
	}
};
