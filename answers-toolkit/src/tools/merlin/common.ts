export const id: <T>(a: T) => T = (a) => a;

export const debugToStr = <T>(v: T): string => `${v}`;

export const setMap = <K, V>(m: Map<K, V>, k: K, val: V) => {
	const nm = new Map(m);
	nm.set(k, val);
	return nm;
};

export const mergeMap = <K, V>(m1: Map<K, V>, m2: Map<K, V>) => {
	const nm = new Map();
	m1.forEach((v, k) => {
		nm.set(k, v);
	});
	m2.forEach((v, k) => {
		nm.set(k, v);
	});
	return nm;
};
