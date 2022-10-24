import React, { Component } from "react";
import { ApolloProvider, gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import { client, MyContext } from "../App";

export class MiniCartItem extends Component {
	constructor(props) {
		super(props);
		this.increase = this.increase.bind(this);
		this.decrease = this.decrease.bind(this);
	}
	increase() {
		const { itemInfo, UpdateItem, name } = this.props;
		// We update item ammount with UpdateItem function, that we got passed from app.js,
		// ammount in app.js will be updated, and so both minicart and cart will be affected.
		UpdateItem(name, "itemAmount", itemInfo.itemAmount + 1);
	}
	decrease() {
		const { itemInfo, UpdateItem, removeFromCart, name } = this.props;
		// If ammount is more then 1, we decrease it, otherwise we delete the item drom the cart.
		if (itemInfo.itemAmount > 1) {
			UpdateItem(name, "itemAmount", itemInfo.itemAmount - 1);
		} else {
			removeFromCart(name);
		}
	}
	render() {
		let selectedCurrency = MyContext._currentValue;
		const { itemInfo } = this.props;
		// We get id from app.js inCartItems, that is passed through minicart.
		const { id } = itemInfo;
		const GET_PRODUCT_INFO = gql`
      query($id: String="${id}") {
        product(id:$id) {
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
          attributes{
            name
            type
            items {
              displayValue
              value
            }
          }
        }
      }
    `;
		return (
			<div>
				<ApolloProvider client={client}>
					<Query query={GET_PRODUCT_INFO}>
						{({ data }) => {
							if (data) {
								const { name, brand, gallery, attributes, prices } = data.product;
								let imgUrl = gallery[0];
								let PRICE;
								return (
									<div className="mini_cartItem">
										<div>
											<h2 className="mini_brand_name">
												{brand} <br />
												{name}
											</h2>
											{prices.map((price) => {
												if (price.currency.symbol === selectedCurrency) {
													PRICE = selectedCurrency + "" + price.amount;
													// Taking the right price and currency symbol.
												}
												return null;
											})}
											<h3 className="mini_price">{PRICE}</h3>
											<div className="mini_attributes_container">
												{/* Container for attributes */}
												{attributes.map((attribute) => {
													//________________________________________________________________________________
													// Drawing each selected attribute with it's attribute name.
													const { type, name } = attribute;
													return (
														<div
															key={"miniCartItem" + this.props.name + name}
															className="align_center"
														>
															<div className="mini_attributeName">{name + ":"}</div>
															<div className="flex">
																{attribute.items.map((item) => {
																	const { value } = item;
																	// console.log(attribute);
																	const classNam =
																		type === "swatch" //if swatch
																			? itemInfo[name] === value //and selected
																				? "minicart_attribute_color minicart_attribute_color_selected"
																				: // add some green outline
																				  "minicart_attribute_color"
																			: itemInfo[name] === value // if selected value
																			? "minicart_attribute minicart_attribute_value_selected"
																			: // give black background and white font
																			  "minicart_attribute";

																	return (
																		<div
																			key={this.props.name + name + value}
																			className={classNam}
																			style={
																				type === "swatch"
																					? //itemInfo[name]
																					  { backgroundColor: value }
																					: null
																			}
																		>
																			{/*If the attribute is text write value, else don't write anything */}
																			{type !== "swatch" ? value : null}
																		</div>
																	);
																})}
															</div>
														</div>
													);
												})}
											</div>
										</div>
										<div className="mini_item_amount_control">
											{/* Container for "+", "-" and ammount */}
											<div className="mini_plus_minus" onClick={this.increase}>
												{/* "+" container */}
												<hr className="mini_minus_line" /> {/*Horizontal line for "+"*/}
												<hr className="mini_vertical-line" /> {/*Vertical line for "+" */}
											</div>
											<div className="mini_item_amount">{itemInfo.itemAmount}</div>
											<div className="mini_plus_minus" onClick={this.decrease}>
												{" "}
												{/* "-" container */}
												<hr className="mini_minus_line" /> {/*Horizontal line for "-"*/}
											</div>
										</div>
										<div className="mini_item_pic">
											<img src={imgUrl} alt="See product" className="mini_chosen_img" />
										</div>
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

export default MiniCartItem;
