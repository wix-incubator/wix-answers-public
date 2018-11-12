import * as React from 'react';
import { namespacedClassnames } from '../../common/namespace-classes';
import { BaseProps, ValueCompProps } from '../../common';
import { LegendLabelView } from './legend-label-view';
import { CheckboxGroup, CheckboxGroupItem } from '../../composites/checkbox-group';
import { Popover } from '../../primitives/popover/popover';
import { Icon } from '../../primitives/icon/icon';
import { iconsMap } from '../../icons/processed';
import { Text } from '../../typography';

export const ChartLegendKey = 'chart-legend';

export type ChartLegendValue = {[id: string]: boolean};

export type ChartLegendLabel = {
	id: string;
	color: string;
	name: string;
	value?: number;
};

export type ChartLegendPropsMeta = {
	labels: ChartLegendLabel[];
};

export type ChartLegendProps = ValueCompProps<ChartLegendValue, ChartLegendPropsMeta> & BaseProps;

export type ChartLegendState = {
	visibleLegendLabels: ChartLegendLabel[];
	isMoreLabelsOpen: boolean;
};

export class ChartLegend extends React.PureComponent<ChartLegendProps, ChartLegendState> {
	minVisibleLabels = 1;
	maxVisibleLabels = 8;

	state: ChartLegendState = {
		visibleLegendLabels: this.props.labels.slice(0, this.maxVisibleLabels),
		isMoreLabelsOpen: false,
	};

	componentWillReceiveProps (nextProps: ChartLegendProps) {
		if (nextProps.labels.length <= this.maxVisibleLabels) {
			const visibleLegendLabels = nextProps.labels;
			this.setState({visibleLegendLabels});
		}
	}

	onLabelClick = (labelId: string) => (labelValue: boolean) => {
		const value = {...this.props.value, [labelId]: labelValue};
		this.props.onChange(value);
	}

	renderVisibleLegendLabels = () => {
		const value = this.props.value;
		const isSingleLabelSelected = Object.keys(value).reduce((res, curr) => !!value[curr] ? res + 1 : res, 0) === 1;

		return this.state.visibleLegendLabels.map((label) => {
			const isSelected = this.props.value[label.id];

			return (
				<LegendLabelView
					key={label.id}
					value={this.props.value[label.id]}
					onChange={this.onLabelClick(label.id)}
					label={label}
					disabled={isSelected && isSingleLabelSelected}
				/>
			);
		});
	}

	onVisibleLegendLabelsChange = (map: Map<string, boolean>) => {
		const updatedVisibleLabels = this.props.labels.filter((l) => map.get(l.id) === true);

		const maybeLastVisibleLabel = updatedVisibleLabels.length === 1 ? updatedVisibleLabels[0] : null;

		const updatedValue = this.props.labels.reduce((res, curr) => {
			const maybeCurrentlyVisibleLabel = this.state.visibleLegendLabels.find((l) => l.id === curr.id);
			const isRemovingLabel = maybeCurrentlyVisibleLabel && map.get(curr.id) === false;
			const isAddingLabel = !maybeCurrentlyVisibleLabel && map.get(curr.id) === true;
			const isLastVisibleLabel = maybeLastVisibleLabel && maybeLastVisibleLabel.id === curr.id;

			return {
				...res,
				[curr.id]: isRemovingLabel ? false : isAddingLabel ? true : (isLastVisibleLabel || this.props.value[curr.id])
			};
		}, {});

		this.setState({visibleLegendLabels: updatedVisibleLabels});
		this.props.onChange(updatedValue);
	}

	toggleMoreLabels = (visible: boolean) => () => this.setState({isMoreLabelsOpen: visible});

	createCheckboxItems = (): CheckboxGroupItem[] => {
		return this.props.labels.map((label) => ({
			id: label.id,
			label: label.name,
			customElement: <Text>{label.name}</Text>
		}));
	}

	render () {
		const {props, state} = this;
		const classNames = namespacedClassnames(ChartLegendKey, props.className);

		const allCheckboxesEntries = props.labels.reduce<Array<[string, boolean]>>((res, curr) => {
			const isCurrentVisible = !!this.state.visibleLegendLabels.find((l) => l.id === curr.id);
			return [...res, [curr.id, isCurrentVisible]];
		}, []);

		const items: CheckboxGroupItem[] = this.createCheckboxItems();

		const value = new Map<string, boolean>(allCheckboxesEntries);

		const checkboxGroup = (
			<CheckboxGroup
				value={value}
				items={items}
				onChange={this.onVisibleLegendLabelsChange}
				maxSelections={this.maxVisibleLabels}
				minSelections={this.minVisibleLabels}
			/>
		);

		const maybeLegendLabelsDropdown = this.props.labels.length > 8 ? (
			<div className='legend-labels-dd'>
				<Popover
					preferPlace={'above'}
					body={checkboxGroup}
					isOpen={state.isMoreLabelsOpen}
					onOuterAction={this.toggleMoreLabels(false)}
				>
					<div className='more-labels' onClick={this.toggleMoreLabels(true)}>
						<span>More</span>
						<Icon className='more-labels-icon' icon={iconsMap.buttonDd}/>
					</div>
				</Popover>
			</div>
		) : null;

		return (
			<div className={classNames}>
				<div className='visible-labels-wrapper'>{this.renderVisibleLegendLabels()}</div>
				{maybeLegendLabelsDropdown}
			</div>
		);
	}
}
