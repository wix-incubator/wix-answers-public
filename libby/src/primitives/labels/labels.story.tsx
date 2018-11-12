import * as React from 'react';
import { LabelView } from './label-view';
import { PriorityLabel, PriorityLabelType } from './priority-label';
import { randomLabels, TicketPriority } from '../../common';

// tslint:disable-next-line:variable-name
const _labels = randomLabels(10);

const allPriorities = [TicketPriority.LOW, TicketPriority.NORMAL, TicketPriority.HIGH];
const highLowPriorities = [TicketPriority.LOW, TicketPriority.HIGH];
export class LabelsStory extends React.Component<any, any> {
	state: any = {
		labels: [..._labels],
		prioritiesMap: {
			[TicketPriority.LOW]: true,
			[TicketPriority.NORMAL]: false,
			[TicketPriority.HIGH]: true,
		}
	};

	onRemove = (label: any) => {
		const { labels } = this.state;
		const idx = labels.map((l: any) => l.id).indexOf(label.id);
		labels.splice(idx, 1);
		this.forceUpdate();
	}

	onTogglePriority = (p: any) => {
		const pMap = this.state.prioritiesMap;
		pMap[p] = !pMap[p];
		this.setState({ prioritiesMap: pMap });
	}

	render () {

		// tslint:disable-next-line:max-line-length
		const priorityLabel = (priority: any, type: PriorityLabelType = PriorityLabelType.REGULAR) => (
			<PriorityLabel
				priority={priority}
				onToggle={this.onTogglePriority}
				toggled={this.state.prioritiesMap[priority]}
				type={type}
			/>
		);
		return (
			<div>
				<h5 className='h5-title'>Static</h5>
				<div>
					{_labels.map((label) => <LabelView key={label.id} label={label} />)}
				</div>
				<h5 className='h5-title'>Deletable</h5>
				<div>
					{this.state.labels.map((label: any) => <LabelView key={label.id} label={label} onRemove={this.onRemove} />)}
				</div>
				<h5 className='h5-title'>Priority</h5>
				<div>
					{allPriorities.map(priorityLabel)}
				</div>
				<h5 className='h5-title'>Priority Small</h5>
				<div>
					{highLowPriorities.map((priority) =>  priorityLabel(priority, PriorityLabelType.SMALL))}
				</div>
			</div>
		);
	}
}
