import * as React from 'react';
import { CatalogGroup } from '..';
import { ColorPicker, ColorPickerProps } from '../..';

// Maybe there is a better way ?
class ColorPickerStatefull extends React.PureComponent<ColorPickerProps> {
	state = {
		value: '#3899ec',
		isOpen: false
	};

	onChange = (value: string) => this.setState({value});

	render () {
		const t = () => 'Invalid HEX color';

		return (
			<div style={{width: '170px', margin: '0 auto'}}>
				<ColorPicker value={this.state.value} onChange={this.onChange} t={t}/>
			</div>
		);
	}
}

export const colorPickerCatalogData: CatalogGroup<ColorPickerProps> = {
	render: (p) => <ColorPickerStatefull {...p}/>,
	title: 'Color picker',
	items: [
		{
			label: 'Normal',
			props: {
				value: '#3899ec',
				t: (_: string) => '',
				onChange: (value: string) => value
			}
		}
	]
};
