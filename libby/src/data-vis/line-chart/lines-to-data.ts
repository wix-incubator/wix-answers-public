import { ChartLine, RechartsDataModel } from '../domain';

// Recursivly converts chart lines to the vector format required by recharts data model
export const linesToData = (chartLines: ChartLine[]): RechartsDataModel[] => {
	if (chartLines.length === 1) {
		const line = chartLines[0];
		return line.values.map((val) => ({x: val.x, [line.id]: val.y}));
	} else if (chartLines.length === 0) {
		return [];
	} else {
		const partialRes = linesToData(chartLines.slice(1));
		const remainingLine = chartLines[0];

		const res = partialRes.map((item: any) => {
			const newItem = item;
			const maybeValue = remainingLine.values.find((v) => v.x === item.x);

			if (maybeValue) {
				newItem[remainingLine.id] = maybeValue.y;
			}

			return newItem;
		});

		return res;
	}
};
