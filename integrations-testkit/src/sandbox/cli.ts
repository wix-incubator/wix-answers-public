#!/usr/bin/env node

import { startSandbox } from '.';
import { log } from '../utils';

startSandbox()
	.then(({url}) => {
		// tslint:disable-next-line:no-console
		log('Running! Open your browser - ', url);
	});
