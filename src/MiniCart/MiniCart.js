import React, { Component } from "react";
import MiniCartItem from "./MiniCartItem";
import "./MiniCart.css";
import { Link } from "react-router-dom";
import { MyContext } from "../App";

export class MiniCart extends Component {
	render() {
		let selectedCurrency = MyContext._currentValue;
		const { inCartItems, removeFromCart, UpdateItem, openMiniCart } = this.props;
		const itemsNum = Object.keys(inCartItems).length; // Tells us how many items are in the cart
		let totalPrice = 0;
		return (
			<div className="grey_screen" tabIndex={0} onClick={openMiniCart}>
				{/*grey screen */}
				<div className="main_container" onClick={openMiniCart}>
					<h1 className="my_bag">
						My Bag ,
						<span className="lighter">
							{itemsNum === 0 ? " Empty" : itemsNum === 1 ? " 1 item" : itemsNum + " items"}
						</span>
					</h1>
					<div className="scroll_container">
						{Object.keys(inCartItems).map((item) => {
							let PRICE = 0;
							this.props.inCartItems[item].prices.forEach((price) => {
								if (price.currency.symbol === selectedCurrency) {
									// Taking a right price for the product with selected currency
									PRICE = price.amount;
								}
							});
							// Calculating total price

							totalPrice += parseInt(PRICE) * inCartItems[item].itemAmount;
							// Adding item to minicart.
							return (
								<MiniCartItem
									key={"miniCart" + item}
									itemInfo={inCartItems[item]}
									name={item}
									removeFromCart={removeFromCart}
									UpdateItem={UpdateItem}
								/>
							);
						})}
					</div>
					<div className="total">
						<h3 className="word_total">TOTAL </h3>
						<div className="total_price">{selectedCurrency + totalPrice}</div>
						<Link to="/category/all/Cart" className="no_text_deco">
							<div onClick={openMiniCart} className="view_bag">
								VIEW BAG
							</div>
						</Link>
						<div className="check_out">CHECK OUT</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MiniCart;
