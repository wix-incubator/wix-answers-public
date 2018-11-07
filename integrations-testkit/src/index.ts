
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

export interface SignedContext<T> {
	context: T;
	tenantId: string;
}

export interface IntegrationsTestkit {
	triggerRegister: (context: IntegrationRegisterContext) => Promise<any>;
	triggerUnregister: (tenantId: string) => Promise<any>;
	getTicketViewSandboxUrl: (context: SignedContext<TicketSandboxContext>) => string;
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
	app.use(bodyParser.json());
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
		const token = await jws.sign(JSON.stringify(body));
		res.send({payload: token});
	});

	app.get('/ticket-view/:data', async (req, res) => {
		const str = Buffer.from(req.params.data, 'base64').toString('utf8');
		const {context, tenantId} = JSON.parse(str);

		const strContext = Buffer.from(JSON.stringify(context)).toString('base64');

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
			onIntegrationRemoved: () => {},
			sign: (id, context) => {
				return fetch('/sign', {
					method: 'POST',
					body: JSON.stringify({context, tenantId: '${tenantId}'}),
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(res => res.json());
			}
		}

		</script>
		<script type="text/javascript" src="${scriptUrl}"></script>
		<h1>Ticket page dummy  - [${context.subject}]</h1>
		<pre><code>${JSON.stringify(context)}</code></pre>
		<script>
			const data = atob('${strContext}');
			listeners.forEach((cb) => cb(JSON.parse(data)));
		</script>
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
			return axios.post(registerUrl, {payload: encrypted}).then((res) => {
				return res.data;
			});
		},
		triggerUnregister: async (tenantId) => {
			const jwe = await jwePromise;
			// tslint:disable-next-line:no-console
			const encrypted = await jwe.encrypt(JSON.stringify({tenantId}));
			// tslint:disable-next-line:no-console
			log(`Triggering unregister to url: [${unregisterUrl}] with token: [${JSON.stringify(encrypted)}]`);
			return axios.post(unregisterUrl, {payload: encrypted}).then((res) => {
				return res.data;
			});
		},
		getTicketViewSandboxUrl: ({context, tenantId}) => {
			const data = Buffer.from(JSON.stringify({context, tenantId})).toString('base64');
			return `http://localhost:${port}/ticket-view/${data}`;
		},
		getRenderedSettingsUrl: (tenantId) => {
			const url = `http://localhost:${port}/settings/${tenantId}`;
			return url;
		},
		closeServer: async () => {
			await server.close();
		}

	};
};


const sec = 'uTU38ugktvbjXMqNmYOpv0D0xYs2lH9Z09Rmb0FWRYE';

(async () => {
	try {
		const jws = await jwsInstance(sec);
		const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRJZCI6ImM5NjQ1Zjk0LTQ0ZmUtNDcxZi05MWE2LTdkMTQ5OTkwMjk0YyIsInVzZXJJZCI6IjE3NzVhYzYyLWNjZjgtNDA2ZC1hMjVjLTUzN2M5NDc3OTAxZCIsInRpbWVzdGFtcCI6MTU0MTU4NjIwMDU3MSwicGF5bG9hZCI6IntcInRlc3RcIjoxfSIsImNvbnRleHQiOiJ7XCJ0ZXN0XCI6MX0ifQ.AhHReeTatIy5FaL4TAhb6eshZg4UMiA5Ipk9TqSpbMQ';
		const data = await jws.verify(token);
		console.log(222, {data});
	} catch (e) {
		console.error(e);
	}
})();