import { LabelData } from '../types';

export class LabelDataBuilder {
	label: LabelData;

	constructor () {
		this.label = {
			id: '12312-boobob-21300321-0b0b0b',
			name: 'bob label'
		};
	}

	withId (id: string) {
		this.label.id = id;
		return this;
	}

	withName (name: string) {
		this.label.name = name;
		return this;
	}

	build (): LabelData {
		return this.label;
	}
}
