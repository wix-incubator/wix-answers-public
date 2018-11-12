import * as React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { namespacedClassnames } from '../../common/namespace-classes';
import {matchPath, Switch} from 'react-router';

const orderPrefix = 'slide-order-';

const isSwitch = (comp: any) => {
	return comp && comp.type && comp.type === Switch;
};

const getChildOrder = (child: any, fallback: number) => {
	const key = child.key || '';
	const hasOvrOrder = key.indexOf(orderPrefix) !== -1;
	return hasOvrOrder ? parseInt(key.replace(orderPrefix, ''), 10) : fallback;
};

const getSwitchChildOrder = (switchComp: any) => {
	let found = -1;
	const routes = switchComp.props.children;

	if (!switchComp.props.location) {
		console.warn('Switch inside slide container must be provided with location as prop to infer direction');
	}

	const pathname = switchComp.props.location && switchComp.props.location.pathname;

	React.Children.forEach(routes, (route: any, routeIdx) => {
		const matches = matchPath(pathname, route && route.props);
		if (matches) {
			found = getChildOrder(route, routeIdx);
		}
	});
	return found;
};

const getOrder = (children: any): number => {
	let found = -1;
	React.Children.forEach(children, (child: any, idx) => {
		if (child) {
			// if it's a switch we wanna know the order of the actual rendered route
			found = isSwitch(child) ? getSwitchChildOrder(child) : getChildOrder(child, idx);
		}
	});
	return found;
};

const getDirection = (prev: number, curr: number) => {
	if (curr > prev) {
		return 'right';
	} else if (curr < prev) {
		return 'left';
	} else {
		return 'none';
	}
};

export class SlideContainer extends React.PureComponent<any, any> {
	transitionTime = 300;

	lastOrder = -1;

	render () {
		const currOrder = getOrder(this.props.children);

		const direction = getDirection(currOrder, this.lastOrder);
		this.lastOrder = currOrder;

		return (
		<CSSTransitionGroup
			className={namespacedClassnames('slide-container')}
			transitionName={`slide-${direction}`}
			transitionAppearTimeout={this.transitionTime}
			transitionEnterTimeout={this.transitionTime}
			transitionLeaveTimeout={this.transitionTime}
		>
			{this.props.children}
		</CSSTransitionGroup>);
	}
}

// tslint:disable-next-line:max-classes-per-file
export class SlideItem extends React.PureComponent<any, any> {
	render () {
		return <div className='item'>{this.props.children}</div>;
	}
}
