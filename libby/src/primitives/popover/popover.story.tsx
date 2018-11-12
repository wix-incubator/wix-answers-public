import * as React from 'react';
import {PopoverPlaces} from './base-popover';
import {PrimaryPopover, SecondaryPopover, CallDevicePopover} from './popover';

const places: PopoverPlaces[] = ['left', 'right', 'above', 'below'];

export class StoryOfPopover extends React.Component<any, any> {
	state = {
		openIdx: -1
	};

	render () {
		const closePopover = () => {
			this.setState({openIdx: -1});
		};

		const renderWhitePopovers = places.map((place: PopoverPlaces, idx: number) => {
			const isOpen = this.state.openIdx === idx;
			const body = {body: <div>This Popover is body</div>, isOpen};

			const openPopover = () => {
				this.setState({openIdx: idx});
			};

			return (
				<PrimaryPopover {...body} key={idx} onOuterAction={closePopover} preferPlace={place} triggerOuterOnEsc={true}>
					<div className='column' onClick={openPopover}><button>{place}</button></div>
				</PrimaryPopover>
			);
		});

		const newStartIdx = places.length;
		const renderBluePopovers = places.map((place: PopoverPlaces, idx: number) => {
			const isOpen = this.state.openIdx === (idx + newStartIdx);
			const body = {body: <div>This Popover is body</div>, isOpen};

			const openPopover = () => {
				this.setState({openIdx: (idx + newStartIdx)});
			};

			return (
				<SecondaryPopover {...body} key={idx} onOuterAction={closePopover} preferPlace={place}>
					<div className='column' onClick={openPopover}><button>{place}</button></div>
				</SecondaryPopover>
			);
		});

		const newestStartIdx = 2 * places.length;
		const renderDarkPopovers = places.map((place: PopoverPlaces, idx: number) => {
			const isOpen = this.state.openIdx === (idx + newestStartIdx);
			const body = {body: <div>This Popover is body</div>, isOpen};

			const openPopover = () => {
				this.setState({openIdx: (idx + newestStartIdx)});
			};

			return (
				<CallDevicePopover {...body} key={idx} onOuterAction={closePopover} preferPlace={place}>
					<div className='column' onClick={openPopover}><button>{place}</button></div>
				</CallDevicePopover>
			);
		});

		return (
			<div>
				<h5 className='h5-title'>Primary Popovers - hotkey support enabled</h5>
				{renderWhitePopovers}

				<h5 className='h5-title'>Secondary Popovers - hotkey support disabled (but can be enabled)</h5>
				{renderBluePopovers}

				<h5 className='h5-title'>Dark (Call Device) Popovers - hotkey support disabled (but can be enabled)</h5>
				{renderDarkPopovers}
			</div>
		);
	}
}
