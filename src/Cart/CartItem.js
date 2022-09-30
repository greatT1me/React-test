import React, { Component } from "react";
import { client, MyContext } from "../App";
import { ApolloProvider, gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import LeftVector from "./left-Vector.svg";
import RightVector from "./right-Vector.svg";

let element;
let heightOfEl;
export class CartItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			picIndex: 0,
			deleted: false,
		};
		this.myRef = React.createRef();
		this.increase = this.increase.bind(this);
		this.decrease = this.decrease.bind(this);
		this.nextPic = this.nextPic.bind(this);
	}
	// static contextType = MyContext;

	prevPic(gallery) {
		// Gives us url of next img, if it is the last one, gives url of the firstone.
		const { picIndex } = this.state;
		if (picIndex > 0) {
			this.setState((st) => {
				return { picIndex: st.picIndex - 1 };
			});
		} else {
			this.setState({ picIndex: gallery.length - 1 });
		}
	}
	nextPic(gallery) {
		// Gives us url of previus img, if it is the firstone, gives url of the last one.
		const { picIndex } = this.state;
		const max = gallery.length - 1;
		if (picIndex < max) {
			this.setState((st) => {
				return { picIndex: st.picIndex + 1 };
			});
		} else {
			this.setState({ picIndex: 0 });
		}
	}
	increase() {
		const { itemInfo, UpdateItem, name } = this.props;
		// We update item ammount with UpdateItem function, that we got passed from app.js,
		// ammount in app.js will be updated, and so both minicart and cart will be affected.
		UpdateItem(name, "itemAmount", itemInfo.itemAmount + 1);
	}
	decrease() {
		const { itemInfo, UpdateItem, removeFromCart, name } = this.props;
		if (itemInfo.itemAmount > 1) {
			UpdateItem(name, "itemAmount", itemInfo.itemAmount - 1);
		} else {
			this.setState({ deleted: true });
			element = this.myRef.current;
			heightOfEl = getComputedStyle(element);
			setTimeout(() => removeFromCart(name, heightOfEl), [95]);
		}
	}
	render() {
		let selectedCurrency = MyContext._currentValue;
		const { itemInfo } = this.props;
		const { picIndex } = this.state;
		// We get id from app.js inCartItems, that is passed through cart.js.
		const { id } = itemInfo;
		const GET_PRODUCT_INFO = gql`
    query($id: String="${id}") {
      product(id:$id) {
        attributes{
          name
          type
          items {
            displayValue
            value
          }
        }
        prices{
          amount
          currency{
            label
            symbol
          }
        }
        name
        brand
        gallery
        description
      }
    }
  `;
		if (!this.state.deleted) {
			return (
				<ApolloProvider client={client}>
					<Query query={GET_PRODUCT_INFO}>
						{({ data }) => {
							if (data) {
								const { name, brand, gallery, attributes, prices } = data.product;
								let imgUrl = gallery[picIndex];
								let PRICE;
								return (
									<div className="cart_item_main" ref={this.myRef}>
										<hr className="divedeLine" />
										<div className="cartItem">
											<div>
												<h2 className="brand">{brand}</h2>
												<h2 className="pName">{name}</h2>
												{prices.map((price) => {
													if (price.currency.symbol === selectedCurrency) {
														PRICE = selectedCurrency + "" + price.amount;
														// Taking the right price and currency symbol.
													}
													return null;
												})}
												<h3 className="price">{PRICE}</h3>
												<div className="cart_attribute_box">
													{attributes.map((attribute) => {
														// Drawing each selected attribute with it's attribute name.
														const { type, name } = attribute;
														return (
															<div
																key={"cartItem" + this.props.name + name}
																className="align_center"
															>
																<div className="cart_attributeName">{name + ":"}</div>
																<div className="flex">
																	<div
																		key={this.props.name + name}
																		className="cart_attribute"
																		style={
																			type === "swatch"
																				? { backgroundColor: `${itemInfo[name]}` }
																				: null
																		}
																	>
																		{/* If the attribute is text write value, else don't write anything */}
																		{type !== "swatch" ? itemInfo[name] : null}
																	</div>
																</div>
															</div>
														);
													})}
												</div>
											</div>
											<div className="item_amount_control">
												{/* Container for "+", "-" and ammount */}
												<div className="plus_minus" onClick={this.increase}>
													{/* "+" container */}
													<hr className="minus_line" /> {/*Horizontal line for "+"*/}
													<hr className="vertical-line" /> {/*Vertical line for "+" */}
												</div>
												<div className="item_amount">{itemInfo.itemAmount}</div>
												<div className="plus_minus" onClick={this.decrease}>
													{" "}
													{/* "-" container */}
													<hr className="minus_line" /> {/*Horizontal line for "-"*/}
												</div>
											</div>
											<div className="item_pic">
												{gallery.length > 1 ? ( // If there are more then one img, for the product, draw arrows.
													<div className="leftVector" onClick={() => this.prevPic(gallery)}>
														<img src={LeftVector} alt="left vector" />
													</div>
												) : null}
												{gallery.length > 1 ? (
													<div className="rightVector ">
														<img
															src={RightVector}
															alt="right vector"
															onClick={() => this.nextPic(gallery)}
														/>
													</div>
												) : null}
												<img src={imgUrl} alt="See product" className="chosen_img" />
											</div>
										</div>
									</div>
								);
							}
							return null;
						}}
					</Query>
				</ApolloProvider>
			);
		} else {
			// When user deletes an item, a white box appears on it's place,
			// shrinking in height over 0.1 sec this gives us, little animation.
			return (
				<div
					className="smooth_delete"
					style={{
						animation: `deleting_smoothly ${
							heightOfEl ? heightOfEl * heightOfEl * heightOfEl + 10 : 10
						}s`,
					}}
				></div>
			);
		}
	}
}
// CartItem.contextType = MyContext;

export default CartItem;
