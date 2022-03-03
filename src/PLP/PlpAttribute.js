import React, { Component } from "react";
import "./PlpAttribute.css";

export class PlpAttribute extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.chooseValue = this.chooseValue.bind(this);
		this.chooseColor = this.chooseColor.bind(this);
		this.addToCartBtn = this.addToCartBtn.bind(this);
		this.checkItem = this.checkItem.bind(this);
	}
	chooseValue(text, attributeName) {
		let color;
		let backgroundColor;
		if (this.state[attributeName] === text) {
			color = "white";
			backgroundColor = "#1D1F22";
		} else {
			color = "black";
			backgroundColor = "white";
		}
		return (
			<div
				key={this.props.id + attributeName + text}
				style={{
					color: `${color}`,
					backgroundColor: `${backgroundColor}`,
					border: "1px solid #1D1F22",
				}}
				className="each_attribute"
				onClick={() => this.setState({ [attributeName]: text })}
			>
				{text}
			</div>
		);
	}
	chooseColor(color, attributeName) {
		let chosen = this.state[attributeName] === color ? true : false;
		return (
			<div
				key={this.props.id + color}
				style={{
					backgroundColor: `${color}`,
					color: `${color}`,
					border: `2px solid ${chosen ? "#1D1F22" : "#A6A6A6"}`,
				}}
				className="each_attribute"
				onClick={() => this.setState({ [attributeName]: color })}
			></div>
		);
	}
	addToCartBtn(itemToSend) {
		const ready = this.props.attributes.length === Object.keys(this.state).length;
		return (
			<div>
				<div
					className="add_btn_plp"
					style={{
						backgroundColor: `${ready ? "#5ECE7B" : "#c0bdbd"}`,
						cursor: `${ready ? "pointer" : "default"}`,
					}}
					onClick={() => this.checkItem(itemToSend)}
				>
					ADD TO CART
				</div>
			</div>
		);
	}
	checkItem(itemToSend) {
		// Checking if all the attributes are chosen.
		if (this.props.attributes.length === Object.keys(this.state).length) {
			//If yes, add to cart.
			this.props.addToCart(itemToSend);
		}
	}
	render() {
		const { attributes, price, id } = this.props;
		let newItemInfo = this.state;
		const itemToSend = { ...newItemInfo, id: id, price: price }; // Item inofo, to add to cart.
		return (
			<div className="pop_up_attributes">
				{attributes.map((attribute) => {
					// Mapping through all the attributes, to draw one by one.
					if (attribute.type === "text") {
						// If the attribute is text, like size or boolean.
						return (
							<div key={id + attribute.name}>
								<h3 className="attribute_name_plp">
									{/* Attribute name */}
									{attribute.name + ":"}
								</h3>
								<div className="flex">
									{attribute.items.map(
										// Drawing each value of each attribute.
										(item) => this.chooseValue(item.value, attribute.name)
									)}
								</div>
							</div>
						);
					} else if (attribute.type === "swatch") {
						// If the attribute is color, same goes here, as in case of text.
						return (
							<div key={id + attribute.name}>
								<h3 className="attribute_name_plp">{attribute.name + ":"}</h3>
								<div className="flex">
									{attribute.items.map((item) => this.chooseColor(item.value, attribute.name))}
								</div>
							</div>
						);
					}
					return null;
				})}
				{this.addToCartBtn(itemToSend)}
			</div>
		);
	}
}

export default PlpAttribute;
