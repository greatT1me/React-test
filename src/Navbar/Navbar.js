import { Component } from "react";
import "./Navbar.css";
import Brand_icon from "./Brand_icon.svg";
import Empty_Cart from "./Empty Cart.svg";
import DropdownCurrency from "./DropdownCurrency";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
	render() {
		const { handleChoice, selectedCurrency, openMiniCart, data, totalCartItemQuantity } =
			this.props;
		const itemsNum = totalCartItemQuantity;
		// Total quantity badge.
		const numCircle = <div className="num_circle">{itemsNum}</div>;
		return (
			<nav className="nav_bar">
				<div className="navigation">
					{/* Container for category links. */}
					{data.categories.map((category) => {
						const { name } = category;
						const link = `/category/${name}`;
						// Drawing category links.
						return (
							<NavLink
								to={link}
								activeClassName="active nav_btn"
								className="nav_btn"
								key={"key" + name}
							>
								{name}
							</NavLink>
						);
					})}
				</div>
				<img className="logo" src={Brand_icon} alt="logo" />
				<div className="end_part">
					{/* Container for dropdown currency and minicart img. */}
					<DropdownCurrency choose={handleChoice} choice={selectedCurrency} />
					<div className="pointer" onClick={openMiniCart}>
						<img src={Empty_Cart} alt="Empty cart" />
						{itemsNum > 0 ? numCircle : null}
					</div>
				</div>
			</nav>
		);
	}
}

export default Navbar;
