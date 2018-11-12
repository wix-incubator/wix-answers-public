import { AvatarQueue } from '../types';

export class AvatarQueueBuilder {
	queue: AvatarQueue;

	constructor () {
		this.queue = {
			id: 'bboob0b0b0-boobob-21300321-0b0b0b',
			name: 'bob queue'
		};
	}

	withId (id: string) {
		this.queue.id = id;
		return this;
	}

	withName (name: string) {
		this.queue.name = name;
		return this;
	}

	build (): AvatarQueue {
		return this.queue;
	}
}
