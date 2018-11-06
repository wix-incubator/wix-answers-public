#!/usr/bin/env node

import { startSandbox } from '.';

startSandbox()
	.then(({url}) => {
		// tslint:disable-next-line:no-console
		console.log('Sandbox running in: ', url);
	});
