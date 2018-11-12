import * as React from 'react';
import {Toggle} from './toggle';
import { delay } from '../../common';

const noOp: () => any = () => null;

export class StoryOfToggle extends React.Component<any, any> {
	state = {
		flag: false,
	};

	changeFlagWithDelay = () => {
		return delay(Math.random() * 3000 + 300).then(() => {
			this.setState({flag: !this.state.flag});
		});
	}

	changeFlag = () => {
		this.setState({flag: !this.state.flag});
	}

	render () {
		const flag = this.state.flag;

		return (
			<div>
				<h5 className='h5-title'>Normal</h5>
				<span className='row'>
					<span className='column'><Toggle value={!flag} onChange={this.changeFlag}/></span>
					<span className='column'><Toggle value={flag} onChange={this.changeFlag}/></span>
					<span className='column'><Toggle value={flag} onChange={noOp} disabled={true}/></span>
					<span className='column'><Toggle value={!flag} onChange={noOp} disabled={true}/></span>
				</span>

				<h5 className='h5-title'>With promises</h5>
				<span className='row'>
					<span className='column'><Toggle value={flag} onChange={this.changeFlagWithDelay}/></span>
					<span className='column'><Toggle value={flag} onChange={this.changeFlagWithDelay} size='small'/></span>
				</span>

				<h5 className='h5-title'>Small</h5>
				<span className='row'>
					<span className='column'><Toggle value={!flag} onChange={this.changeFlag} size='small'/></span>
					<span className='column'><Toggle value={flag} onChange={this.changeFlag} size='small'/></span>
					<span className='column'><Toggle value={flag} onChange={noOp} disabled={true} size='small'/></span>
					<span className='column'><Toggle value={!flag} onChange={noOp} disabled={true} size='small'/></span>
				</span>
			</div>
		);
	}
}
