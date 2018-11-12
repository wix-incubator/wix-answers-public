import * as React from 'react';
import { LineChart } from '.';
import { ChartLine, Point } from './domain';
import { Button, PremiumButton } from '../primitives/buttons/button/button';
import { Input } from '../primitives/input/input';
import { ChartLegend, ChartLegendLabel, ChartLegendValue } from './chart-legend';
import { TrendGraph } from './trend-graph';
import {Text} from '../typography';
import { PunchCard } from './punch-card';
import { Container, ContainerSection } from '../primitives/container';
import { randomUuid } from '../common';

export type StoryOfDataVisState = {
	pointArrays: Point[][];
	allLines: ChartLine[];
	selectedLegendItems: {[id: string]: boolean};
	stagedLabel: string;
};

export class StoryOfDataVis extends React.Component<any, StoryOfDataVisState> {
	maxDataSets = 10;
	maxVisibleData = 8;
	minDataSets = 1;

	// tslint:disable-next-line:max-line-length
	colors = ['#3899ec', '#3bb8d4', '#fac249', '#3bd466', '#ffce00', '#577083', '#ff4f67', '#867650', '#3899ec', '#3bb8d4', '#fac249', '#3bd466'];

	state: StoryOfDataVisState = {
		pointArrays: [],
		allLines: [],
		selectedLegendItems: {},
		stagedLabel: 'Views'
	};

	xValues = 'a'.repeat(30).split('').map((_, i) => i + 1);

	randomNumber = () => Math.floor(Math.random() * 1000);
	createPoints = (): Point[] => this.xValues.map((x) => ({x, y: this.randomNumber()}));

	componentWillMount () {
		this.addData();
	}

	addData = () => {
		const {maxVisibleData} = this;

		const randomId = randomUuid();
		const morePoints = this.createPoints();

		const pointArrays = [...this.state.pointArrays, morePoints];
		const idx = pointArrays.length - 1;

		// tslint:disable-next-line:max-line-length
		const allLines = [...this.state.allLines, {id: randomId, name: `Line ${idx + 1}`, color: this.colors[idx], values: morePoints}];
		const selectedLegendItems = {...this.state.selectedLegendItems, [randomId]: pointArrays.length <= maxVisibleData};

		this.setState({pointArrays, allLines, selectedLegendItems});
	}

	removeData = () => {
		const pointArrays = this.state.pointArrays.slice(0, -1);
		const allLines = this.state.allLines.slice(0, -1);
		const selectedLegendItems = Object.keys(this.state.selectedLegendItems).slice(0, -1)
			.reduce((res, curr) => {
				return {...res, [curr]: this.state.selectedLegendItems[curr]};
			}, {});

		this.setState({pointArrays, allLines, selectedLegendItems});
	}

	refreshLines = () => {
		const pointArrays = this.state.pointArrays.map((_) => this.createPoints());
		const allLines = this.state.allLines.map((line, i) => ({...line, values: pointArrays[i]}));
		this.setState({pointArrays, allLines});
	}

	onChangeLabel = (val: string) => this.setState({stagedLabel: val});

	createBottomTooltipLabel = (x: number) => `Day ${x}`;

	createTopTooltipLabel = (_: number, value?: number) => <div>{value || ''} {this.state.stagedLabel}</div>;

	createLegendLabel = (line: ChartLine): ChartLegendLabel => {
		const {id, name, color} = line;
		return {id, name, color, value: line.values.reduce((res, curr) => res + (curr.y as number), 0)};
	}

	createXTickLabel = (x: number) => `Day ${x}`;

	onLegendValueChange = (value: ChartLegendValue) => this.setState({selectedLegendItems: value});

	renderTrendGraph = (points: Point[], color: string, key: any) => <TrendGraph key={key} value={points} color={color}/>;

	createValueLabel = (value: number) => `${value} ${this.state.stagedLabel}`;

	render () {
		const {state} = this;
		const allLines = state.allLines;

		const visibleLines = allLines.filter((line) => this.state.selectedLegendItems[line.id] === true);
		const labels = allLines.map((line) => this.createLegendLabel(line));

		return (
			<div style={{width: '100%'}} className='data-vis-story'>
				<div className='sticky-header'>
					<Text type='h1'>Data Visualization Playground</Text>
					<div className='controls'>
						<div className='buttons'>
							<Button disabled={state.pointArrays.length >= this.maxDataSets} onClick={this.addData}>Add Data Set</Button>
							<Button disabled={state.pointArrays.length <= this.minDataSets} onClick={this.removeData}>Remove Last</Button>
							<PremiumButton onClick={this.refreshLines}>Change Data Set</PremiumButton>
						</div>
						<div className='inputs'>
							<span>Value Label <Input value={state.stagedLabel} onChange={this.onChangeLabel}/></span>
						</div>
					</div>
				</div>
				<div className='scrollable'>
					<Container>
						<ContainerSection><Text type='h2'>Line Chart & Chart Legend</Text></ContainerSection>
						<LineChart
							lines={visibleLines}
							bottomTooltipLabel={this.createBottomTooltipLabel}
							topTooltipLabel={this.createTopTooltipLabel}
							xAxisTickLabel={this.createXTickLabel}
						/>
						<br/>
						<ChartLegend
							value={state.selectedLegendItems}
							onChange={this.onLegendValueChange}
							labels={labels}
						/>
					</Container>

					<Container>
						<ContainerSection><Text type='h2'>Trend Graph</Text></ContainerSection>
						<div className='trend-graphs'>
							{visibleLines.map((l) => this.renderTrendGraph(l.values, l.color, l.id))}
						</div>
					</Container>

					<Container>
						<ContainerSection><Text type='h2'>Punch Card</Text></ContainerSection>
						<div className='punch-card'>
							<PunchCard
								value={visibleLines.map((l) => ({id: l.id, points: l.values, label: l.name}))}
								xAxisTickLabel={this.createXTickLabel}
								tooltipLabel={this.createValueLabel}
							/>
						</div>
					</Container>
				</div>
			</div>
		);
	}
}
