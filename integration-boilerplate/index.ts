import { initAnswersApi, MongoWrapper } from './src/backend';
import { setupConfig } from './setup-config';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { MongoClient } from 'mongodb';
import { IntegrationConfig } from './src/backend/integration-config';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// We connect to mongodb and initiate the integration entry
MongoClient.connect(setupConfig.mongo.mongoUrl, { poolSize: 10 }).then((client) => {
	const db = client.db();

	const integrationConfig: IntegrationConfig = {
		integrations: {
			integrationName: {
				ansSecret: setupConfig.answersIntegrationSecret
			}
		},
		dbSecret: setupConfig.ecryptKey,
		clientTopology: {
			staticsBaseUrl: setupConfig.staticsBaseUrl,
			baseUrl: setupConfig.baseUrl
		}
	};

	// Just a simple example of mongodb wrapper - you can change it
	const dbWrapper = new MongoWrapper({
		db,
		...setupConfig.mongo,
		ecryptKey: integrationConfig.dbSecret
	});

	// your integration path name
	const baseUrl = `/${setupConfig.integrationName}`;

	// init Answers API
	initAnswersApi(app, baseUrl, dbWrapper, integrationConfig);
});

// add your own rest api

app.listen(setupConfig.apiPort, () =>
	console.log(`App started, server url: ${setupConfig.baseUrl}:${setupConfig.apiPort}`));
