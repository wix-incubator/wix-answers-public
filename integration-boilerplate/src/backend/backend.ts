import { Router, Request, Response } from 'express';
import { jweInit, jwsInit } from '../answers-integration-utils';
import { getInjectedIntegrationScript } from '../script';
import * as bodyParser from 'body-parser';
import { MongoWrapper } from './database';

export type IntegrationConfig = {
	answersIntegrationSecret: string
	integrationId: string,
	baseUrl: string,
	ecryptKey: string,
	apiPort: number,
	mongo: {
		mongoUrl: string,
		initDataDB: string,
		settingsDB: string,
	}
};

export const initAnswersApi = async (app: Router, dbWrapper: MongoWrapper, config: IntegrationConfig) => {

	const jweInstance = await jweInit(config.answersIntegrationSecret);
	const jwsInstance = await jwsInit(config.answersIntegrationSecret);

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	app.post(`/integration/register`, async (req: Request, res: Response) => {
		const answersData = await jweInstance.decrypt(req.body.payload);
		const answersTenantId = answersData && answersData.tenantId;

		if (answersTenantId) {
			// add tenant integration data to DB

			await dbWrapper.registerTenant(answersData);
			res.send(answersTenantId);
		} else {
			res.status(400).send('');
		}
	});

	app.post(`/integration/unregister`, async (req: Request, res: Response) => {
		const answersData = await jweInstance.decrypt(req.body.payload);
		const answersTenantId = answersData && answersData.tenantId;

		if (answersTenantId) {
			// remove tenant integration data from DB
			await dbWrapper.removeTenant(answersData);
			res.send(answersTenantId);
		} else {
			res.status(400).send('');
		}
	});

	app.get(`/integration/settings`, async (req: Request, res: Response) => {
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
	});

	app.get(`/integration/script.js`, async (_: Request, res: Response) => {
		res.setHeader('Content-Type', 'application/javascript');
		res.send(getInjectedIntegrationScript(`${config.baseUrl}:${config.apiPort}/integration`,
			config.integrationId));
	});

	app.get(`/integration/view`, async (req: Request, res: Response) => {
		const answersData = await jwsInstance.verify(req.query.data);
		const answersTenantId = answersData && answersData.tenantId;

		if (answersTenantId) {
			// display ticket page iframe
			res.send('Ticket data: ' + JSON.stringify(answersData));
		} else {
			res.status(400).send('');
		}

	});

};
