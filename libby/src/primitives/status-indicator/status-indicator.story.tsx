import * as React from 'react';
import { Column } from '../../common/story-utils';
import { Toggle } from '../toggle/toggle';
import { AgentStatusIndicator } from './status-indicator';
import { AvatarSizes } from '../../avatars/base-avatar/base-avatar';
import { AvatarCallCenterAgentStatus } from '../../common';

export class StoryOfStatusIndicator extends React.Component<any, any> {
	state = {
		showGlow: false
	};

	toggleGlow () {
		this.setState({showGlow: !this.state.showGlow});
	}

	setAgentStatus (status: AvatarCallCenterAgentStatus) {
		this.setState({ agentStatus: status });
	}

	render () {
		const toggleGlow = this.toggleGlow.bind(this);
		const isLarge = {size: 'large' as AvatarSizes};

		const columnStyle = {
			display: 'flex',
			'flex-direction': 'column',
			'align-items': 'center'
		};

		return (
			<span className='row'>
				<Column>
					<h5 className='h5-title'>Toggle Glow</h5>
					<Toggle value={this.state.showGlow} onChange={toggleGlow}/>
				</Column>
				<Column>
					<h5 className='h5-title'>Online</h5>
					<div style={columnStyle}>
						<AgentStatusIndicator showGlow={this.state.showGlow} status={AvatarCallCenterAgentStatus.ONLINE}/>
						<br/>
						<AgentStatusIndicator showGlow={this.state.showGlow} status={AvatarCallCenterAgentStatus.ONLINE} {...isLarge}/>
					</div>
				</Column>
				<Column>
					<h5 className='h5-title'>Talking</h5>
					<div style={columnStyle}>
						<AgentStatusIndicator showGlow={this.state.showGlow} status={AvatarCallCenterAgentStatus.TALKING}/>
						<br/>
						<AgentStatusIndicator showGlow={this.state.showGlow} status={AvatarCallCenterAgentStatus.TALKING} {...isLarge}/>
					</div>
				</Column>
				<Column>
					<h5 className='h5-title'>Reserved / Wrapping up</h5>
					<div style={columnStyle}>
						<AgentStatusIndicator showGlow={this.state.showGlow} status={AvatarCallCenterAgentStatus.WRAPPING_UP}/>
						<br/>
						<AgentStatusIndicator
							showGlow={this.state.showGlow}
							status={AvatarCallCenterAgentStatus.WRAPPING_UP}
							{...isLarge}
						/>
					</div>
				</Column>
				<Column>
					<h5 className='h5-title'>Busy</h5>
					<div style={columnStyle}>
						<AgentStatusIndicator showGlow={this.state.showGlow} status={AvatarCallCenterAgentStatus.BUSY}/>
						<br/>
						<AgentStatusIndicator showGlow={this.state.showGlow} status={AvatarCallCenterAgentStatus.BUSY} {...isLarge}/>
					</div>
				</Column>
				<Column>
					<h5 className='h5-title'>Offline</h5>
					<div style={columnStyle}>
						<AgentStatusIndicator showGlow={this.state.showGlow} status={AvatarCallCenterAgentStatus.OFFLINE}/>
						<br/>
						<AgentStatusIndicator showGlow={this.state.showGlow} status={AvatarCallCenterAgentStatus.OFFLINE} {...isLarge}/>
					</div>
				</Column>
			</span>
		);
	}
}
