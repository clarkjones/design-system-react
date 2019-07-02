/* eslint-disable no-console, react/prop-types */
import React from 'react';
import Combobox from '~/components/combobox';
import Icon from '~/components/icon';
import comboboxFilterAndLimit from '~/components/combobox/filter';
import IconSettings from '~/components/icon-settings';

const accounts = [
	{
		id: '1',
		label: 'Acme',
		subTitle: 'Account • San Francisco',
		type: 'account',
	},
	{
		id: '2',
		label: 'Salesforce.com, Inc.',
		subTitle: 'Account • San Francisco',
		type: 'account',
	},
	{
		id: '3',
		label: "Paddy's Pub",
		subTitle: 'Account • Boston, MA',
		type: 'account',
	},
];

const accountsWithIcon = accounts.map((elem) => ({
	...elem,
	...{
		icon: (
			<Icon
				assistiveText={{ label: 'Account' }}
				category="standard"
				name={elem.type}
			/>
		),
	},
}));

class Example extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			inputValue: '',
			selection: [],
		};
	}

	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Combobox
					id="combobox-unique-id"
					optionsSearchEntity={[
						{
							id: 'options-search-id-1',
							icon: (
								<Icon
									assistiveText={{ label: 'add' }}
									size="x-small"
									category="utility"
									name="search"
								/>
							),
							label: 'Search in Salesforce',
							onClick: (event) => {
								if (this.props.action) {
									this.props.action('onClick')(event);
								} else if (console) {
									console.log('onClick', event);
								}
							},
						},
						{
							id: 'search-in-account-id',
							icon: (
								<Icon
									assistiveText={{ label: 'add in Accounts' }}
									size="x-small"
									category="utility"
									name="search"
								/>
							),
							label: (searchTerm) => [
								searchTerm && searchTerm.length > 0 ? (
									<span className="slds-text-title_bold">{`"${searchTerm}" `}</span>
								) : (
									'Search '
								),
								'in Accounts',
							],
							onClick: (event) => {
								if (this.props.action) {
									this.props.action('onClick')(event);
								} else if (console) {
									console.log('onClick', event);
								}
							},
						},
					]}
					optionsAddItem={[
						{
							id: 'options-add-id-1',
							icon: (
								<Icon
									assistiveText={{ label: 'add' }}
									category="utility"
									size="x-small"
									name="add"
								/>
							),
							label: 'New Entity',
							onClick: (event) => {
								if (this.props.action) {
									this.props.action('onClick')(event);
								} else if (console) {
									console.log('onClick', event);
								}
							},
						},
					]}
					events={{
						onChange: (event, { value }) => {
							if (this.props.action) {
								this.props.action('onChange')(event, value);
							} else if (console) {
								console.log('onChange', event, value);
							}
							this.setState({ inputValue: value });
						},
						onRequestRemoveSelectedOption: (event, data) => {
							this.setState({
								inputValue: '',
								selection: data.selection,
							});
						},
						onSubmit: (event, { value }) => {
							if (this.props.action) {
								this.props.action('onChange')(event, value);
							} else if (console) {
								console.log('onChange', event, value);
							}
							this.setState({
								inputValue: '',
								selection: [
									...this.state.selection,
									{
										label: value,
										icon: (
											<Icon
												assistiveText="Account"
												category="standard"
												name="account"
											/>
										),
									},
								],
							});
						},
						onSelect: (event, data) => {
							if (this.props.action) {
								this.props.action('onSelect')(
									event,
									...Object.keys(data).map((key) => data[key])
								);
							} else if (console) {
								console.log('onSelect', event, data);
							}
							this.setState({
								inputValue: '',
								selection: data.selection,
							});
						},
					}}
					labels={{
						label: 'Search',
						placeholder: 'Search Salesforce',
					}}
					options={comboboxFilterAndLimit({
						inputValue: this.state.inputValue,
						options: accountsWithIcon,
						selection: this.state.selection,
					})}
					selection={this.state.selection}
					value={
						this.state.selectedOption
							? this.state.selectedOption.label
							: this.state.inputValue
					}
					variant="inline-listbox"
				/>
			</IconSettings>
		);
	}
}

Example.displayName = 'ComboboxExample';
export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
