#!/usr/bin/env node

import { startSandbox, log } from '.';

startSandbox()
	.then(({url}) => {
		// tslint:disable-next-line:no-console
		log('Running! Open your browser - ', url);
	});
