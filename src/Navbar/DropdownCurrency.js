import React, { Component } from "react";
import vectorDown from "./Vector Down.svg";
import vectorUp from "./Vector.svg";
import "./DropdownCurrency.css";
import { client, MyContext } from "../App";
import { ApolloProvider, gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";

export default class DropdownCurrency extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
		};
		this.toggleDropdown = this.toggleDropdown.bind(this);
		this.closeDropdown = this.closeDropdown.bind(this);
	}
	toggleDropdown() {
		// Opens and closes dropdown currency on clikc, including on currency select.
		this.setState((st) => {
			return { isOpen: !st.isOpen };
		});
	}
	closeDropdown() {
		// Closes dropdown currency on out click.
		if (this.state.isOpen) {
			this.setState({ isOpen: false });
		}
	}
	render() {
		let selectedCurrency = MyContext._currentValue;
		const GET_CURRENCIES = gql`
			query {
				currencies {
					label
					symbol
				}
			}
		`;
		return (
			<div
				className="pointer"
				tabIndex={0}
				onBlur={this.closeDropdown}
				onClick={this.toggleDropdown}
			>
				<div className="outer_box">
					<div className="inner_box">{selectedCurrency}</div>
					<img className="vector" src={!this.state.isOpen ? vectorDown : vectorUp} alt="vector" />
				</div>
				<ApolloProvider client={client}>
					<Query query={GET_CURRENCIES}>
						{({ data }) => {
							if (data && this.state.isOpen) {
								// Dropdown currency appears when this.state.isOpen is true.
								return (
									<div className="dropdown">
										{data.currencies.map((currency) => {
											const { symbol, label } = currency;
											//  Adding currencies to the dropdown.
											return (
												<div
													key={label}
													className="currencyValue currencyValueHovered"
													onClick={() => this.props.choose(symbol)}
												>
													{symbol + " " + label}
												</div>
											);
										})}
									</div>
								);
							}
							return null;
						}}
					</Query>
				</ApolloProvider>
			</div>
		);
	}
}
