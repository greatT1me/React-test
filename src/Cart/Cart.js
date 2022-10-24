import React, { Component } from "react";
import "./Cart.css";
import CartItem from "./CartItem";
import { MyContext } from "../App";

export class Cart extends Component {
	render() {
		let totalPrice = 0;
		const { inCartItems, removeFromCart, UpdateItem, totalCartItemQuantity } = this.props;
		let selectedCurrency = MyContext._currentValue;
		return (
			<div className="cart_main">
				<h1 className="word_Cart">CART</h1>
				{Object.keys(inCartItems).map((item) => {
					let PRICE = 0;
					this.props.inCartItems[item].prices.forEach((price) => {
						if (price.currency.symbol === selectedCurrency) {
							// Taking a right price for the product with selected currency
							PRICE = price.amount;
						}
					});
					totalPrice += parseInt(PRICE) * inCartItems[item].itemAmount;
					// Draws all the items in the cart, one by one.
					return (
						<CartItem
							key={"cart" + item}
							itemInfo={inCartItems[item]}
							name={item}
							removeFromCart={removeFromCart}
							UpdateItem={UpdateItem}
						/>
					);
				})}
				<hr className="divedeLine" />
				{Object.keys(inCartItems).length !== 0 ? (
					<div className="bottom_part">
						<div className="grit_column">Tax 21%:</div>
						<div className="cart_total_price">{selectedCurrency + parseInt(totalPrice * 0.21)}</div>
						<div className="grit_column">Quantity:</div>
						<div className="cart_total_price">{totalCartItemQuantity}</div>
						<div className="cart_total">Total:</div>
						<div className="cart_total_price">{selectedCurrency + totalPrice}</div>
					</div>
				) : null}
				<div className="order">ORDER</div>
			</div>
		);
	}
}

export default Cart;
