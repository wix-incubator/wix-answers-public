import { IntegrationData, IntegrationRegisterContext, TicketSandboxContext } from '.';

import express = require('express');

import { jweInstance, jwsInstance } from './utils';

import * as bodyParser from 'body-parser';

export const dummyIntegration = (data: IntegrationData, port: number) => {
	const app = express();
	const jwePromise = jweInstance(data.secret);
	const jwsPromise = jwsInstance(data.secret);

	app.use(bodyParser());
	app.post('/register', async (req, res) => {
		const jwe = await jwePromise;
		const rr = await jwe.decrypt(req.body);
		res.send(rr.tenantId);
	});

	app.post('/unregister', async (req, res) => {
		const jwe = await jwePromise;
		const rr = await jwe.decrypt(req.body);
		res.send(rr.tenantId);
	});

	app.get('/settings', async (req, res) => {
		const token = req.query.data;
		const jws = await jwsPromise;
		const context = await jws.verify(token);
		res.send(`<h2>${context.tenantId}</h2>`);
	});

	app.get('/view/:token', async (req, res) => {
		const token = req.params.token;
		const jws = await jwsPromise;
		const {context} = await jws.verify(token);
		res.send(`<h2>${context}</h2>`);
	});

	const fullUrl = `http://localhost:${port}`;

	app.get('/script.js', async (_, res) => {
		const code = `
		answersBackofficeSdk.addListener(answersBackofficeSdk.eventTypes.ticketLoaded, async (t) => {

			const token = await answersBackofficeSdk.sign('${data.id}', t.user.email);
			const url = '${fullUrl}/view/' + token;
			answersBackofficeSdk.addTicketInfoSection('Integration!', '<iframe name="view" src="' + url + '"/>');
		});
		`;
		res.header('Content-Type', 'application/javascript');
		res.send(code);
	});

	const server = app.listen(port);
	return () => server.close();
};

export const integrationDataBuilder = (partial: Partial<IntegrationData> = {}): IntegrationData => {
	return {
		id: 'bob',
		secret: 'abcdefabcdefabcdefabcdefabcdefabcdefabcdefa',
		registerUrl: '',
		unregisterUrl: '',
		settingsUrl: '',
		scriptUrl: '',
		...partial
	};
};

// tslint:disable-next-line:max-line-length
export const integrationContextBuilder = (partial: Partial<IntegrationRegisterContext> = {}): IntegrationRegisterContext => {
	return {
		keyId: 'bob1', // Answers API key
		secret: 'bob2', // Answers API Secret
		host: 'bob3', // Hostname of the Tenant who added integration
		tenantId: 'bob4',
		...partial
	};
};

export const ticketContextBuilder = (partial: Partial<TicketSandboxContext> = {}): TicketSandboxContext => {
	return {
		id: 'bob7',
		subject: 'dfgdfg',
		user: {
			email: 'david@rahel.com',
			fullName: 'David Rahel'
		},
		...partial
	};
};
