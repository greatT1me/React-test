import React, { Component } from "react";
import Product from "./Product";
import "./Content.css";
import { ApolloProvider, gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import { client } from "../App";

export default class Content extends Component {
	render() {
		const { selectedCurrency, addToCart, routeProps } = this.props;
		const { category } = routeProps.match.params;
		// Getting category name from app.js, and using it to fetch all we need on this category page.
		const GET_PRODUCT = gql`
      query($title: String="${category}") {
        category(input:{title:$title}){
          products{
            id
            attributes {
              name 
              type
              items {
                displayValue
                value
              }
            }
            inStock
            name
            brand
            id
            gallery
            category
            prices{
              amount
              currency{
                label
                symbol
              }
            }
          }
        }
      }
    `;
		return (
			<div className="plp">
				<h1 className="category_name">{this.props.name}</h1>
				<div className="content">
					<ApolloProvider client={client}>
						<Query query={GET_PRODUCT}>
							{({ data }) => {
								if (data) {
									let PRICE;
									return data.category.products.map((product) => {
										// Mapping through all the products, to work on each separately.
										product.prices.map((price) => {
											if (price.currency.symbol === selectedCurrency) {
												PRICE = price.amount;
												// Taking right price,for the product, with the selected currency.
											}
											return null;
										});
										const { id, category } = product;
										return (
											<Product
												key={id}
												product={product}
												selectedCurrency={this.props.selectedCurrency}
												addToCart={addToCart}
												price={PRICE}
												category={category}
											/>
										);
									});
								}
								return null;
							}}
						</Query>
					</ApolloProvider>
				</div>
			</div>
		);
	}
}
