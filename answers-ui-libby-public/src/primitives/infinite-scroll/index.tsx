import * as React from 'react';
import { namespacedClassnames } from '../../common/namespace-classes';
import { BaseProps, noop } from '../../common/index';
import { SmartPoller } from 'answers-toolkit';

export const infiniteScrollKey = 'infinite-scroll';

export const DEFAULT_INTERVAL = 10000;

export const defaultBuffer = (visibleCount: number) => Math.ceil(visibleCount / 2);

export type InfiniteScrollProps<T> = {
	itemHeight: number;
	listHeight: number;
	buffer?: number;
	enablePolling?: boolean;
	pollingInterval?: number;
	fetchData: (offset: number, count: number) => Promise<T[]>;
	renderItem: (t: T) => JSX.Element;
	renderTombstone: () => JSX.Element;
} & BaseProps;

export type InfiniteScrollState<T> = {
	data?: T[],
	visibleCount: number,
	topVisible: number,
};

export class InfiniteScroll<T> extends React.PureComponent<InfiniteScrollProps<T>, InfiniteScrollState<T>> {

	dataPoller: () => void = noop;

	state: InfiniteScrollState<T> = {
		visibleCount: 0,
		topVisible: 0,
	};

	updateData = async () => {
		const { props, state } = this;
		const buffer = props.buffer || defaultBuffer(state.visibleCount);
		const offset = state.topVisible - buffer > 0 ? state.topVisible - buffer : 0;
		const topBuffer = state.topVisible - buffer < 0 ? state.topVisible : buffer;

		const data = await props.fetchData(offset, topBuffer + state.visibleCount + buffer);
		const topOldData = (state.data || []).slice(0, offset);
		const bottomOldData = (state.data || []).slice(offset + topBuffer + state.visibleCount + buffer);
		this.setState({ data: [...topOldData, ...data, ...bottomOldData] });
	}

	initPoller = () => {
		this.dataPoller = SmartPoller(this.updateData, noop, {
			interval: this.props.pollingInterval || DEFAULT_INTERVAL,
			document,
			maxRetries: 10,
		});
	}

	async componentDidMount () {
		const { props } = this;
		const visibleCount = Math.ceil(props.listHeight / props.itemHeight);
		const buffer = props.buffer || defaultBuffer(visibleCount);
		const data = await props.fetchData(0, visibleCount + buffer);

		this.setState({ data, visibleCount });

		if (!!this.props.enablePolling) {
			this.initPoller();
		}
	}

	componentWillUnmount () {
		if (!!this.props.enablePolling) {
			this.dataPoller();
		}
	}

	renderItem = (t: T, idx: number) => {
		const { props, state } = this;
		const buffer = props.buffer || defaultBuffer(state.visibleCount);
		const topRendered = state.topVisible - buffer > 0 ? state.topVisible - buffer : 0;
		const bottomRendered = state.topVisible + state.visibleCount + buffer;
		const item = idx >= topRendered && idx <= bottomRendered ? this.props.renderItem(t) : this.props.renderTombstone();
		return <li key={idx} className='item'>{item}</li>;
	}

	renderItems = () => <ul>{(this.state.data || []).map(this.renderItem)}</ul>;

	onScroll = async (e: any) => {
		const { props, state } = this;
		const scrollTop = e.target.scrollTop;
		const topVisible = Math.floor(scrollTop / this.props.itemHeight);
		const buffer = props.buffer || defaultBuffer(state.visibleCount);
		const offset = topVisible - buffer > 0 ? topVisible - buffer : 0;
		const topBuffer = topVisible - buffer < 0 ? topVisible : buffer;

		if (Math.abs(topVisible - state.topVisible) > buffer / 2) {
			const data = await props.fetchData(offset, topBuffer + state.visibleCount + buffer);
			const topOldData = (state.data || []).slice(0, offset);
			const bottomOldData = (state.data || []).slice(offset + topBuffer + state.visibleCount + buffer);
			this.setState({ data: [...topOldData, ...data, ...bottomOldData], topVisible });
		}
	}

	render () {
		const { props } = this;
		const classNames = namespacedClassnames(infiniteScrollKey, props.className);

		return (
			<div className={classNames} onScroll={this.onScroll} style={{ height: this.props.listHeight }}>
				{this.renderItems()}
			</div>
		);
	}
}
