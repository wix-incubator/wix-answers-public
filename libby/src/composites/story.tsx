import * as React from 'react';
import { StoryOfImageUploader } from './image-uploader/image-uploader.story';
import { StoryOfColorPicker } from './color-picker/color-picker.story';
import { StoryOfAudioUploader } from './audio-uploader/audio-uploader.story';
import { StoryOfSearchInput } from './search-input/search-input.story';
import { FloaterMenuStory } from './floater-menu/floater-menu.story';
import { StoryOfCollapsibleToggle } from './collapsible-toggle/collapsible-toggle.story';
import { StoryOfCollapsibleRadio } from './collapsible-radio/collapsible-radio.story';
import { StoryOfTabsContainer } from './tabs-container/tabs-container.story';
import { StoryOfTimeInput } from './time-input/time-input.story';
import { StoryOfFloaterSelect } from './floater-select/floater-select.story';
import { StoryOfSimpleAudioPlayer } from './simple-audio-player/simple-audio-player.story';
import { StoryOfAudioPlayer } from './audio-player/audio-player.story';
import { StoryOfPhoneNumberView } from './phone-number-view/phone-number-view.story';
import { ActionButtonStory } from './action-button/action-button.story';
import { ButtonGroupStory } from './button-group/button-group.story';
import { StoryOfLocalePicker } from './locale-picker/locale-picker.story';
import { StoryOfConfirmModal } from './confirm-modal/confirm-modal.story';
import { StoryOfCategorySelectors } from './category-selectors/category-selectors.story';
import { EllipsisTextStory } from './ellipsis-text/ellipsis-text.story';
import { StoryOfFormInput } from './form-input/form-input.story';
import { StoryOfNavButtons } from './nav-button/nav-button.story';
import { ClickToCopyStory } from './click-to-copy/story';
import { StoryOfPhoneInput } from './phone-input/story';
import { StoryOfDateRangePicker } from './date-range-picker/story';
import { StoryOfCheckboxGroup } from './checkbox-group/story';
import { StoryOfDateRangeCompare } from './date-range-compare/story';
import { StoryOfAlertModal } from './alert-modal/alert-modal.story';
import { CombosStory } from './combos/story';
import { StoryOfUserPresence } from './user-presence/story';
import { EllipsisListStory } from './ellipsis-list/story';

export const CompositeStories = () => {
	return (
		<div className='story-container'>
			<h2 className='h2-title'>Composites</h2>

			<div className='preview'>
				<h3 className='h3-title'>Time Input</h3>
				<StoryOfTimeInput />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Search Input</h3>
				<StoryOfSearchInput />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Form Input</h3>
				<StoryOfFormInput />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Phone Number View</h3>
				<StoryOfPhoneNumberView />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Phone Input</h3>
				<StoryOfPhoneInput />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Collapsible Toggle</h3>
				<StoryOfCollapsibleToggle />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Collapsible Radio</h3>
				<StoryOfCollapsibleRadio />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Tabs Container</h3>
				<StoryOfTabsContainer />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Floater Menu</h3>
				<FloaterMenuStory />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Checkbox Group</h3>
				<StoryOfCheckboxGroup />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Floater Select</h3>
				<StoryOfFloaterSelect />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Locale Picker</h3>
				<StoryOfLocalePicker />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Category Selector</h3>
				<StoryOfCategorySelectors />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Simple Audio Player</h3>
				<StoryOfSimpleAudioPlayer />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Audio Player</h3>
				<StoryOfAudioPlayer />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Audio Uploader</h3>
				<StoryOfAudioUploader />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Action Button</h3>
				<ActionButtonStory />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Button Group</h3>
				<ButtonGroupStory />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Color Picker</h3>
				<StoryOfColorPicker />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Confirm Modal</h3>
				<StoryOfConfirmModal />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Alert Modal</h3>
				<StoryOfAlertModal />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Ellipsis Text</h3>
				<EllipsisTextStory />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Ellipsis List</h3>
				<EllipsisListStory />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Image Uploader</h3>
				<StoryOfImageUploader />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Nav Buttons</h3>
				<StoryOfNavButtons />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Click to copy</h3>
				<ClickToCopyStory />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Date Range</h3>
				<StoryOfDateRangePicker />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Date Range Compare</h3>
				<StoryOfDateRangeCompare />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>Combinations</h3>
				<CombosStory />
			</div>

			<div className='preview'>
				<h3 className='h3-title'>User Presence</h3>
				<StoryOfUserPresence />
			</div>
		</div>
	);
};
