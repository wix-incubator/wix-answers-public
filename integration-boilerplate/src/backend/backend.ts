import { Router, Request, Response } from 'express';
import { jweInit, jwsInit, initCache } from '../answers-integration-utils';
import { MongoWrapper } from './database';
import { IntegrationConfig } from './integration-config';
import bodyParser = require('body-parser');

export const ONE_MINUTE = 1000 * 60;

// tslint:disable-next-line:max-line-length
export const initAnswersApi = async (app: Router, baseUrl: string, dbWrapper: MongoWrapper, config: IntegrationConfig) => {
	const { integrationId, ansSecret} = config.integrations.integrationName;

	const jweInstance = await jweInit(ansSecret);
	const jwsInstance = await jwsInit(ansSecret);

	const cacheDriver = {
		metadata: initCache<string>({limit: 150, maxTTL: ONE_MINUTE * 60 * 2}), // 2 hours
		userData: initCache<string>({limit: 300, maxTTL: ONE_MINUTE * 2}) // 2 min
	};

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

				let thirdPartyMetaData;
				// We'll check if we have the third party integration metadata cached, if not, we'll fetch it
				const cachedMetadata = cacheDriver.metadata.get(answersTenantId, integrationId);
				if (cachedMetadata) {
					thirdPartyMetaData = cachedMetadata;
				} else {
					// no cached data/expired - refetch data
					thirdPartyMetaData = `Test third party metadata`;
					cacheDriver.metadata.set(answersTenantId, integrationId, thirdPartyMetaData);
				}

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
				Metadata:
				<br />
				${JSON.stringify(thirdPartyMetaData)}
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

	app.get(`${baseUrl}/ticket-view`, async (req: Request, res: Response) => {
		// token verification may fail so we wrap it in try
		try {
			const answersData = await jwsInstance.verify(req.query.data);
			const answersTenantId = answersData && answersData.tenantId;

			if (answersTenantId) {
				let thirdPartyData;

				// We'll check if we have the third party integration data cached, if not, we'll fetch it
				const cachedViewData = cacheDriver.userData.get(answersTenantId, integrationId);
				if (cachedViewData) {
					thirdPartyData = cachedViewData;
				} else {
					// no cached data/expired - refetch data
					thirdPartyData = 'Test third party data';
					cacheDriver.userData.set(answersTenantId, integrationId, thirdPartyData);
				}

				// display ticket page iframe
				res.send('Ticket data: ' + JSON.stringify(answersData) + '\n Third party data: ' + thirdPartyData);
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
