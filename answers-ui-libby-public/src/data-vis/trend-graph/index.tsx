import * as React from 'react';
import { namespacedClassnames } from '../../common/namespace-classes';
import { BaseProps } from '../../common';
import { Point } from '../domain';
import { AreaChart, Area } from 'recharts';
import { calculateTrend } from './calc-trend';

export const TrendGraphKey = 'trend-graph';

export type TrendGraphProps = {
	value: Point[];
	color: string;
	height?: number;
	width?: number;
	disableAnimation?: boolean;
} & BaseProps;

export class TrendGraph extends React.PureComponent<TrendGraphProps> {
	private defaultHeight = 45;
	private defaultWidth = 185;
	private dataKey: keyof Point = 'y';

	render () {
		const {props} = this;
		const classNames = namespacedClassnames(TrendGraphKey, props.className);

		const width = this.props.width || this.defaultWidth;
		const height = this.props.height || this.defaultHeight;

		const trendData = calculateTrend(props.value);

		return (
			<AreaChart className={classNames} width={width} height={height} data={trendData}>
				<Area
					type='monotone'
					dataKey={this.dataKey}
					fill={props.color}
					fillOpacity={0.1}
					stroke={props.color}
					strokeWidth={2}
					isAnimationActive={!props.disableAnimation}
				/>
			</AreaChart>
		);
	}
}
