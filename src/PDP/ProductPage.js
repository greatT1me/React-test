import Attribute from "./Attribute";
import DOMPurify from "dompurify";
import React, { Component } from "react";
import "./ProductPage.css";
import { client } from "../App";
import { ApolloProvider, gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";

export default class PDPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chosenImgUrl: "",
		};
		this.addPics = this.addPics.bind(this);
	}
	addPics(url, name, inStock) {
		return (
			<img
				key={this.props.id + url}
				src={url}
				alt={name + "image"}
				style={{ opacity: `${inStock ? null : "0.5"}` }}
				className="product_Choise"
				onClick={() =>
					this.state.chosenImgUrl !== url ? this.setState({ chosenImgUrl: url }) : null
				}
			/>
		);
	}
	render() {
		const { selectedCurrency, routeProps } = this.props;
		// Getting id as a prop from route, that is created on product card click,
		// and using this id, we fetch the needed data about this product.
		const { id } = routeProps.match.params;
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
          inStock
          name
          brand
          gallery
          description
          attributes{
            items {
              displayValue
              value
            }
            name
            type
            id
          }
        }
      }
    `;
		return (
			<ApolloProvider client={client}>
				<Query query={GET_PRODUCT_INFO}>
					{({ data }) => {
						if (data) {
							const { name, brand, gallery, attributes, description, prices, inStock } =
								data.product;
							// FirstImgUrl gives us url to img that is chosen by a user
							let firstImgUrl = !this.state.chosenImgUrl ? gallery[0] : this.state.chosenImgUrl;
							let PRICE;
							const OutOfStock = <div className="out_of_stock_pdp">OUT OF STOCK</div>;
							return (
								<div className="pdp_outer_container">
									<div className="pdp_inner_container">
										{/* Drawing choosable img-s list on left */}
										{gallery.map((img_url) => this.addPics(img_url, name, inStock))}
									</div>
									<div className="chosen_product_div">
										{/* The big, chosen picture on pdp */}
										<img
											src={firstImgUrl}
											alt="See product"
											className="chosen_product"
											style={{ opacity: `${inStock ? null : "0.5"}` }}
										/>
										{!inStock ? OutOfStock : null}
									</div>
									<div className="description">
										<h1 className="pdp_brand">{brand}</h1> {/* brand name*/}
										<h1 className="product_name">{name}</h1> {/* product name */}
										{prices.map((price) => {
											if (price.currency.symbol === selectedCurrency) {
												// Taking a right price for the product with selected currency
												PRICE = price.amount;
											}
											return null;
										})}
										{/* Creating all attributes at once */}
										<Attribute
											attributes={attributes}
											price={PRICE}
											selectedCurrency={selectedCurrency}
											addToCart={this.props.addToCart}
											id={id}
											inStock={inStock}
										/>
										<div
											className="description"
											dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
										></div>
									</div>
								</div>
							);
						}
						return null;
					}}
				</Query>
			</ApolloProvider>
		);
	}
}
