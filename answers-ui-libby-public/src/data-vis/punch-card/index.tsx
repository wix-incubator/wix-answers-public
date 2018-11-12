import * as React from 'react';
import { BaseProps } from '../../common';
import { namespacedClassnames } from '../../common/namespace-classes';
import { PunchCardRowValue, PunchCardRow } from './punch-card-row';

export const punchCardKey = 'punch-card';

export type PunchCardProps = {
	value: PunchCardRowValue[];
	xAxisTickLabel?: (x: number) => string;
	tooltipLabel?: (y: number) => string;
} & BaseProps;

export class PunchCard extends React.PureComponent<PunchCardProps> {
	renderAxisLabel = (x: number) => (
		<span key={`axis-label-${x}`} className='axis-label'>
			{this.props.xAxisTickLabel ? this.props.xAxisTickLabel(x) : x}
		</span>
	)

	maybeRenderPunchCardAxis = () => {
		const {props} = this;
		const strips = props.value;

		if (!strips.length) {
			return null;
		} else {
			const xValues = strips[0].points.map((p) => p.x);
			return (
				<div className='punch-card-axis'>
					{xValues.map((x) => this.renderAxisLabel(x))}
				</div>
			);
		}
	}

	renderStrip = (value: PunchCardRowValue) => (
		<PunchCardRow
			key={value.id}
			value={value}
			tooltipLabel={this.props.tooltipLabel}
		/>
	)

	render () {
		const {props} = this;

		const cn = namespacedClassnames(punchCardKey);
		const punchCardRows = props.value.map((strip) => this.renderStrip(strip));
		const punchCardAxis = this.maybeRenderPunchCardAxis();

		return (
			<div className={cn}>
				<div className='punchcard-rows-wrapper'>{punchCardRows}</div>
				{punchCardAxis}
			</div>
		);
	}
}
