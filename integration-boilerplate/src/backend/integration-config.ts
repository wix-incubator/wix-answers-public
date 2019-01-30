interface IntegrationData {
	ansSecret: string;
	[name: string]: string;
}

export interface IntegrationConfig {
	integrations: {
		integrationName: IntegrationData; // give your integration a name (kebab-case)
	};
	dbSecret: string;
	clientTopology: {
		staticsBaseUrl: string;
		baseUrl: string;
	};
	// bi: (req: any) => Logger; - TBD
}
