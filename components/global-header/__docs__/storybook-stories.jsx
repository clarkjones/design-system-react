import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Avatar from '../../avatar';
import Dropdown from '../../menu-dropdown';
import GlobalHeader from '../../global-header';
import GlobalHeaderFavorites from '../../global-header/favorites';
import GlobalHeaderHelp from '../../global-header/help';
import GlobalHeaderNotifications from '../../global-header/notifications';
import GlobalHeaderProfile from '../../global-header/profile';
import GlobalHeaderSearch from '../../global-header/search';
import GlobalHeaderSetup from '../../global-header/setup';
import GlobalHeaderTask from '../../global-header/task';
import IconSettings from '../../icon-settings';
import Popover from '../../popover';

import { GLOBAL_HEADER } from '../../../utilities/constants';

import Default from '../__examples__/default';

// import globalNavigationBar from '../../global-navigation-bar/__docs__/storybook-stories';

/* eslint-disable react/prop-types */
/* eslint-disable no-script-url */
/* eslint-disable react/display-name */

const HeaderProfileCustomContent = (props) => (
	<div id="custom-popover-content">
		<div className="slds-m-around_medium">
			<div className="slds-tile slds-tile_board slds-m-horizontal_small">
				<p className="tile__title slds-text-heading_small">Art Vandelay</p>
				<div className="slds-tile__detail">
					<p className="slds-truncate">
						<a
							className="slds-m-right_medium"
							href="javascript:void(0)"
							onClick={props.onClick}
						>
							Settings
						</a>
						<a href="javascript:void(0)" onClick={props.onClick}>
							Log Out
						</a>
					</p>
				</div>
			</div>
		</div>
	</div>
);

/* eslint-disable react/display-name */
class GlobalHeaderDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			favoritesActionSelected: false,
		};
	}

	render() {
		return (
			<GlobalHeader
				onSkipToContent={action('Skip to Main Content')}
				onSkipToNav={action('Skip to Navigation')}
				// Add back for visual review with navigation present.
				// The presence of React Modal in App Launcher in Global Navigation prevents Jest (node) testing.
				// navigation={globalNavigationBar(props)}
				assistiveText={{
					skipToContent: 'Skip to Main Content',
					skipToNavAssistiveText: 'Skip to Navigation',
				}}
			>
				<GlobalHeaderSearch
					labels={{ placeholder: 'Search Salesforce' }}
					onSelect={action('Search Selected')}
					options={[
						{ id: 'email', label: 'Email' },
						{ id: 'mobile', label: 'Mobile' },
					]}
				/>
				<GlobalHeaderFavorites
					actionSelected={this.state.favoritesActionSelected}
					onToggleActionSelected={(event, data) => {
						this.setState({ favoritesActionSelected: !data.actionSelected });
					}}
				/>
				<GlobalHeaderTask
					dropdown={
						<Dropdown>
							<ul className="slds-dropdown__list" role="menu">
								<li className="slds-dropdown__item" role="presentation">
									<a href="javascript:void(0);" role="menuitem" tabIndex="0">
										<span className="slds-truncate" title="New Event">
											Settings One
										</span>
									</a>
								</li>
								<li className="slds-dropdown__item" role="presentation">
									<a href="javascript:void(0);" role="menuitem" tabIndex="0">
										<span className="slds-truncate" title="New Note">
											Settings Two
										</span>
									</a>
								</li>
							</ul>
						</Dropdown>
					}
				/>
				<GlobalHeaderHelp />
				<GlobalHeaderSetup
					dropdown={
						<Dropdown>
							<ul className="slds-dropdown__list" role="menu">
								<li className="slds-dropdown__item" role="presentation">
									<a href="javascript:void(0);" role="menuitem" tabIndex="0">
										<span className="slds-truncate" title="New Event">
											New Event
										</span>
									</a>
								</li>
								<li className="slds-dropdown__item" role="presentation">
									<a href="javascript:void(0);" role="menuitem" tabIndex="0">
										<span className="slds-truncate" title="New Note">
											New Note
										</span>
									</a>
								</li>
							</ul>
						</Dropdown>
					}
				/>
				<GlobalHeaderNotifications notificationCount={5} />
				<GlobalHeaderProfile
					avatar={this.props.avatar}
					popover={<Popover body={<HeaderProfileCustomContent />} />}
					userName="Art Vandelay"
				/>
			</GlobalHeader>
		);
	}
}

storiesOf(GLOBAL_HEADER, module)
	.addDecorator((getStory) => (
		<div className="slds-p-around_medium">
			<IconSettings iconPath="/assets/icons">{getStory()}</IconSettings>
		</div>
	))
	.add('Search + Navigation', () => <GlobalHeaderDemo />)
	.add('Fewer Elements', () => (
		<GlobalHeader logoSrc="/assets/images/global-header/logo.svg">
			<GlobalHeaderSetup
				dropdown={
					<Dropdown>
						<ul className="slds-dropdown__list" role="menu">
							<li className="slds-dropdown__item" role="presentation">
								<a href="javascript:void(0);" role="menuitem" tabIndex="0">
									<span className="slds-truncate" title="New Event">
										New Event
									</span>
								</a>
							</li>
							<li className="slds-dropdown__item" role="presentation">
								<a href="javascript:void(0);" role="menuitem" tabIndex="0">
									<span className="slds-truncate" title="New Note">
										New Note
									</span>
								</a>
							</li>
						</ul>
					</Dropdown>
				}
			/>
			<GlobalHeaderProfile
				popover={<Popover body={<HeaderProfileCustomContent />} />}
				userName="Art Vandelay"
			/>
		</GlobalHeader>
	))
	.add('With custom <Avatar/>', () => (
		<GlobalHeaderDemo avatar={<Avatar variant="user" label="Art Vandelay" />} />
	))
	.add('Doc site Default', () => <Default />);
