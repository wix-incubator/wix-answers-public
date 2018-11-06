import { getFreePort } from '../utils';
import * as express from 'express';

import * as bodyParser from 'body-parser';
import { integrationDataBuilder, ticketContextBuilder } from '../test-utils';
import { IntegrationData, IntegrationsTestkit, createTestkit } from '..';

export const startSandbox = async (forcePort?: number) => {

	const app = express();

	let integrationData: IntegrationData | null;
	let testkit: IntegrationsTestkit | null;

	app.use(bodyParser());
	app.get('/', async (_, res) => {
		const testValue = integrationDataBuilder();
		const testValueStr = JSON.stringify(testValue);
		const html = `<html>
		<h1>Setup Sandbox</h1>
		<textarea id="data" style="width: 442px; height: 251px;"></textarea>
		<button onclick="setup()">Setup</button>
		<script>
			const valToUse = localStorage.getItem('storedData') || JSON.stringify(${testValueStr}, null, 4);
			document.querySelector('#data').value = valToUse;

			setup = () => {
				const rawVal = document.querySelector('#data').value;
				const val = btoa(rawVal);
				localStorage.setItem('storedData', rawVal);
				location.href = '/setup/' + val;
			}
		</script>
		</html>`;
		res.send(html);
	});

	app.get('/please-setup', (_, res) => {
		res.send(`<h1>Please go <a href="/">to setup first</a>`);
	});

	app.post('/trigger-register/:tenantId', async (req, res, next) => {
		const {tenantId} = req.params;
		if (!testkit) {
			next(new Error('Teskit is not set up, please go to setup again'));
		} else {
			const data = await testkit.triggerRegister(tenantId);
			res.send({data});
		}
	});

	app.post('/trigger-unregister/:tenantId', async (req, res, next) => {
		const {tenantId} = req.params;
		if (!testkit) {
			next(new Error('Teskit is not set up, please go to setup again'));
		} else {
			const data = await testkit.triggerUnregister(tenantId);
			res.send({data});
		}
	});

	app.get('/settings-view/:tenantId', (req, res) => {
		const {tenantId} = req.params;
		if (!testkit) {
			res.send(`<h1>Please go <a href="/">to setup first</a>`);
		} else {
			const url = testkit.getRenderedSettingsUrl(tenantId);
			res.redirect(url);
		}
	});

	app.get('/pre-ticket-view', (_, res) => {
		const testValue = ticketContextBuilder();
		const testValueStr = JSON.stringify(testValue);

		if (!testkit) {
			res.send(`<h1>Please go <a href="/">to setup first</a>`);
		} else {
			const html = `<html>
			<h1>Ticket View Emulator</h1>
			<textarea id="data" style="width: 442px; height: 251px;"></textarea>
			<button onclick="accept()">Go</button>
			<script>
				document.querySelector('#data').value = JSON.stringify(${testValueStr}, null, 4);
				accept = () => {
					const val = btoa(document.querySelector('#data').value);
					location.href = '/ticket-view/' + val;
				}
			</script>
			</html>`;

			res.send(html);
		}
	});

	app.get('/ticket-view/:token', (req, res) => {
		const token = req.params.token;
		const data = JSON.parse(Buffer.from(token, 'base64').toString());
		if (!testkit) {
			res.send(`<h1>Please go <a href="/">to setup first</a>`);
		} else {
			const url = testkit.getTicketViewSandboxUrl(data);
			res.redirect(url);
		}
	});

	app.get('/setup/:data', async (req, res) => {
		try {
			const data = JSON.parse(Buffer.from(req.params.data, 'base64').toString());
			if (testkit) {
				await testkit.closeServer();
			}
			testkit = await createTestkit(data);
			integrationData = data;
			res.redirect('/menu');
		} catch (e) {
			res.status(400).send(e);
		}
	});

	app.get('/menu', async (_, res) => {

		if (!testkit || !integrationData) {
			res.redirect('/please-setup');
		} else {

			const html = `<html>
			<script>
				window.settings = () => {
					const tenantId = prompt('some tenant id', 'some-id');
					window.open('/settings-view/' + tenantId);
				}

				const post = url => {
					return fetch(url, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						}
					}).then(res => res.json())
					.then((res) => alert('ok - ' + res.data))
					.catch((e) => {
						alert('error!');
						console.error(e);
					});
				}

				window.register = () => post('/trigger-register/' + prompt('tenant id', 'some-id'));
				window.unregister = () => post('/trigger-unregister/' + prompt('tenant id', 'some-id'));

			</script>
			<h1>Sandbox Menu</h1>
			<h2>Loaded integration</h2>
			<pre>
				<code>${JSON.stringify(integrationData, null, 2)}</code>
			</pre>
			<ul>
				<li><button onclick="register()">Trigger register</button></li>
				<li><button onclick="unregister()">Trigger unregister</button></li>
				<li><button onclick="settings()">Trigger go to settings</button></li>
				<li><a href="/pre-ticket-view" target="_blank">Trigger go to ticket page</a></li>
				<li><a href="/">Redo setup</a></li>
			</ul>

			</html>`;
			res.send(html);
		}
	});

	const port: number = forcePort || await getFreePort();
	return {
		close: app.listen(port),
		url: 'http://localhost:' + port
	};
};
