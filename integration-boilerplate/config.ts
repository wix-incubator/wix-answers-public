export default {
	answersApiSecret: 'YOUR_WIX_ANSWERS_API_SECRET',
	integrationId: 'YOUR_WIX_ANSWERS_INTEGRATION_ID',
	baseUrl: 'https://b01a5dd2.ngrok.io',
	ecryptKey: 'testssEXAMPLE',
	apiPort: 3000,
	routes: {
		path: 'answers/api',
		register: 'register',
		unregister: 'unregister',
		settings: 'settings',
		script: 'script.js',
		view: 'view',
	},
	mongo: {
		mongoUrl: 'mongodb://MONGO_URL',
		initDataDB: 'EXAMPLE-INIT',
		settingsDB: 'EXAMPLE-SETTINGS',
	}
};
