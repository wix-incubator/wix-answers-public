import { Point } from '../domain';

// Calculates the general trend graph into a domain of maximum size 10
export const calculateTrend = (data: Point[]): Point[] => {
	const dataValues = data.map((dataPoint) => dataPoint.y);
	const emptyBuckets: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

	const bucketSize = dataValues.length / emptyBuckets.length;
	const remainingCount = dataValues.length % emptyBuckets.length;

	const filledBuckets = bucketSize > 0 ? emptyBuckets.reduce((res, _, idx) => {
		const subValues = dataValues.slice(idx * bucketSize, (idx + 1) * bucketSize);
		if (subValues.length) {
			const avg = subValues.reduce((r, curr) => r + curr, 0) / subValues.length;
			return [...res, avg];
		} else {
			return res;
		}
	}, [] as number[]) : [0];

	const remainingBucket = remainingCount ?
		[dataValues.slice(-remainingCount).reduce((res, curr) => res + curr, 0) / remainingCount] : [];

	return [...filledBuckets, ...remainingBucket].map(((v, i) => ({x: i, y: v})));
};
