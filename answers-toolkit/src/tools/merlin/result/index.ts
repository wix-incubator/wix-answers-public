import { id } from '../common';
export class Box<T> {
	constructor (private readonly value: T) {}
	open () {
		return this.value;
	}
}

export type MapFn<A, B> = (v: A) => B;
export type BindFn<A, B, K> = (v: A) => Result<B, K>;

const zip = <A, B>(l1: A[], l2: B[]): Array<[A, B]> => {
	if (l1.length) {
		const [h1, ...t1] = l1;
		const [h2, ...t2] = l2;
		const hp = [h1, h2] as [A, B];
		return [hp, ...zip(t1, t2)];
	} else {
		return [];
	}
};

// tslint:disable-next-line:max-classes-per-file
export class Result<T, K = Error> {

	static Ok = <T, K>(val: T) => {
		return new Result<T, K>(new Ok(val));
	}

	static Err = <T, K>(err: K) => {
		return new Result<T, K>(new Err(err));
	}

	static isOk = <T, K>(val: Ok<T> | Err<K>): val is Ok<T> => {
		return val instanceof Ok;
	}

	static Seq = <T, K>(resList: Array<Result<T, K>>): Result<T[], K> => {
		return resList.reduce<Result<T[], K>>((prev, curr) => {
			return curr.bind((val) => {
				return prev.map((list) => [...list, val]);
			});
		}, Result.Ok<T[], K>([]));
	}

	static ZipList = <A, B, K> (list1: Result<A[], K>, list2: Result<B[], K>): Result<Array<[A, B]>, K> => {
		return list1.bind((l1) => {
			return list2.map((l2) => zip(l1, l2));
		});
	}

	constructor (private readonly value: Ok<T> | Err<K>) {}

	map = <B>(fn: MapFn<T, B>): Result<B, K> => {
		const val = this.value;
		if (Result.isOk<T, K>(val)) {
			const mapped = new Ok(fn(val.open()));
			return new Result<B, K>(mapped);
		} else {
			return new Result<B, K>(val);
		}
	}

	mapError = <Q>(fn: MapFn<K, Q>): Result<T, Q> => {
		return this.match({
			Ok: (val) => Result.Ok(val),
			Err: (err) => Result.Err(fn(err))
		});
	}

	bind = <B>(fn: BindFn<T, B, K>): Result<B, K> => {
		const val = this.value;
		if (Result.isOk<T, K>(val)) {
			const mapped: Result<B, K> = fn(val.open());
			return mapped;
		} else {
			return new Result<B, K>(val);
		}
	}

	match = <R> (fn: ResultPattern<T, K, R>): R => {
		const val = this.value;
		if (Result.isOk<T, K>(val)) {
			return fn.Ok(val.open());
		} else {
			return fn.Err(val.open());
		}
	}

	withDefault = (def: T) => {
		return this.match({
			Ok: id,
			Err: () => def
		});
	}
}

// tslint:disable-next-line:max-classes-per-file
export class Ok<T> extends Box<T> {}
// tslint:disable-next-line:max-classes-per-file
export class Err<T> extends Box<T> {}

// export type Result<T, K = Error> = Ok<T> | Err<K>;

export type ResultPattern<S, E, T> = {
	Ok: (s: S) => T;
	Err: (e: E) => T;
};

export type MatchResultFn<S, E, T> =  (result: Result<S, E>, p: ResultPattern<S, E, T>) => T;

// utils
export const exceptionToResult = <T>(fn: () => T): Result<T, Error> => {
	try {
		return Result.Ok<T, Error>(fn());
	} catch (e) {
		return Result.Err<T, Error>(e);
	}
};
