import { PhoneLine } from '../';

export class PhoneLineBuilder {
	line: PhoneLine;

	constructor () {
		this.line = {
			id: 'b0bb0b0b-b0b0-b0b0-b0b0-b0bb0bb0bb0b',
			phoneNumber: '+9999999999999',
			name: 'bob'
		};
	}

	withPhoneNumber (phoneNumber: string) {
		this.line.phoneNumber = phoneNumber;
		return this;
	}

	withId (id: string) {
		this.line.id = id;
		return this;
	}

	withName (name: string) {
		this.line.name = name;
		return this;
	}

	build (): PhoneLine {
		return this.line;
	}
}
