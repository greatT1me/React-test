import React, { Component } from "react";
import "./Cart.css";
import CartItem from "./CartItem";
import { MyContext } from "../App";

export class Cart extends Component {
	render() {
		let totalPrice = 0;
		const { inCartItems, removeFromCart, UpdateItem } = this.props;
		let selectedCurrency = MyContext._currentValue;
		return (
			<div className="cart_main">
				<h1 className="word_Cart">CART</h1>
				{Object.keys(inCartItems).map((item) => {
					totalPrice += parseInt(inCartItems[item].price) * inCartItems[item].itemAmount;
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
				{Object.keys(inCartItems).length !== 0 ? (
					<div className="total">
						<div className="cart_total">TOTAL</div>
						<div className="cart_total_price">{selectedCurrency + totalPrice}</div>
					</div>
				) : null}
			</div>
		);
	}
}

export default Cart;
