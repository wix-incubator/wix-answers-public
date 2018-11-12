import * as React from 'react';
import { Select } from '../../primitives/selectors/single-select/select';
import { SlideContainer } from './slide-container';
import { Button } from '../../primitives/buttons/button/button';
import { Loader } from '../../primitives/loaders/loader/loader';

const container = {
	width: 200,
	height: 300,
	background: 'blue',
	marginTop: 40
};

const itemStyle = (idx: number): React.CSSProperties => ({
	width: '100%',
	height: '100%',
	display: 'flex',
	alignItems: 'center',
	fontSize: 40,
	justifyContent: 'center',
	background: ['red', 'blue', 'green', 'pink', 'orange'][idx]
});

export class SlideContainerStory extends React.Component<any, any> {
	state = {
		show: 1,
		rendered: true
	};

	items = 3;

	toggle = ({value}: any) => {
		this.setState({show: value});
	}

	next = () => {
		const num = this.state.show + 1;
		this.toggle({value: num >= this.items ? 0 : num});
	}

	blip = () => {
		this.setState({rendered: false}, () => {
			setTimeout(() => this.setState({rendered: true}), 1000);
		});
	}

	renderMain = () => {
		const {show, rendered} = this.state;
		if (rendered) {
			return (
			<div style={container}>
				<SlideContainer>
					{show === 0 ? <div onClick={this.next} style={itemStyle(0)}>1</div> : null}
					{show === 1 ? <div onClick={this.next} style={itemStyle(1)}>2</div> : null}
					{show === 2 ? <div onClick={this.next} style={itemStyle(2)}>3</div> : null}
				</SlideContainer>
			</div>);
		} else {
			return <Loader/>;
		}
	}

	render () {
		const items = '.'.repeat(this.items).split('').map((_, idx) => {
			return {label: 'Item ' + (idx + 1), value: idx};
		});

		return (
			<div>
				<Button onClick={this.blip}>Blip</Button>
				<Select options={items} onChange={this.toggle} value={this.state.show} placeholder=''/>
				{this.renderMain()}
			</div>
		);
	}
}
