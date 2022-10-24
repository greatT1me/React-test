import React, { Component } from "react";

export class FilterAttribute extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.handleCheckbox = this.handleCheckbox.bind(this);
	}

	handleCheckbox(e) {
		// save checkbox info on state
		let { attributeName, currentFilter, filterElse } = this.props;
		let newState = this.state;
		newState[e.target.value] = e.target.checked;
		this.setState(newState);
		if (e.target.checked) {
			// if checked, find products that offers the attribute options Yes/No
			filterElse("Yes", currentFilter, attributeName);
		} else {
			// else, any product is fine, even those, which do not offer anything
			filterElse("All", currentFilter, attributeName);
		}
	}
	render() {
		let { attributeName, currentFilter, attributeInfo, filterElse } = this.props;
		let attributeValues = attributeInfo;
		let type = attributeValues[0];

		return (
			<div>
				{attributeName}:{" "}
				{type !== "swatch" ? (
					attributeInfo.includes("Yes") && attributeInfo.includes("No") ? (
						// checkboxe
						<input
							className="filter_checkbox"
							type="checkbox"
							id="Yes_checkbox"
							value="Yes"
							onChange={this.handleCheckbox}
						/>
					) : (
						<select name={attributeName} id={attributeName + "id_for_select"}>
							{attributeValues.map((thisValue) => {
								if (thisValue !== "text") {
									return (
										<option
											onClick={() => filterElse(thisValue, currentFilter, attributeName)}
											key={thisValue + attributeName + "keyForMap"}
											value={thisValue}
										>
											{" "}
											{thisValue}
										</option>
									);
								} else {
									return null;
								}
							})}
						</select>
					)
				) : (
					<div className="flex color_filter_container">
						{/* draw colo boxes*/}
						{attributeValues.map((thisValue) => {
							const classNam =
								thisValue === currentFilter
									? "each_filter_colorbox filter_attribute_color_selected"
									: "each_filter_colorbox";
							if (thisValue !== "swatch") {
								// skip the first element of the array
								return thisValue === "All" ? (
									// the  "All" option box
									<div
										key={this.props.id + thisValue}
										// style={{
										// 	border: `2px solid ${thisValue === currentFilter ? "#1D1F22" : "#A6A6A6"}`,
										// }}
										className={classNam}
										onClick={() => filterElse(thisValue, currentFilter, attributeName)}
									>
										All
									</div>
								) : (
									// any box with color
									<div
										key={"filters" + thisValue}
										style={{
											backgroundColor: `${thisValue}`,
										}}
										className={classNam}
										onClick={() => filterElse(thisValue, currentFilter, attributeName)}
									></div>
								);
							} else {
								return null;
							}
						})}
					</div>
				)}
			</div>
		);
	}
}

export default FilterAttribute;
