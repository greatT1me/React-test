import React, { Component } from "react";
import MiniCartItem from "./MiniCartItem";
import "./MiniCart.css";
import { Link } from "react-router-dom";

export class MiniCart extends Component {
	render() {
		const { selectedCurrency, inCartItems, removeFromCart, UpdateItem, openMiniCart } = this.props;
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
							// Calculating total price
							totalPrice += parseInt(inCartItems[item].price) * inCartItems[item].itemAmount;
							// Adding item to minicart.
							return (
								<MiniCartItem
									key={"miniCart" + item}
									selectedCurrency={selectedCurrency}
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
