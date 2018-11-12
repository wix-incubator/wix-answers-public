type Listener = (msg: any) => void;
type Listeners = {
	[key: string]: Listener[];
};

type MsgData = {
	key: string;
	msg: any;
};

export const createCrossTabNotifier = (window: Window) => {
	const ns = 'ans-cross-tab-beacon';
	const listeners: Listeners = {};

	let eventSet = false;

	const onEvent = (data: MsgData) => {
		const keyListeners = (listeners[data.key] || []);
		keyListeners.forEach((cb) => {
			try {
				cb(data.msg);
			} catch (e) {
				console.warn('error on tabs notifier listener for ', data.key);
			}
		});
	};

	const parseValue = (val: string | undefined): MsgData | undefined => {
		try {
			if (val) {
				return JSON.parse(val);
			} else {
				return undefined;
			}
		} catch (e) {
			return undefined;
		}
	};

	const init = () => {
		window.addEventListener('storage', (e) => {
			if (e.key === ns && e.newValue) {
				const parsedValue = parseValue(e.newValue);
				if (parsedValue) {
					onEvent(parsedValue);
				}
			}
		});
		eventSet = true;
	};

	return {
		emit: (key: string, msg: any) => {
			const item = {
				key,
				msg
			};
			try {
				const strItem = JSON.stringify(item);
				localStorage.setItem(ns, strItem);
			} catch (e) {
				console.warn('error emitting tabs notifier');
			}
		},
		listen: (key: string, cb: Listener) => {
			if (!eventSet) {
				init();
			}

			if (!listeners[key]) {
				listeners[key] = [];
			}
			listeners[key].push(cb);
			return () => {
				listeners[key] = listeners[key].filter((iCb) => iCb !== cb);
			};
		}
	};
};
