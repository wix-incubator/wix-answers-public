import { isEmailValid } from ".";
import { assert } from "chai";

describe('Email validator', () => {
	it('validates email', () => {
		assert.equal(isEmailValid('bob@gtma.agency'), true);
		assert.equal(isEmailValid('bob@google.com'), true);
		assert.equal(isEmailValid('bob.bobs@google.com'), true);
		assert.equal(isEmailValid('bob-hello.a1@google.com'), true);
	});
});