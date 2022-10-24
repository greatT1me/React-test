import React, { Component } from "react";
import { MyContext } from "../App";

export class Attribute extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.chooseValue = this.chooseValue.bind(this);
		this.chooseColor = this.chooseColor.bind(this);
		this.addToCartBtn = this.addToCartBtn.bind(this);
		this.checkItem = this.checkItem.bind(this);
	}
	chooseValue(text, attributeName) {
		// This function draw single box of a text type attribute,
		// using map it draws all the boxes of the given single attribute.
		let color;
		let backgroundColor;
		let { inStock } = this.props;
		if (this.state[attributeName] === text) {
			// When chosen.
			color = "white";
			backgroundColor = "#1D1F22";
		} else if (!inStock) {
			// When out of stock.
			color = "#A6A6A6";
		} else {
			// When not chosen.
			color = "black";
			backgroundColor = "white";
		}
		return (
			<div
				key={this.props.id + attributeName + text}
				style={{
					border: `1px solid ${inStock ? "#1D1F22" : "#A6A6A6"}`,
					pointerEvents: `${this.props.inStock ? null : "none"}`,
					color: `${color}`,
					backgroundColor: `${backgroundColor}`,
				}}
				className="attribute_row"
				onClick={() => this.setState({ [attributeName]: text })}
			>
				{text}
			</div>
		);
	}
	chooseColor(color, attributeName) {
		// This function draw single box of color type attribute,
		// using map it draws all the boxes of the given single attribute.
		let chosen = this.state[attributeName] === color ? true : false;
		// choose className for selected and not selected colorboxes
		const classNam = chosen ? "attribute_color attribute_color_selected" : "attribute_color";
		return (
			<div
				key={this.props.id + color}
				style={{
					// border: `3px solid ${chosen ? "#1D1F22" : "#A6A6A6"}`,
					opacity: `${this.props.inStock ? null : 0.7}`,
					color: `${color}`,
					backgroundColor: `${color}`,
					pointerEvents: `${this.props.inStock ? null : "none"}`,
				}}
				className={classNam}
				onClick={() => this.setState({ [attributeName]: color })}
			></div>
		);
	}
	addToCartBtn(itemToSend) {
		// Checks if every atrtribute is chosen, to change btn-s color to green.
		const ready = this.props.attributes.length === Object.keys(this.state).length;
		let selectedCurrency = MyContext._currentValue;
		let PRICE = 0;
		this.props.prices.forEach((price) => {
			if (price.currency.symbol === selectedCurrency) {
				// Taking a right price for the product with selected currency
				PRICE = price.amount;
			}
		});
		return (
			<div>
				<h3 className="pdp_word_price">price:</h3>
				<h2 className="pdp_price">{selectedCurrency + PRICE}</h2>
				<div
					className="add_btn"
					style={{
						backgroundColor: `${ready && this.props.inStock ? "#5ECE7B" : "#c0bdbd"}`,
						cursor: `${ready ? "pointer" : "default"}`,
						pointerEvents: `${this.props.inStock ? null : "none"}`,
					}}
					onClick={() => this.checkItem(itemToSend)}
				>
					ADD TO CART
				</div>
			</div>
		);
	}
	checkItem(itemToSend) {
		// Checks if every atrtribute is chosen, to add item to cart.
		if (this.props.attributes.length === Object.keys(this.state).length) {
			this.props.addToCart(itemToSend);
		}
	}
	render() {
		const { attributes, prices, id } = this.props;
		let newItemInfo = this.state;
		const itemToSend = { ...newItemInfo, id: id, prices: prices };
		return (
			<div>
				{attributes.map((attribute) => {
					if (attribute.type === "text") {
						return (
							<div key={id + attribute.name}>
								<h3 className="attribute_name">{attribute.name + ":"}</h3>
								<div className="flex">
									{/* Drawing all attributes, with text type, like size or boolean. */}
									{attribute.items.map((item) => this.chooseValue(item.value, attribute.name))}
								</div>
							</div>
						);
					} else if (attribute.type === "swatch") {
						// Drawing color aattribute.
						return (
							<div key={id + attribute.name}>
								<h3 className="attribute_name">{attribute.name + ":"}</h3>
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

export default Attribute;
