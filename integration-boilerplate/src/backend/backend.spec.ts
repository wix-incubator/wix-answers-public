import { assert } from 'chai';
import * as express from 'express';
import { createTestkit, IntegrationsTestkit } from 'wix-answers-integrations-testkit';
import { initAnswersApi } from './backend';
import { IntegrationConfig } from './integration-config';
import { SetupConfig } from '../../setup-config';

const testConfig: SetupConfig = {
	integrationName: 'my-integration',
	answersIntegrationSecret: 'mXYjQ3DPRNK4tvrq-LFM2d5ZO5_M03yzvtvnxqrtsCI',
	apiPort: 3005,
	integrationId: '1234',
	staticsBaseUrl: 'http://localhost:3200',
	baseUrl: 'http://localhost',
	ecryptKey: 'testssEXAMPLE',
	mongo: {
		mongoUrl: '',
		initDataDB: 'init-db',
		settingsDB: 'settings-db',
	}
};

const baseUrl = `${testConfig.baseUrl}:${testConfig.apiPort}/${testConfig.integrationName}`;

const initConfig = {
	id: testConfig.integrationId,
	secret: testConfig.answersIntegrationSecret,
	scriptUrl: `${baseUrl}/script.js`,
	settingsUrl: `${baseUrl}/settings`,
	registerUrl: `${baseUrl}/register`,
	unregisterUrl: `${baseUrl}/unregister`,
	webhooks: {
		TICKET_CREATED: `${baseUrl}/webhooks/reply-created`,
		REPLY_CREATED: `${baseUrl}/webhooks/ticket-created`
	}
};

const payload = {
	keyId: 'myKeyId',
	secret: 'mySecret',
	host: 'test.wixamswers.com',
	tenantId: '123333221'
};

const mockTicketData = {
	tenantId: 'w-w-w-w-w',
	timestamp: 1542796597564,
	payload:
	{
		id: 'bob7',
		subject: 'dfgdfg',
		user: { email: 'david@rahel.com', fullName: 'David Rahel' },
		content: '',
		channel: 130,
		status: 100,
		priority: 20,
		url: '',
		assignedUser: { email: 'amit@huli.com', fullName: 'Amit Huli' }
	}
};

const mockReplyData = {
	tenantId: 'w-w-w-w-w',
	payload:
	{
		id: 'bob7',
		user: { email: 'david@rahel.com', fullName: 'David Rahel' },
		parentTicket: mockTicketData.payload
	}
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
	getTenantAppKeys = async (tenantId: string) => this.initDB[tenantId] && delete this.initDB[tenantId];

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

describe('Integration ', async () => {
	const app = express();

	let testkit: IntegrationsTestkit;
	let server;
	let dbDriver;

	const integrationConfig: IntegrationConfig = {
		integrations: {
			integrationName: {
				ansSecret: testConfig.answersIntegrationSecret
			}
		},
		dbSecret: testConfig.ecryptKey,
		clientTopology: {
			staticsBaseUrl: testConfig.staticsBaseUrl,
			baseUrl: testConfig.baseUrl
		}
	};

	before(async () => {
		dbDriver = new TestMongoWrapper();
		testkit = await createTestkit(initConfig);
		await initAnswersApi(app, `/${testConfig.integrationName}`, dbDriver, integrationConfig);
		server = app.listen(testConfig.apiPort);
	});

	it('Trigger register user', async () => {
		const res = await testkit.triggerRegister(payload);

		assert.equal(res, payload.tenantId);
		assert.exists(dbDriver.initDB[payload.tenantId]);
	});

	it('Trigger ticket-created webhook', async () => {
		const res = await testkit.triggerTicketCreated(mockTicketData);

		assert.deepEqual(res, mockTicketData);
	});

	it('Trigger reply-created webhook', async () => {
		const res = await testkit.triggerReplyCreated(mockReplyData);

		assert.deepEqual(res, mockReplyData);
	});

	it('Trigger unregister user', async () => {
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
