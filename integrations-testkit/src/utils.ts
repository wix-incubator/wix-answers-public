// tslint:disable-next-line:no-var-requires
const fp = require('find-free-port');
import * as jose from 'node-jose';
import chalk from 'chalk';

export const log = (...str: any[]) => {
	// tslint:disable-next-line:no-console
	console.log(chalk.cyan('[Answers integrations sandbox]'), ...str);
};

export const validateJwtTimestamp = (timestamp: number) => {
	const validTimeOffset = 1000 * 60 * 30; // 30 min
	return (timestamp + validTimeOffset) > Date.now();
};

export const jweInstance = async (k: string) => {
	const input = { kty: 'oct', alg: 'A256KW', enc: 'A256CBC-HS512', k };
	const key = await jose.JWK.asKey(input);

	return {
		encrypt: async (payload: any) => {
			const buffer = Buffer.from(JSON.stringify(payload));
			return jose.JWE.createEncrypt({ format: 'compact' }, key).update(buffer).final();
		},
		decrypt: async (token: any) => {
			const decrypted = await jose.JWE.createDecrypt(key).decrypt(token);
			const stringObj = Buffer.from(decrypted.payload).toString();
			const { timestamp } = JSON.parse(stringObj);

			if (!!timestamp && !validateJwtTimestamp(timestamp)) {
				throw Error('Expired token');
			} else {
				return JSON.parse(stringObj);
			}
		}
	};
};

export const jwsInstance = async (k: string) => {
	const input = { kty: 'oct', alg: 'HS256', k };
	const key = await jose.JWK.asKey(input);

	return {
		sign: async (payload: any) => {
			const buffer = Buffer.from(JSON.stringify(payload));
			return jose.JWS.createSign({ format: 'compact' }, key).update(buffer).final();
		},
		verify: async (token: any) => {
			const verified = await jose.JWS.createVerify(key).verify(token);
			const stringObj = Buffer.from(verified.payload).toString();
			const { timestamp } = JSON.parse(stringObj);

			if (!!timestamp && !validateJwtTimestamp(timestamp)) {
				throw Error('Expired token');
			} else {
				return JSON.parse(stringObj);
			}
		}
	};
};

export const getFreePort = async () => {
	const [port] = await fp(3000, 3900);
	return port;
};
