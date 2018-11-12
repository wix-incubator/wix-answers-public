import { AvatarGroup } from '../types';

export class AvatarGroupBuilder {
	group: AvatarGroup;

	constructor () {
		this.group = {
			id: 'bboob0b0b0-boobob-21300321-0b0b0b',
			name: 'bob group'
		};
	}

	withId (id: string) {
		this.group.id = id;
		return this;
	}

	withName (name: string) {
		this.group.name = name;
		return this;
	}

	build (): AvatarGroup {
		return this.group;
	}
}
