import {
	IntegrationData, IntegrationRegisterContext,
	TicketSandboxContext, WebhookTicketSandboxContext,
	WebhookReplySandboxContext,
	TicketViewPageContext,
	IntegrationSettingsContext
} from '.';

import express = require('express');

import { jweInstance, jwsInstance } from './utils';

import * as bodyParser from 'body-parser';

export const dummyIntegration = async (data: IntegrationData, port: number) => {
	const app = express();
	const jwePromise = await jweInstance(data.secret);
	const jwsPromise = await jwsInstance(data.secret);

	app.use(bodyParser.json());
	app.post('/register', async (req, res) => {
		const rr = await jwePromise.decrypt(req.body.payload);
		res.send(rr.tenantId);
	});

	app.post('/unregister', async (req, res) => {
		const rr = await jwePromise.decrypt(req.body.payload);
		res.send(rr.tenantId);
	});

	app.get('/settings', async (req, res) => {
		const token = req.query.data;
		const context = await jwsPromise.verify(token);
		res.send(`<h2>${context.tenantId}</h2>`);
	});

	app.get('/view', async (req, res) => {
		const token = req.query.data;
		const { payload, tenantId } = await jwsPromise.verify(token);

		res.send(`<h2>${JSON.parse(payload).subject} - ${tenantId}</h2>`);
	});

	app.post('/webhook/ticket-created', async (req, res) => {
		const { payload } = req.body;
		const verified = await jwsPromise.verify(payload);
		res.send(verified);
	});

	app.post('/webhook/reply-created', async (req, res) => {
		const { payload } = req.body;
		const verified = await jwsPromise.verify(payload);
		res.send(verified);
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
		ticketSidebar: {
			title: '',
			url: ''
		},
		webhooks: {
			TICKET_CREATED: '',
			REPLY_CREATED: ''
		},
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
		timestamp: Date.now(),
		performingUserId: 'bob-id',
		...partial
	};
};

// tslint:disable-next-line: max-line-length
export const settingsViewPayloadBuilder = (partial: Partial<IntegrationSettingsContext> = {}): IntegrationSettingsContext => {
	return {
		tenantId: 'bob4',
		timestamp: Date.now(),
		performingUserId: 'bob-id',
		...partial
	};
};

export const ticketViewPayloadBuilder = (partial: Partial<TicketViewPageContext> = {}): TicketViewPageContext => {
	return {
		id: '',
		subject: '',
		userEmail: '',
		userId: '',
		...partial
	};
};

export const ticketPayloadBuilder = (partial: Partial<TicketSandboxContext> = {}): TicketSandboxContext => {
	return {
		id: 'bob7',
		subject: 'dfgdfg',
		user: {
			email: 'david@rahel.com',
			fullName: 'David Rahel'
		},
		content: '',
		channel: 130,
		status: 100,
		priority: 20,
		url: '',
		assignedUser: {
			email: 'amit@huli.com',
			fullName: 'Amit Huli'
		},
		...partial
	};
};

export const webhookTicketPayloadBuilder = (partial: Partial<WebhookTicketSandboxContext> = {}):
	WebhookTicketSandboxContext => {
	return {
		tenantId: partial.tenantId || '',
		performingUserId: partial.performingUserId || '',
		timestamp: Date.now(),
		payload: ticketPayloadBuilder(partial && partial.payload || {})
	};
};

export const webhookReplyPayloadBuilder = (partial: Partial<WebhookReplySandboxContext> = {}):
	WebhookReplySandboxContext => {
	return {
		tenantId: partial.tenantId || '',
		payload: {
			id: 'bob7',
			user: {
				email: 'david@rahel.com',
				fullName: 'David Rahel'
			},
			parentTicket: ticketPayloadBuilder()
		}
	};
};
