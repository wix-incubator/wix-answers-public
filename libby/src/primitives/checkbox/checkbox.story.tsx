import {Checkbox} from './checkbox';
import * as React from 'react';

export class StoryOfCheckbox extends React.Component<any, any> {
	state = {
		checked1: true,
		checked2: true
	};

	render () {
		const noOp = (): any => null;

		const changeCheckValue1 = () => this.setState({ checked1: !this.state.checked1 });
		const changeCheckValue2 = () => this.setState({ checked2: !this.state.checked2 });

		return (
			<span>
				<span className='row'>
					<span className='column'>
						<h5 className='h5-title'>Default</h5>
						<Checkbox value={this.state.checked1} onChange={changeCheckValue1}/>
					</span>
					<span className='column'>
						<h5 className='h5-title'>With Label</h5>
						<Checkbox value={this.state.checked2} onChange={changeCheckValue2}>
							Checkbox Label
						</Checkbox>
					</span>
					<span className='column'>
						<h5 className='h5-title'>Disabled - Checked</h5>
						<Checkbox value={true} onChange={noOp} disabled={true}>
							Disabled
						</Checkbox>
					</span>
					<span className='column'>
						<h5 className='h5-title'>Disabled - Unchecked</h5>
						<Checkbox value={false} onChange={noOp} disabled={true}>
							Disabled
						</Checkbox>
					</span>
				</span>
				<span className='row'>
					<span className='column'>
						<h5 className='h5-title'>Large</h5>
						<Checkbox value={this.state.checked1} large={true} onChange={changeCheckValue1}/>
					</span>
					<span className='column'>
						<h5 className='h5-title'>Large - With Label</h5>
						<Checkbox value={this.state.checked1} large={true} onChange={changeCheckValue1}>
							Checkbox Label
						</Checkbox>
					</span>
					<span className='column'>
						<h5 className='h5-title'>Large Disabled</h5>
						<Checkbox value={this.state.checked1} large={true} onChange={changeCheckValue1} disabled={true}/>
					</span>
				</span>
			</span>
		);
	}
}
