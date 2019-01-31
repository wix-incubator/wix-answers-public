import * as safeMemoryCache from 'safe-memory-cache';

export const ONE_MINUTE = 1000 * 60;

export interface CacheOptions {
	limit: number;
	maxTTL: number;
}

export interface CacheDriver<T> {
	get: (tenantId: string, integrationId: string) => T | undefined;
	set: (tenantId: string, integrationId: string, data: T) => void;
}

export const initCache = <T>(options: CacheOptions): CacheDriver<T> => {
	const cache = safeMemoryCache(options);

	return {
		get: (tenantId, integrationId) => {
			return cache.get(`integration-data-${tenantId}-${integrationId}`);
		},
		set: (tenantId, integrationId: string, data) => {
			return cache.set(`integration-data-${tenantId}-${integrationId}`, data);
		}
	};
};
