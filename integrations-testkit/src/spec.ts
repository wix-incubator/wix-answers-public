import { assert } from 'chai';

// import {createServer} from 'http';
import { createTestkit } from '.';
import {
	integrationDataBuilder,
	dummyIntegration,
	integrationContextBuilder,
	webhookTicketPayloadBuilder,
	webhookReplyPayloadBuilder,
	ticketViewPayloadBuilder
} from './test-utils';
import { getFreePort } from './utils';
import * as puppeteer from 'puppeteer';
import { pupUniDriver } from 'unidriver/puppeteer';

// tslint:disable-next-line:no-var-requires

describe('testkit', () => {

	let cleanups: any[] = [];

	afterEach(async () => {
		await Promise.all(cleanups.map((fn) => fn()));
		cleanups = [];
	});

	it('calls register hook with the relevant encrypted payload', async () => {
		const port = await getFreePort();

		const registerUrl = `http://localhost:${port}/register`;
		const integrationData = integrationDataBuilder({ registerUrl });

		const stop = dummyIntegration(integrationData, port);
		cleanups.push(() => stop());

		const testkit = await createTestkit(integrationData);
		cleanups.push(() => testkit.closeServer());

		const data = integrationContextBuilder();

		const response = await testkit.triggerRegister(data);

		assert.equal(response, data.tenantId);
	});

	it('calls unregister hook with the relevant encrypted payload', async () => {
		const port = await getFreePort();

		const unregisterUrl = `http://localhost:${port}/unregister`;

		const integrationData = integrationDataBuilder({ unregisterUrl });

		const stop = dummyIntegration(integrationData, port);
		cleanups.push(stop);

		const testkit = await createTestkit(integrationData);
		cleanups.push(() => testkit.closeServer());

		const data = integrationContextBuilder();

		const response = await testkit.triggerUnregister(data.tenantId);

		assert.equal(response, data.tenantId);
	});

	it('exposes an url with the integration\'s settings visible', async () => {
		const port = await getFreePort();

		const settingsUrl = `http://localhost:${port}/settings`;

		const integrationData = integrationDataBuilder({ settingsUrl });

		const stop = dummyIntegration(integrationData, port);
		cleanups.push(() => stop());

		const testkit = await createTestkit(integrationData);

		const tenantId = 'bob';
		cleanups.push(() => testkit.closeServer());

		const browser = await puppeteer.launch();
		cleanups.push(() => browser.close());
		const renderedSettingsUrl = await testkit.getRenderedSettingsUrl(tenantId);

		// the dummy integration will simply render the tenant id as the settings view
		const page = await browser.newPage();
		await page.goto(renderedSettingsUrl);

		const frame = page.frames().find((f) => f.name() === 'settings') as any;
		// to simulate real world the testkit embeds the settings in an iframe
		const driver = pupUniDriver(() => frame.$('body'));
		assert.include(await driver.$('h2').text(), tenantId);
	});

	it('exposes an url with a ticket view sandbox', async () => {
		const port = await getFreePort();

		const settingsUrl = `http://localhost:${port}/settings`;

		const tenantId = 'some-id';

		const integrationData = integrationDataBuilder({
			settingsUrl,
			ticketSidebar: {
				title: 'Example Sidebar',
				url: `http://localhost:${port}/view/`
			}
		});

		const stop = dummyIntegration(integrationData, port);
		cleanups.push(() => stop());

		const testkit = await createTestkit(integrationData);
		cleanups.push(() => testkit.closeServer());

		const browser = await puppeteer.launch();
		cleanups.push(() => browser.close());
		const payload = ticketViewPayloadBuilder();
		const ticketView = await testkit.getTicketViewSandboxUrl({ payload, tenantId });

		// the dummy integration will listen to the sdk and add an iframe to the sidebar with the tenant id
		const page = await browser.newPage();
		// page.on('console', (bob) => console.log('pup console', bob));
		await page.goto(ticketView);

		await (new Promise((res) => {
			setTimeout(res, 100);
		}));

		const frame = page.frames().find((f) => f.name() === 'view') as any;
		// to simulate real world the testkit embeds the settings in an iframe
		const driver = pupUniDriver(() => frame.$('body'));
		assert.include(await driver.$('h2').text(), payload.userEmail);
		assert.include(await driver.$('h2').text(), tenantId);

	}).timeout(10000);

	it('calls ticket-created hook with the relevant encrypted payload', async () => {
		const port = await getFreePort();

		const ticketWebhookUrl = `http://localhost:${port}/webhook/ticket-created`;
		const integrationData = integrationDataBuilder({ webhooks: { TICKET_CREATED: ticketWebhookUrl } });

		const stop = dummyIntegration(integrationData, port);
		cleanups.push(() => stop());

		const testkit = await createTestkit(integrationData);
		cleanups.push(() => testkit.closeServer());

		const data = webhookTicketPayloadBuilder({ tenantId: integrationData.id });

		const response = await testkit.triggerTicketCreated(data);

		assert.deepEqual(response, data);
	});

	it('calls reply-created hook with the relevant encrypted payload', async () => {
		const port = await getFreePort();

		const replyWebhookUrl = `http://localhost:${port}/webhook/reply-created`;
		const integrationData = integrationDataBuilder({ webhooks: { REPLY_CREATED: replyWebhookUrl} });

		const stop = dummyIntegration(integrationData, port);
		cleanups.push(() => stop());

		const testkit = await createTestkit(integrationData);
		cleanups.push(() => testkit.closeServer());

		const data = webhookReplyPayloadBuilder({ tenantId: integrationData.id });

		const response = await testkit.triggerReplyCreated(data);

		assert.deepEqual(response, data);
	});
});
