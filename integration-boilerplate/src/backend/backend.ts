import { Router, Request, Response } from 'express';
import { jweInit, jwsInit } from '../answers-integration-utils';
import { MongoWrapper } from './database';
import { IntegrationConfig } from './integration-config';
import bodyParser = require('body-parser');

// tslint:disable-next-line:max-line-length
export const initAnswersApi = async (app: Router, baseUrl: string, dbWrapper: MongoWrapper, config: IntegrationConfig) => {
	const jweInstance = await jweInit(config.integrations.integrationName.ansSecret);
	const jwsInstance = await jwsInit(config.integrations.integrationName.ansSecret);

	app.use(bodyParser.json());

	app.post(`${baseUrl}/register`, async (req: Request, res: Response) => {
		// token decryption may fail so we wrap it in try
		try {
			const answersData = await jweInstance.decrypt(req.body.payload);
			const answersTenantId = answersData && answersData.tenantId;

			if (answersTenantId) {
				// add tenant integration data to DB

				await dbWrapper.registerTenant(answersData);
				res.send(answersTenantId);
			} else {
				res.status(400).send('');
			}
		} catch (e) {
			res.status(400).send(e.message);
		}
	});

	app.post(`${baseUrl}/unregister`, async (req: Request, res: Response) => {
		// token decryption may fail so we wrap it in try
		try {
			const answersData = await jweInstance.decrypt(req.body.payload);
			const answersTenantId = answersData && answersData.tenantId;

			if (answersTenantId) {
				// remove tenant integration data from DB
				await dbWrapper.removeTenant(answersData);
				res.send(answersTenantId);
			} else {
				res.status(400).send('');
			}
		} catch (e) {
			res.status(400).send(e.message);
		}
	});

	app.get(`${baseUrl}/settings`, async (req: Request, res: Response) => {
		// token verification may fail so we wrap it in try
		try {

			const answersData = await jwsInstance.verify(req.query.data);
			const answersTenantId = answersData && answersData.tenantId;

			if (answersTenantId) {
				// render settings page

				const settings = await dbWrapper.getSettingsPerTenant(answersTenantId);

				res.send(`
				<html>
				<head>
				<script>
				function closeModal() {
					window.parent.postMessage({
						type: "ans-msg",
						cmd: "close-modal"
					}, "*");
				}

				function showNotification() {
					window.parent.postMessage({
						type: "ans-msg",
						cmd: "notify",
						data: "your notification text goes here"
					}, "*");
				}
				</script>
				</head>
				<body>
				Settings page, your saved settings for tenant: ${answersTenantId}
				<br />
				are:
				<br />
				${JSON.stringify(settings)}
				<br />
				<button onclick="closeModal()">Close Modal</button>
				<button onclick="showNotification()">Pop notification</button>
				</body>
				</html>`);
			} else {
				res.status(400).send('');
			}
		} catch (e) {
			res.status(400).send(e.message);
		}
	});

	app.get(`${baseUrl}/view`, async (req: Request, res: Response) => {
		// token verification may fail so we wrap it in try
		try {
			const answersData = await jwsInstance.verify(req.query.data);
			const answersTenantId = answersData && answersData.tenantId;

			if (answersTenantId) {
				// display ticket page iframe
				res.send('Ticket data: ' + JSON.stringify(answersData));
			} else {
				res.status(400).send('');
			}
		} catch (e) {
			res.status(400).send(e.message);
		}

	});

	app.post(`${baseUrl}/webhooks/ticket-created`, async (req: Request, res: Response) => {
		// token verification may fail so we wrap it in try
		try {
			const { payload } = req.body;

			try {
				const verified = await jwsInstance.verify(payload);

				// tslint:disable-next-line:no-console
				console.log(verified);

				res.json(verified);

			} catch (e) {
				// tslint:disable-next-line:no-console
				console.log(e.message);

				res.status(400).send(e.message);
			}
		} catch (e) {
			res.status(400).send(e.message);
		}
	});

	app.post(`${baseUrl}/webhooks/reply-created`, async (req: Request, res: Response) => {
		// token verification may fail so we wrap it in try
		try {
			const { payload } = req.body;
			try {
				const verified = await jwsInstance.verify(payload);
				// tslint:disable-next-line:no-console
				console.log(verified);

				res.json(verified);

			} catch (e) {
				res.status(400).send(e.message);
			}
		} catch (e) {
			res.status(400).send(e.message);
		}
	});
};
