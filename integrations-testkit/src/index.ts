
import axios from 'axios';
import { jweInstance, getFreePort, jwsInstance, log } from './utils';
import * as express from 'express';
import * as bodyParser from 'body-parser';

export interface IntegrationRegisterContext {
	keyId: string;
	secret: string; // Answers API Secret
	host: string; // Hostname of the Tenant who added integration
	tenantId: string;
}

export interface IntegrationUnegisterContext {
	tenantId: string;
}

export interface IntegrationSettingsContext {
	tenantId: string;
}

export interface IntegrationData {
	id: string;
	secret: string;
	registerUrl: string;
	unregisterUrl: string;
	settingsUrl: string;
	ticketSidebar?: {
		title: string,
		url: string
	};
	webhooks?: {
		TICKET_CREATED?: string,
		REPLY_CREATED?: string
	};
}

export interface TicketViewPageContext {
	id: string;
	subject: string;
	userEmail: string;
	userId: string;
}
export interface TicketSandboxContext {
	id: string;
	subject: string;
	content: string;
	channel: number;
	status: number;
	priority: number;
	url: string;
	assignedUser: {
		email: string;
		fullName: string;
	};
	user: {
		email: string;
		fullName: string;
	};
}

export interface WebhookTicketSandboxContext {
	tenantId: string;
	timestamp: number;
	payload: TicketSandboxContext;
}

export interface WebhookReplySandboxContext {
	tenantId: string;
	payload: {
		id: string;
		user: {
			email: string;
			fullName: string;
		};
		parentTicket: TicketSandboxContext
	};
}
export interface SignedContext<T> {
	payload: T;
	tenantId: string;
}

export interface IntegrationsTestkit {
	triggerRegister: (context: IntegrationRegisterContext) => Promise<any>;
	triggerUnregister: (tenantId: string) => Promise<any>;
	getTicketViewSandboxUrl: (context: SignedContext<TicketViewPageContext>) => string;
	getRenderedSettingsUrl: (tenantId: string) => string;
	closeServer: () => Promise<void>;
	triggerTicketCreated: (context: WebhookTicketSandboxContext) => Promise<any>;
	triggerReplyCreated: (context: WebhookReplySandboxContext) => Promise<any>;
}

// tslint:disable-next-line:max-line-length
export const createTestkit = async (
	integrationData: IntegrationData,
	forcePort?: number
): Promise<IntegrationsTestkit> => {

	const {
		secret,
		registerUrl,
		unregisterUrl,
		settingsUrl,
		ticketSidebar = {
			title: '',
			url: ''
		},
		webhooks = {
			REPLY_CREATED: '',
			TICKET_CREATED: ''
		}
	} = integrationData;

	// tslint:disable-next-line:no-console
	const jwePromise = jweInstance(secret);
	const jwsPromise = jwsInstance(secret);

	const app = express();
	app.use(bodyParser.json());
	app.get('/settings/:tenantId', async (req, res) => {
		const tenantId = req.params.tenantId;
		const jws = await jwsPromise;
		const token = await jws.sign(JSON.stringify({ tenantId }));
		const html = `
		<html>
			<head>
			<style>
				iframe {
					width: 1000px;
					height: 700px;
					border: 1px solid #eee;
					margin: 0 auto;
					display: block;
				}
			</style>
			</head>
			<body>
				<h1>Integration settings</h1>
				<iframe name="settings" src="${settingsUrl}?data=${token}"/>
			</body>
		</html>`;
		res.send(html);
	});

	app.get('/ticket-view/:data', async (req, res) => {
		const rawData = Buffer.from(req.params.data, 'base64').toString('utf8');
		const jws = await jwsPromise;
		const token = await jws.sign(rawData);

		const obj = JSON.parse(rawData);

		const subject = obj.payload.subject;

		const html = `<html>
			<head>
				<style>
					iframe {
						width: 335px;
						height: 700px;
						display: block;
						float: right;
					}
				</style>
			</head>
			<body>
				<h1>Fake Ticket Page</h1>
				<h2>${subject}</h2>
				<iframe name="view" src="${ticketSidebar.url}?data=${token}"/>
			</body>
		</html>`;
		res.send(html);
	});

	const port = forcePort || await getFreePort();
	const server = app.listen(port);

	return {
		triggerRegister: async (data) => {
			const jwe = await jwePromise;
			// tslint:disable-next-line:no-console
			const encrypted = await jwe.encrypt(JSON.stringify(data));
			// tslint:disable-next-line:no-console
			log(`Triggering register to url: [${registerUrl}] with data: [${JSON.stringify(encrypted)}]`);
			return axios.post(registerUrl, { payload: encrypted }).then((res) => {
				return res.data;
			});
		},
		triggerUnregister: async (tenantId) => {
			const jwe = await jwePromise;
			// tslint:disable-next-line:no-console
			const encrypted = await jwe.encrypt(JSON.stringify({ tenantId }));
			// tslint:disable-next-line:no-console
			log(`Triggering unregister to url: [${unregisterUrl}] with token: [${JSON.stringify(encrypted)}]`);
			return axios.post(unregisterUrl, { payload: encrypted }).then((res) => {
				return res.data;
			});
		},
		getTicketViewSandboxUrl: ({ payload, tenantId }) => {
			const data = Buffer.from(JSON.stringify({ payload: JSON.stringify(payload), tenantId })).toString('base64');
			return `http://localhost:${port}/ticket-view/${data}`;
		},
		getRenderedSettingsUrl: (tenantId) => {
			const url = `http://localhost:${port}/settings/${tenantId}`;
			return url;
		},
		closeServer: async () => {
			await server.close();
		},
		triggerTicketCreated: async (data) => {
			const jws = await jwsPromise;
			const encrypted = await jws.sign(JSON.stringify(data));

			log(`Triggering ticket created webhook to url:
			[${webhooks.TICKET_CREATED}] with data: [${JSON.stringify(encrypted)}]`);

			if (!webhooks.TICKET_CREATED) {
				throw new Error('Webhook url for ticket created is not defined');
			}
			return axios.post(webhooks.TICKET_CREATED, { payload: encrypted }).then((res) => res.data);
		},
		triggerReplyCreated: async (data) => {
			const jws = await jwsPromise;
			const encrypted = await jws.sign(JSON.stringify(data));

			log(`Triggering reply cereated webhook to url:
			[${webhooks.REPLY_CREATED}] with data: [${JSON.stringify(encrypted)}]`);

			if (!webhooks.REPLY_CREATED) {
				throw new Error('Webhook url for reply created is not defined');
			}

			return axios.post(webhooks.REPLY_CREATED, { payload: encrypted }).then((res) => res.data);
		},

	};
};
