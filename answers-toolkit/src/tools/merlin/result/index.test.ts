import { exceptionToResult } from './';
import { assert } from 'chai';
import { Result } from './index';
import { id } from '../common';
describe('ex to result', () => {
	it('should work if all good', () => {

		const fn = () => 2;
		const res = exceptionToResult(fn);
		const msg = res.match({
			Ok: () => 'ok',
			Err: () => 'err'
		});
		assert.equal(msg, 'ok');
	});

	it('should work if error', () => {
		const fn = () => {
			throw new Error('bob');
		};
		const res = exceptionToResult(fn);
		const msg = res.match({
			Ok: () => 'ok',
			Err: (e) => e.message
		});

		assert.equal(msg, 'bob');
	});
});

const mul2 = (a: number) => a * 2;
const add7 = (a: number) => a + 7;

describe('map', () => {
	it('should work when result is ok', () => {
		const res = Result.Ok(2);
		const num = res
			.map(mul2)
			.map(add7)
			.withDefault(-7);
		assert.equal(num, 11);
	});

	it('should work when result is err', () => {
		const res = Result.Err(2);
		const num = res
			.map(mul2 as any)
			.match({Ok : id, Err: id});
		assert.equal(num, 2);
	});
});

describe('sequence', () => {
	it('should turn list of results into result of list', () => {
		const nums = [1, 2, 3].map(Result.Ok);
		const seqed = Result.Seq(nums);

		assert.instanceOf(seqed, Result);
		assert.deepEqual(seqed.withDefault([]), [1, 2, 3]);
	});
});

describe('zipList', () => {
	it('should turn 2 results of lists into a result of them zipped', () => {
		const nums = Result.Seq([1, 2, 3].map(Result.Ok));
		const strs = Result.Seq(['a', 'b', 'c'].map(Result.Ok));
		const zipped = Result.ZipList(nums, strs);

		assert.instanceOf(zipped, Result);
		assert.deepEqual(zipped.withDefault([]), [[1, 'a'], [2, 'b'], [3, 'c']]);
	});
});
