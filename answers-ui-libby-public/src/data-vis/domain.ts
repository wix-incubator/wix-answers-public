export type Point = {
	x: number,
	y: number
};

export type ChartLine = {
	id: string;
	name: string;
	color: string;
	values: Point[];
};

export type RechartsDataModel = {
	x: number;
} & {[lineId: string]: number};

export type RechartsMouseEventData = {
	isTooltipActive: boolean;
	activeCoordinate: {x: number, y: number};
	activeTooltipIndex: number;
};
