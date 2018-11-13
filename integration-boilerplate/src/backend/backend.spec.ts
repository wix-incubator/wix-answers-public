import { assert } from 'chai';
import * as express from 'express';
import { createTestkit, IntegrationsTestkit } from 'wix-answers-integrations-testkit';
import { initAnswersApi } from './backend';

const testConfig = {
	answersIntegrationSecret: 'mXYjQ3DPRNK4tvrq-LFM2d5ZO5_M03yzvtvnxqrtsCI',
	apiPort: 3005,
	integrationId: '1234',
	baseUrl: 'http://localhost',
	ecryptKey: 'testssEXAMPLE',
	mongo: {
		mongoUrl: '',
		initDataDB: '',
		settingsDB: '',
	}
};

const baseUrl = `http://localhost:${testConfig.apiPort}/integration`;

const initConfig = {
	id: testConfig.integrationId,
	secret: testConfig.answersIntegrationSecret,
	scriptUrl: `${baseUrl}/script.js`,
	settingsUrl: `${baseUrl}/settings`,
	registerUrl: `${baseUrl}/register`,
	unregisterUrl: `${baseUrl}/unregister`
};

const payload = {
	keyId: 'myKeyId',
	secret: 'mySecret',
	host: 'test.wixamswers.com',
	tenantId: '123333221'
};

class TestMongoWrapper {
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
		dbDriver = new TestMongoWrapper();
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
