import "./App.css";
import { ApolloProvider, ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import { Component } from "react";
import Navbar from "./Navbar/Navbar";
import Content from "./PLP/Content";
import { Route, Switch, Redirect } from "react-router-dom";
import PDPage from "./PDP/ProductPage";
import Cart from "./Cart/Cart";
import MiniCart from "./MiniCart/MiniCart";

const client = new ApolloClient({
	uri: "http://localhost:4000/graphql",
	cache: new InMemoryCache(),
});
const GET_DATA = gql`
	query {
		categories {
			name
		}
	}
`;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedCurrency: "$",
			inCartItems: {},
			isMinicartOpen: false,
		};
		this.handleChoice = this.handleChoice.bind(this);
		this.addToCart = this.addToCart.bind(this);
		this.removeFromCart = this.removeFromCart.bind(this);
		this.UpdateItem = this.UpdateItem.bind(this);
		this.openMiniCart = this.openMiniCart.bind(this);
	}
	openMiniCart() {
		this.setState((st) => {
			return { isMinicartOpen: !st.isMinicartOpen };
		});
	}
	removeFromCart(itemId) {
		let newCart = this.state.inCartItems;
		delete newCart[itemId];
		this.setState({ inCartItems: newCart });
	}
	addToCart(item) {
		// Creating new object to add to cart.
		const newCart = this.state.inCartItems;
		let itemName = item.id;
		Object.keys(item)
			.sort()
			.forEach((key) => {
				if (key !== "id" && key !== "price") {
					itemName += "_" + item[key];
				}
			});
		if (this.state.inCartItems[itemName]) {
			this.UpdateItem(itemName, "itemAmount", this.state.inCartItems[itemName].itemAmount + 1);
		} else {
			newCart[itemName] = item;
			newCart[itemName]["itemAmount"] = 1;
			this.setState({ inCartItems: newCart });
		}
		// Key of this item will be it's id.
	}
	UpdateItem(itemName, attributeName, attributeValue) {
		// This is now used to update ammount only.
		const newAttributes = this.state.inCartItems[itemName];
		newAttributes[attributeName] = attributeValue;
		const newCart = this.state.inCartItems;
		newCart[itemName] = newAttributes;
		this.setState({ inCartItems: newCart });
	}
	handleChoice(selected) {
		this.setState({ selectedCurrency: selected });
	}
	render() {
		const { selectedCurrency, inCartItems, isMinicartOpen } = this.state;
		return (
			<ApolloProvider client={client}>
				<Query query={GET_DATA}>
					{({ data }) => {
						if (data) {
							let totalCartItemQuantity = 0;
							Object.keys(this.state.inCartItems).map((item) => {
								// calculating total cart item quantity, to pass than to navbar as a prop.
								totalCartItemQuantity += this.state.inCartItems[item].itemAmount;
								return null;
							});
							return (
								<div className="app">
									<Navbar
										data={data}
										handleChoice={this.handleChoice}
										selectedCurrency={selectedCurrency}
										totalCartItemQuantity={totalCartItemQuantity}
										openMiniCart={this.openMiniCart}
									/>
									<Switch>
										<Route
											exact
											path="/category/:category"
											render={(routeProps) => (
												<Content
													selectedCurrency={selectedCurrency}
													addToCart={this.addToCart}
													routeProps={routeProps}
												/>
											)}
										/>
										{/* // If we get id and link from product, that was clicked, 
                      // we create pdp route with them, and pass id as a prop to use than to fetch some data. */}
										<Route
											exact
											path="/category/:category/productId/:id"
											render={(routeProps) => (
												<PDPage
													selectedCurrency={this.state.selectedCurrency}
													addToCart={this.addToCart}
													routeProps={routeProps}
												/>
											)}
										/>
										<Route
											exact
											path="/category/all/Cart"
											render={() => (
												<Cart
													selectedCurrency={selectedCurrency}
													removeFromCart={this.removeFromCart}
													inCartItems={inCartItems}
													UpdateItem={this.UpdateItem}
												/>
											)}
										/>
										<Route exact path="/">
											<Redirect to="/category/all" />
										</Route>
									</Switch>
									{/* // If mini cart is open, a grey screen blocks everything behind the mini cart */}
									{isMinicartOpen ? (
										<MiniCart
											removeFromCart={this.removeFromCart}
											inCartItems={inCartItems}
											selectedCurrency={selectedCurrency}
											UpdateItem={this.UpdateItem}
											openMiniCart={this.openMiniCart}
										/>
									) : null}
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

export default App;
export { client };
