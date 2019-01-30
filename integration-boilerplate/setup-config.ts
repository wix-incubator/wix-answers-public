export type SetupConfig = {
	integrationName: string
	answersIntegrationSecret: string
	integrationId: string,
	staticsBaseUrl: string,
	baseUrl: string,
	ecryptKey: string,
	apiPort: number,
	mongo: {
		mongoUrl: string,
		initDataDB: string,
		settingsDB: string,
	}
};

export const setupConfig: SetupConfig = {
	integrationName: 'my-integration',
	answersIntegrationSecret: 'abcdefabcdefabcdefabcdefabcdefabcdefabcdefa', // Your wix answers api secret
	integrationId: 'YOUR_WIX_ANSWERS_INTEGRATION_ID',
	staticsBaseUrl: 'https://b01a5dd2.ngrok.io/statics',
	baseUrl: 'http://localhost',
	ecryptKey: 'testssEXAMPLE',
	apiPort: 3000,
	mongo: {
		mongoUrl: 'mongodb://borisd9:wixpress1@ds233541.mlab.com:33541/ans-integrations',
		initDataDB: 'EXAMPLE-INIT',
		settingsDB: 'EXAMPLE-SETTINGS',
	}
};
