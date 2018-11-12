import { ListenerAdder, createEmitter } from './../../..';

export type BlockData = boolean;

export type NavBlocker = {
	block: () => void;
	unblock: () => void;
	reportBlocked: () => void;
	releaseBlock: () => void;
	setBlockReleaser: (cb: (bool: boolean) => void) => void;
	addListener: ListenerAdder<BlockData>;
	onBlocked: ListenerAdder<{}>;
	isBlocked: () => boolean
};

export const createNavBlocker = (): NavBlocker => {
	const blockedEmitted = createEmitter<{}>();
	const emitter = createEmitter<BlockData>();

	let blockReleaser = (_: boolean) => {
	//
	};

	const isBlocked = () => emitter.getLast() || false;

	return {
		block: () => {
			if (isBlocked()) {
				throw new Error('Navigation is already blocked.');
			} else {
				emitter.publish(true);
			}
		},
		unblock: () => {
			if (!isBlocked()) {
				throw new Error('Navigation is already unblocked.');
			} else {
				emitter.publish(false);
			}
		},
		reportBlocked: () => {
			blockedEmitted.publish({});
		},
		releaseBlock: () => {
			blockReleaser(true);
		},
		setBlockReleaser: (cb) => blockReleaser = cb,
		onBlocked: blockedEmitted.addListener,
		addListener: emitter.addListener,
		isBlocked
	};
};
