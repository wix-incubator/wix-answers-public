import { Db } from 'mongodb';
import * as Cryptr from 'cryptr';
import { IntegrationRegisterContext } from 'wix-answers-integrations-testkit';

export type MongoWrapperConfig = {
	db: Db;
	ecryptKey: string,
	initDataDB: string,
	settingsDB: string,
};

export class MongoWrapper {
	config: MongoWrapperConfig;

	// the wix answers cerds database
	private initCollection;

	// the integration settings
	private settingsCollection;

	// for security reasons we will encrypt the integrations key id & secret
	private cryptr: Cryptr;

	constructor (config: MongoWrapperConfig) {
		this.config = config;
		this.cryptr = new Cryptr(config.ecryptKey);

		this.initCollection = config.db.collection(config.initDataDB);
		this.settingsCollection = config.db.collection(config.settingsDB);
	}

	// ****** WIX ANSWERS CERDS AREA ******/
	registerTenant = async (data: IntegrationRegisterContext): Promise<any> => {
		const exists = await this.initCollection.findOne({ _id: data.tenantId });
		if (!exists) {
			const encryptedApiKey = this.cryptr.encrypt(data.keyId);
			const encryptedApiSecret = this.cryptr.encrypt(data.secret);

			return this.initCollection
				.insertOne({ _id: data.tenantId, apiKey: encryptedApiKey, apiSecret: encryptedApiSecret, host: data.host });
		} else {
			throw new Error(`Double init for tenant ${data.tenantId}`);
		}
	}
	getTenantAppKeys = async (tenantId: string): Promise<any> => this.initCollection.findOne({ _id: tenantId });

	// ****** INTEGRATION SETTINGS AREA ******/
	saveSettingsPerTenant = async (id: string, data: object): Promise<any> => {
		const exists = await this.settingsCollection.findOne({ _id: id });
		if (!exists) {
			return this.settingsCollection.insert({ _id: id, data });
		} else {
			return this.settingsCollection.updateOne({ _id: id }, { $set: { data } });
		}
	}
	getSettingsPerTenant = (id: string): Promise<any> => {
		try {
			return this.settingsCollection.findOne({ _id: id }).then((res) => res && res.data || {});
		} catch (e) {
			throw new Error(`Error getting saved settings for tenant id ${id} error: - ${e.message}`);
		}
	}

	// ****** DELETE INTEGRATION ******/
	removeTenant = (data: IntegrationRegisterContext): Promise<any> => Promise.all([
		this.initCollection.remove({ _id: data.tenantId }),
		this.settingsCollection.remove({ _id: data.tenantId })
	])
}
