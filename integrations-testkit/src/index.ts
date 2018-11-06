
import axios from 'axios';
import { jweInstance, getFreePort, jwsInstance } from './utils';
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
	scriptUrl: string;
}

export interface TicketSandboxContext {
	id: string;
	subject: string;
	user: {
		email: string;
		fullName: string;
	};
}

export interface IntegrationsTestkit {
	triggerRegister: (context: IntegrationRegisterContext) => Promise<any>;
	triggerUnregister: (tenantId: string) => Promise<any>;
	getTicketViewSandboxUrl: (context: TicketSandboxContext) => string;
	getRenderedSettingsUrl: (tenantId: string) => string;
	closeServer: () => Promise<void>;
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
		scriptUrl
	} = integrationData;

	// tslint:disable-next-line:no-console
	const jwePromise = jweInstance(secret);
	const jwsPromise = jwsInstance(secret);

	const app = express();
	app.use(bodyParser());
	app.get('/settings/:tenantId', async (req, res) => {
		const tenantId = req.params.tenantId;
		const jws = await jwsPromise;
		const token = await jws.sign(JSON.stringify({tenantId}));
		const html = `<html>
		<h1>Integration settings</h1>
		<iframe name="settings" src="${settingsUrl}?data=${token}"/>
		</html>`;
		res.send(html);
	});

	app.post('/sign', async (req, res) => {
		const body = req.body;
		const jws = await jwsPromise;
		const token = await jws.sign(JSON.stringify({context: body.context}));
		res.send({payload: token});
	});

	app.get('/ticket-view/:data', async (req, res) => {
		const rawData = req.params.data;
		const str = Buffer.from(req.params.data, 'base64').toString('utf8');
		const data = JSON.parse(str);
		// const jws = await jwsPromise;
		// const token = await jws.sign(JSON.stringify({tenantId}));
		const html = `<html>
		<script>
		listeners = [];
		answersBackofficeSdk = {
			eventTypes: {ticketLoaded: 42},
			addListener: (type, cb) => listeners.push(cb),
			addTicketInfoSection: (title, html) => {
				const div = document.createElement('div');
				div.innerHTML = html;
				document.body.appendChild(div);
			},
			sign: (id, context) => {
				return fetch('/sign', {
					method: 'POST',
					body: JSON.stringify({context}),
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(res => res.json())
				.then(data => data.payload);
			}
		}

		</script>
		<script type="text/javascript" src="${scriptUrl}"></script>
		<h1>Ticket page dummy  - [${data.subject}]</h1>
		<pre><code>${JSON.stringify(data)}</code></pre>
		<script>
			const data = atob('${rawData}');
			listeners.forEach((cb) => cb(JSON.parse(data)));
		</script>
		</html>`;
		res.send(html);
	});

	const port = forcePort || await getFreePort();
	const server = app.listen(port);

	return {
		triggerRegister: async (data: IntegrationRegisterContext) => {
			const jwe = await jwePromise;
			// tslint:disable-next-line:no-console
			const encrypted = await jwe.encrypt(JSON.stringify(data));
			// tslint:disable-next-line:no-console
			return axios.post(registerUrl, encrypted).then((res) => {
				return res.data;
			});
		},
		triggerUnregister: async (tenantId: string) => {
			const jwe = await jwePromise;
			// tslint:disable-next-line:no-console
			const encrypted = await jwe.encrypt(JSON.stringify({tenantId}));
			// tslint:disable-next-line:no-console
			return axios.post(unregisterUrl, encrypted).then((res) => {
				return res.data;
			});
		},
		getTicketViewSandboxUrl: (context: TicketSandboxContext) => {
			const data = Buffer.from(JSON.stringify(context)).toString('base64');
			return `http://localhost:${port}/ticket-view/${data}`;
		},
		getRenderedSettingsUrl: (tenantId: string) => {
			const url = `http://localhost:${port}/settings/${tenantId}`;
			return url;
		},
		closeServer: async () => {
			await server.close();
		}

	};
};
