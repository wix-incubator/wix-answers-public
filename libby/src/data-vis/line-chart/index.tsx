import * as React from 'react';
import { namespacedClassnames } from '../../common/namespace-classes';
import { BaseProps } from '../../common';
import { ChartLine, RechartsDataModel, RechartsMouseEventData } from '../domain';
import {XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, AreaChartProps} from 'recharts';
import { linesToData } from './lines-to-data';

export const LineChartKey = 'line-chart';

export type LineChartProps = {
	lines: ChartLine[];
	width?: number;
	height?: number;
	bottomTooltipLabel?: (x: number, value?: number) => string | JSX.Element;
	topTooltipLabel?: (x: number, value?: number) => string | JSX.Element;
	xAxisTickLabel?: (x: number) => string;
	yAxisTickLabel?: (y: number) => string;
} & BaseProps;

export type LineChartState = {
	activeDataIndex: number | undefined;
	tooltipXCoordinate: number;
	rechartsData: RechartsDataModel[];
};

export class LineChart extends React.PureComponent<LineChartProps, LineChartState> {
	state: LineChartState = {
		activeDataIndex: undefined,
		tooltipXCoordinate: 0,
		rechartsData: linesToData(this.props.lines)
	};

	private lastAddedLineIds: string[] = this.props.lines.map((l) => l.id);
	private isChangingLineCount = false;

	private colors = {
		white: '#fff',
		strokeGrey: '#dfe5eb',
		tickGrey: '#9aa9be',
		darkBlue: '#577083'
	};

	componentWillReceiveProps (nextProps: LineChartProps) {
		const newLines = nextProps.lines;
		const currLineIds = this.props.lines.map((l) => l.id);

		this.lastAddedLineIds = newLines.filter((l) => currLineIds.indexOf(l.id) === -1).map((l) => l.id);
		this.isChangingLineCount = nextProps.lines.length !== this.props.lines.length;

		const rechartsData = linesToData(nextProps.lines);
		this.setState({rechartsData});
	}

	handleMouseMove = (data: RechartsMouseEventData) => {
		if (!data.isTooltipActive) {
			this.setState({activeDataIndex: undefined});
		} else if (data.activeTooltipIndex >= 0) {
			this.setState({activeDataIndex: data.activeTooltipIndex, tooltipXCoordinate: data.activeCoordinate.x});
		}
	}

	handleMouseLeave = () => this.setState({activeDataIndex: undefined});

	renderChartLines = () => {
		return this.props.lines.map((line) => (
			<Area
				type='monotone'
				key={line.id}
				dataKey={line.id}
				stroke={line.color}
				strokeWidth='2'
				fillOpacity='0.1'
				fill={line.color}
				activeDot={{r: 5, stroke: line.color, fill: this.colors.white, strokeWidth: 2} as any}
				isAnimationActive={(this.lastAddedLineIds.indexOf(line.id) > -1) || !this.isChangingLineCount}
			/>
		));
	}

	renderBottomTooltip = (data: RechartsDataModel[]) => {
		const {state, props} = this;
		if (state.activeDataIndex === undefined) {
			return null;
		}

		const ttBottomStyle: any = {
			transform: `translateX(${state.tooltipXCoordinate}px) translateX(-50%) translateY(-56px)`,
		};

		return props.bottomTooltipLabel && data[state.activeDataIndex] ? (
			<div className='line-chart-vertical-tooltip bottom' style={ttBottomStyle}>
				{props.bottomTooltipLabel(data[state.activeDataIndex].x)}
			</div>
		) : null;
	}

	renderTopTooltip = (data: any) => {
		const {state, props} = this;

		if (state.activeDataIndex === undefined) {
			return null;
		}

		const ttStyle: any = {
			transform: `translateX(${state.tooltipXCoordinate}px) translateX(-50%)`,
		};

		const activeX = state.activeDataIndex >= 0 ? data[state.activeDataIndex].x : null;
		const shouldShowIndicator = this.props.lines.length > 1;

		const topTooltipItems = activeX && props.topTooltipLabel ? this.props.lines.map((line) => {
			const maybeValue = line.values.find((value) => value.x === activeX);
			const valueForLine = maybeValue ? maybeValue.y : undefined;

			return (
				<div key={line.id} className='top-tooltip-item'>
					{shouldShowIndicator ? <div className='line-indicator' style={{background: line.color}}/> : null}
					{props.topTooltipLabel!(activeX, valueForLine)}
				</div>
			);
		}) : null;

		return (
			<div className='line-chart-vertical-tooltip top' style={ttStyle}>
				{topTooltipItems}
			</div>
		);
	}

	render () {
		const {props, state} = this;
		const rechartsData = state.rechartsData;

		const classNames = namespacedClassnames(LineChartKey, props.className, {'is-multi-line': props.lines.length > 1});

		const areaChartMargin = {top: 10, right: 10, bottom: 10, left: 10};
		const xTickLine = {stroke: this.colors.strokeGrey, strokeDasharray: '2 2'};

		const areaChartProps: AreaChartProps = {
			data: rechartsData,
			onMouseMove: this.handleMouseMove,
			onMouseLeave: this.handleMouseLeave,
			margin: areaChartMargin
		};

		return (
			<div className={classNames}>
				{this.renderTopTooltip(rechartsData)}
				<ResponsiveContainer width={props.width || '99%'} height={props.height || 400}>
					<AreaChart {...areaChartProps}>
						<CartesianGrid stroke={this.colors.strokeGrey} strokeDasharray='2 2'/>
						<XAxis
							tickMargin={10}
							dataKey='x'
							axisLine={{stroke: this.colors.strokeGrey}}
							tickLine={xTickLine}
							tickSize={10}
							tick={{fill: this.colors.tickGrey, fontSize: 12} as any}
							tickFormatter={props.xAxisTickLabel}
						/>
						<YAxis
							tickMargin={20}
							tickCount={10}
							axisLine={{stroke: '#dfe5eb'} as any}
							tickLine={false}
							tick={{fill: this.colors.tickGrey, fontSize: 12} as any}
							tickFormatter={props.yAxisTickLabel}
						/>
						<Tooltip
							content={<span/>}
							cursor={{stroke: this.colors.darkBlue, strokeWidth: 2} as any}
							isAnimationActive={false}
						/>
						{this.renderChartLines()}
					</AreaChart>
				</ResponsiveContainer>
				{this.renderBottomTooltip(rechartsData)}
			</div>
		);
	}
}
