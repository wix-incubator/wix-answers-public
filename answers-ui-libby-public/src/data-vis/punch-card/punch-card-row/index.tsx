import * as React from 'react';
import { Point } from '../../domain';
import { normalizePoints } from './normalize-points';
import { Tooltip } from '../../../primitives/tooltip/tooltip';
import { namespacedClassnames } from '../../../common/namespace-classes';

export const punchCardRowKey = 'punch-card-row';

export type PunchCardRowValue = {
	id: string;
	points: Point[];
	label?: string | JSX.Element;
};

export type PunchCardRowProps = {
	value: PunchCardRowValue;
	tooltipLabel?: (y: number) => string;
};

export class PunchCardRow extends React.PureComponent<PunchCardRowProps> {
	maxBubbleScale = 6;
	minBubbleScale = 0.5;

	renderBubble = (normalizedValue: number, maxValue: number, index: number) => {
		const {props} = this;
		const scaleAmount = Math.max((normalizedValue * this.maxBubbleScale) / maxValue, this.minBubbleScale);
		const style = {
			transform: `scale(${scaleAmount})`
		};

		const valueBubble = <span style={style} className='value-bubble' data-scale={scaleAmount}/>;

		const bubbleElem = this.props.tooltipLabel ? (
			<Tooltip body={this.props.tooltipLabel(props.value.points[index].y)} relativeToBody={true}>
				{valueBubble}
			</Tooltip>
		) : valueBubble;

		return <span key={props.value.id + index} className='value-bubble-container'>{bubbleElem}</span>;
	}

	render () {
		const {props} = this;
		const normalizedPoints = normalizePoints(props.value.points);
		const maxValue = Math.max(...normalizedPoints.map((p) => p.y));
		const cn = namespacedClassnames(punchCardRowKey);

		return (
			<div className={cn}>
				{props.value.label ? <div className='row-label'>{props.value.label}</div> : null}
				{normalizedPoints.map((p, i) => this.renderBubble(p.y, maxValue, i))}
			</div>
		);
	}
}
