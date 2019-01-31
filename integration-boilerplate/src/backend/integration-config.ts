interface IntegrationData {
	id: string;
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
	};
	// bi: (req: any) => Logger; - TBD
}
