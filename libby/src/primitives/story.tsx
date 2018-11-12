import * as React from 'react';
import {StoryOfLoaders} from './loaders/loaders.story';
import {StoryOfSimpleTooltip} from './simple-tooltip/simple-tooltip.story';
import {StoryOfRadioGroup} from './radio-group/radio-group.story';
import {StoryOfCheckbox} from './checkbox/checkbox.story';
import {storyOfButtons} from './buttons/buttons.story';
import {StoryOfToggle} from './toggle/toggle.story';
import {StoryOfInput} from './input/input.story';
import {StoryOfPopover} from './popover/popover.story';
import {StoryOfSelectors} from './selectors/story';
import {TextAreaStory} from './text-area/text-area.story';
import { TextAreaAutosizeStory } from './text-area-autosize/text-area-autosize.story';
import {StoryOfToggleButton} from './toggle-button/toggle-button.story';
import { StoryOfMessageBox } from './message-box/message-box.story';
import { StoryOfNumericInput } from './numeric-input/numeric-input.story';
import { StoryOfModal } from './modal/modal.story';
import { StoryOfTable } from './table/table.story';
import {LabelsStory} from './labels/labels.story';
import {StoryOfContainer} from './container/container.story';
import { TabsStory } from './tabs/tabs.story';
import { StoryOfStatusIndicator } from './status-indicator/status-indicator.story';
import { StoryOfCollapsible } from './collapsible/collapsible.story';
import { CodeEditorStory } from './code-editor/code-editor.story';
import { StoryOfMultiInput } from './multi-input/multi-input.story';
import { StoryOfTooltip } from './tooltip/tooltip.story';
import { Text } from '../typography/text';
import { StoryOfSteps } from './steps/steps.story';
import { LinkStory } from './link/link.story';
import { StoryOfDrillMenuItem } from './drill-menu-item/drill-menu-item.story';
import { StoryOfPagination } from './pagination/story';
import { StoryOfSideBar } from './side-bar/story';
import { RoundNotificationStory } from './round-notification/story';
import { InfoBoxStory } from './info-box/story';
import { Container } from './container/container';
import { Collapsible } from './collapsible/collapsible';
import { InfoBox } from './info-box/index';
import { noop } from 'answers-lib';
import { StoryOfStaticLabel } from './static-label/story';
import { StoryOfInfiniteScroll } from './infinite-scroll/story';

export const PrimitiveStories = () => {
	return (
		<div className='story-container'>
			<h2 className='h2-title'>Inputs</h2>

			{storyOfButtons()}

			<div className='preview'>
				<h3 className='h3-title'>Link</h3>
				<LinkStory />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Toggle Button</h3>
				<StoryOfToggleButton />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Drill Menu Item</h3>
				<StoryOfDrillMenuItem />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Toggle</h3>
				<StoryOfToggle />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Pagination</h3>
				<StoryOfPagination />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Collapsible</h3>
				<StoryOfCollapsible />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Input</h3>
				<StoryOfInput />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Numeric Input</h3>
				<StoryOfNumericInput/>
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Multi Input</h3>
				<StoryOfMultiInput/>
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Text Area</h3>
				<TextAreaStory />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Text Area Autosize</h3>
				<TextAreaAutosizeStory />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Table</h3>
				<StoryOfTable />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Container</h3>
				<StoryOfContainer />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Popover</h3>
				<StoryOfPopover />
			</div>

			<div className='preview'>
				<StoryOfSelectors />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Checkbox</h3>
				<StoryOfCheckbox />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Radio Group</h3>
				<StoryOfRadioGroup />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Message Box</h3>
				<StoryOfMessageBox/>
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Modals</h3>
				<StoryOfModal/>
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Simple Tooltip - Old</h3>
				<Text type='t1a'>Simple Tooltip will be overridden by Tooltip with FT: newTooltips=true</Text>
				<StoryOfSimpleTooltip/>
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Tooltip</h3>
				<StoryOfTooltip/>
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Label View</h3>
				<LabelsStory/>
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Static Label</h3>
				<StoryOfStaticLabel/>
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Round Notification</h3>
				<RoundNotificationStory/>
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Status Indicator</h3>
				<StoryOfStatusIndicator/>
			</div>
			<div className='preview'>
				<h3 className='h3-title'>Loaders</h3>
				<StoryOfLoaders/>
			</div>
			<div className='preview'>
				<h3 className='h3-title'>Tabs</h3>
				<TabsStory/>
			</div>
			<div className='preview'>
				<h3 className='h3-title'>Steps</h3>
				<StoryOfSteps />
			</div>
			<div className='preview'>
				<h3 className='h3-title'>Code</h3>
				<CodeEditorStory/>
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Common Side Bar</h3>
				<StoryOfSideBar/>
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Info Box</h3>
				<InfoBoxStory/>
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Secondary Container with collapsible and Info Boxes</h3>
				<Container secondary={true}>
					<Collapsible onToggle={noop} isOpen={true} title='Cases (2)'>

						<InfoBox
							title='Case'
							mainBody={<div>bla bla</div>}
							additionalBody={<div>more bla</div>}
							showMoreText='Show more'
							showLessText='Shoe less'
						/>

						<InfoBox
							title='Case'
							mainBody={<div>bla bla</div>}
							additionalBody={<div>more bla</div>}
							showMoreText='Show more'
							showLessText='Shoe less'
						/>

					</Collapsible>

				</Container>
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Infinite Scroll</h3>
				<StoryOfInfiniteScroll />
			</div>

		</div>
	);
};
