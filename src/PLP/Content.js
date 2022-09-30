import React, { Component } from "react";
import Product from "./Product";
import "./Content.css";
import { ApolloProvider, gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import { client, MyContext } from "../App";
import Filter from "./Filter";

export default class Content extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.changeFilter = this.changeFilter.bind(this);
	}
	changeFilter(linkAddition) {
		this.props.routeProps.history.push(
			`/category/${this.props.routeProps.match.params.category}${linkAddition}`
		);
	}
	render() {
		let selectedCurrency = MyContext._currentValue;
		const { addToCart, routeProps } = this.props;
		const { category, filtersString } = routeProps.match.params;
		let filters = filtersString.replace("filters:", "").split("&");
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
									let attributeList = {};
									data.category.products.forEach((product) => {
										product.attributes.forEach((attribute) => {
											if (!attributeList[attribute.name]) {
												attributeList[attribute.name] = [];
											}
											attribute.items.forEach((item) => {
												if (!attributeList[attribute.name].includes(item.value)) {
													attributeList[attribute.name].push(item.value);
												}
											});
											if (!attributeList[attribute.name].includes("All"))
												attributeList[attribute.name].unshift(attribute.type, "All");
										});
									});
									return (
										<div>
											{" "}
											<Filter
												attributeList={attributeList}
												changeFilter={this.changeFilter}
												filtersParam={filtersString}
												category={category}
											/>{" "}
											<div className="plp_list">
												{data.category.products.map((product) => {
													// Mapping through all the products, to work on each separately.
													product.prices.forEach((price) => {
														if (price.currency.symbol === selectedCurrency) {
															PRICE = price.amount;
															// Taking right price,for the product, with the selected currency.
														}
													});
													const { id, category } = product;
													const namesList = Object.keys(attributeList).sort();
													let check = true;
													filters.forEach((filter, index) => {
														if (filter !== "All" && check) {
															check = false;
															product.attributes.forEach((attribute) => {
																// with the index we can know where is the selected attribute value in the params.
																if (namesList[index] === attribute.name) {
																	attribute.items.forEach((item) => {
																		if (attribute.type === "swatch") {
																			if (item.value === "#" + filter) {
																				check = true;
																			}
																		} else {
																			if (item.value === filter) {
																				check = true;
																			}
																		}
																	});
																}
															});
														}
													});
													if (check || filters[0] === "") {
														return (
															<Product
																key={id}
																product={product}
																addToCart={addToCart}
																price={PRICE}
																category={category}
															/>
														);
													} else {
														return null;
													}
												})}
											</div>
										</div>
									);
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
