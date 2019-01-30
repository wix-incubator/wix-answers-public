import * as jose from 'node-jose';

export const jweInit = async (k: string) => {
	const input = { kty: 'oct', alg: 'A256KW', enc: 'A256CBC-HS512', k };
	const key = await jose.JWK.asKey(input);

	return {
		encrypt: async (payload: any) => {
			return jose.JWE.createEncrypt({ format: 'compact' }, key).update(payload).final();
		},
		decrypt: async (token: any) => {
			const decrypted = await jose.JWE.createDecrypt(key).decrypt(token);
			const stringObj = Buffer.from(decrypted.payload).toString();
			return JSON.parse(stringObj);
		}
	};
};

export const jwsInit = async (k: string) => {
	const input = { kty: 'oct', alg: 'HS256', k };
	const key = await jose.JWK.asKey(input);

	return {
		sign: async (payload: any) => {
			return jose.JWS.createSign({ format: 'compact' }, key).update(payload).final();
		},
		verify: async (token: any) => {
			const verified = await jose.JWS.createVerify(key).verify(token);
			const stringObj = Buffer.from(verified.payload).toString();
			return JSON.parse(stringObj);
		}
	};
};
