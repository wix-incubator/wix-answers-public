
export type ListenerRemoveFn = () => void;
export type ListenerHandler<T> = (item: T) => void;
export type ListenerAdder<T> = (cb: ListenerHandler<T>) => ListenerRemoveFn;

export type Emitter<T> = {
	addListener: ListenerAdder<T>;
	publish: (item: T) => void;
	getLast: () => T | undefined;
};

export const createEmitter = <T>(initial?: T): Emitter<T> => {
	let last: T | undefined = initial;
	let handlers: Array<ListenerHandler<T>> = [];
	return {
		addListener: (cb) => {
			handlers.push(cb);

			return () => {
				handlers = handlers.filter((h) => cb !== h);
			};
		},
		publish: (item) => {
			last = item;
			handlers.forEach((handler) => handler(item));
		},
		getLast: () => last
	};
};
