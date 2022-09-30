import React, { Component } from "react";
import "./Content.css";
import FilterAttribute from "./FilterAttribute";

export class Filter extends Component {
	constructor(props) {
		super(props);
		this.state = { filteredAttributes: {} };
		this.filterElse = this.filterElse.bind(this);
		this.buildState = this.buildState.bind(this);
	}

	buildState() {
		// creates list of selected attributes, each with the value "All"
		let attributes = this.props.attributeList; // all attributes with their all possible values
		let stateAttributes = {};
		Object.keys(attributes)
			.sort()
			.forEach((attributeName) => {
				stateAttributes[attributeName] = attributes[attributeName][1]; //skipping type, the value on index 1 is All
			});
		this.setState((st) => {
			return { filteredAttributes: stateAttributes };
		});
	}
	filterElse(newChoise, oldChoise, attributeName) {
		if (newChoise !== oldChoise) {
			let newState = this.state.filteredAttributes;
			newState[attributeName] = newChoise;
			this.setState({ ...newState });
			let link = `/filters/filters:${Object.values(newState).join("&").replace("#", "")}`;
			this.props.changeFilter(link);
		}
	}
	componentDidMount() {
		this.buildState();
	}
	render() {
		let attributes = this.props.attributeList;
		return (
			<div className="filter">
				{Object.keys(attributes)
					.sort()
					.map((attribute) => {
						return (
							<div className="each_filter_attribute" key={"filters" + attribute}>
								<FilterAttribute
									filterElse={this.filterElse}
									currentFilter={this.state.filteredAttributes[attribute]}
									attributeInfo={attributes[attribute]}
									attributeName={attribute}
									linkAddition={Object.values(this.state.filteredAttributes)}
								/>
							</div>
						);
					})}
			</div>
		);
	}
	componentDidUpdate(prevProps) {
		if (prevProps.category !== this.props.category) {
			this.buildState();
		}
	}
}

export default Filter;
