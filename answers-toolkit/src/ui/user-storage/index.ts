
export type UserStorage<Key> = {
	get: (key: Key) => Promise<any>
	set: (key: Key, value: any) => Promise<any>
};

export const createTestStorage = (map: any = {}) => {
	const storage: UserStorage<any> = {
		get: (key) => Promise.resolve(map[key]),
		set: (key, value) => {
			map[key] = value;
			return Promise.resolve(map[key]);
		}
	};

	return storage;
};
