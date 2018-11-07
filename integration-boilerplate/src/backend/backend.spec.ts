import { assert } from 'chai';
import * as express from 'express';
import { createTestkit, IntegrationsTestkit } from 'wix-answers-integrations-testkit';
import { initAnswersApi } from './backend';

const testConfig = {
	answersApiSecret: 'mXYjQ3DPRNK4tvrq-LFM2d5ZO5_M03yzvtvnxqrtsCI',
	apiPort: 3004,
	integrationId: '1234',
	baseUrl: 'http://localhost',
	ecryptKey: 'testssEXAMPLE',
	routes: {
		path: 'answers/api',
		register: 'register',
		unregister: 'unregister',
		settings: 'settings',
		script: 'script.js',
		view: 'view',
	},
	mongo: {
		mongoUrl: '',
		initDataDB: '',
		settingsDB: '',
	}
};

const baseUrl = `http://localhost:${testConfig.apiPort}/${testConfig.routes.path}`;

const initConfig = {
	id: testConfig.integrationId,
	secret: testConfig.answersApiSecret,
	scriptUrl: `${baseUrl}/${testConfig.routes.script}`,
	settingsUrl: `${baseUrl}/${testConfig.routes.settings}`,
	registerUrl: `${baseUrl}/${testConfig.routes.register}`,
	unregisterUrl: `${baseUrl}/${testConfig.routes.unregister}`
};

const payload = {
	keyId: 'myKeyId',
	secret: 'mySecret',
	host: 'test.wixamswers.com',
	tenantId: '123333221'
};

class MongoWrapper {
	initDB = {};
	settingsDB = {};
	registerTenant = async (data): Promise<any> => {
		if (!this.initDB[data.tenantId]) {
			this.initDB[data.tenantId] = data;
			return data.tenantId;
		}
		return;
	}
	dangerouslyGetAppKeys = async (tenantId: string) => this.initDB[tenantId] && delete this.initDB[tenantId];

	// ****** INTEGRATION SETTINGS AREA ******/
	saveSettingsPerTenant = async (id, data) => {
		this.settingsDB[id] = data;
		return id;
	}
	getSettingsPerTenant = (id: string) => {
		return this.settingsDB[id];
	}

	// ****** DELETE INTEGRATION ******/
	removeTenant = (data) => this.initDB[data.tenantId]
		&& delete this.initDB[data.tenantId]
		&& delete this.settingsDB[data.tenantId]
}

describe('Integration ', () => {

	const app = express();

	let testkit: IntegrationsTestkit;
	let server;
	let dbDriver;

	before(async () => {
		dbDriver = new MongoWrapper();
		testkit = await createTestkit(initConfig);
		await initAnswersApi(app, dbDriver, testConfig);
		server = app.listen(testConfig.apiPort);
	});

	it('Should register user', async () => {
		const res = await testkit.triggerRegister(payload);

		assert.equal(res, payload.tenantId);
		assert.exists(dbDriver.initDB[payload.tenantId]);
	});

	it('Should unregister user', async () => {
		const res = await testkit.triggerUnregister(payload.tenantId);

		assert.equal(res, payload.tenantId);
		assert.notExists(dbDriver.initDB[payload.tenantId]);
	});

	after(async () => {
		await server.close();
		await testkit.closeServer();
		dbDriver = undefined;
	});
});
