import * as React from 'react';
import { Column } from '../../common';
import { ClickToCopy } from '.';

export class ClickToCopyStory extends React.Component<any, any> {

	changeValue = (value: string) => {
		this.setState({value});
	}

	t = (key: string) => {
		return key === 'common.click-to-copy' ? 'Click to copy' : 'Copied to Clipboard';
	}

	render () {
		// const {state} = this;

		return (
			<span className='row'>
				<Column title='Default' style={{maxWidth: 200}}>

					<ClickToCopy text='bob' t={this.t}/>

					<div style={{width: 140}}>
						<ClickToCopy text='Some real long email of user of user' t={this.t}/>
						{/* <ClickToCopy text='c12408735h7d1bae2a71cb2m37195368@lostmyname.reamaze.com' t={this.t}/> */}
					</div>
				</Column>
			</span>
		);
	}
}
