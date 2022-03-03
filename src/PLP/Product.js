import React, { Component } from "react";
import PlpAttribute from "./PlpAttribute";
import Common from "./Common.svg";
import "./Product.css";
import { Link } from "react-router-dom";

export default class Product extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hovered: false,
			isAttributesOpen: false,
		};
		this.handleEnter = this.handleEnter.bind(this);
		this.handleLeave = this.handleLeave.bind(this);
		this.openPlpAttributes = this.openPlpAttributes.bind(this);
		this.closePlpAttributes = this.closePlpAttributes.bind(this);
	}
	handleEnter() {
		this.setState({ hovered: true });
		// After this comma will appear.
	}
	handleLeave() {
		this.setState({ hovered: false });
		// After this comma will disappear.
	}
	openPlpAttributes() {
		// Open and close plp attributes, on comma-click
		this.setState((st) => {
			return { isAttributesOpen: !st.isAttributesOpen };
		});
	}
	closePlpAttributes() {
		// Close plp attributes on outclick
		if (this.state.isAttributesOpen) {
			this.setState({ isAttributesOpen: false });
		}
	}
	render() {
		const { product, price, addToCart, selectedCurrency } = this.props;
		const { inStock, id, attributes, category } = product;
		const link = `/category/${category}/productId/${product.id}`;
		const itemToSend1 = { id: product.id, price: price };
		// Comma, the green circle,that appears on product card hover, with cart sign on it, for quick adding to cart.
		const comma = (
			<img
				className="common"
				src={Common}
				alt="addIntoCartIcon"
				onClick={() => {
					attributes.length > 0 ? this.openPlpAttributes() : this.props.addToCart(itemToSend1);
				}}
			/>
		);
		const OutOfStock = <div className="out_of_stock">OUT OF STOCK</div>;
		const classNameForProduct = `product ${inStock ? "product1" : null}`;
		const classNameForLink = `ProductPage ${inStock ? null : "productPage_nomore"}`;
		return (
			<div tabIndex={1} onBlur={this.closePlpAttributes}>
				<div
					onMouseEnter={this.handleEnter}
					onMouseLeave={this.handleLeave}
					className={classNameForProduct}
				>
					{/*Sending id and link to app.js, to create route for pdp of this product */}
					<Link to={link} className={classNameForLink}>
						<div className="plp_product_img_container">
							{/* plp-product img container */}
							<img
								src={product.gallery[0]}
								alt={product.name}
								style={{ opacity: `${inStock ? null : "0.5"}` }}
								className="plp_product_img"
							/>
						</div>
						<p
							style={{ color: `${inStock ? " #1D1F22" : " #8D8F9A"}` }}
							className="product_card_brand_name"
						>
							{product.brand + " " + product.name}
						</p>
						<p
							style={{ color: `${inStock ? " #1D1F22" : " #8D8F9A"}` }}
							className="product_card_price"
						>
							{selectedCurrency + price}
						</p>
						{!inStock ? OutOfStock : null}
						{/* If the product is out of stock, write "OUT OF STOCK" */}
					</Link>
					{this.state.hovered && inStock ? comma : null}
					{this.state.isAttributesOpen && attributes.length > 0 ? (
						//If the product has attributes, show on click, else add to car on click.
						<PlpAttribute id={id} attributes={attributes} price={price} addToCart={addToCart} />
					) : null}
				</div>
			</div>
		);
	}
}
