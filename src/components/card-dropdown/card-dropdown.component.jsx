import "./card-dropdown.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../context/shopcart.context";
import Button from "../button/button.component";
import CardItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";

const CardDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const gotoCheckoutHandler = () => {
    navigate("/checkout");
  };
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CardItem key={item.id} cardItem={item} />
        ))}
      </div>

      <Button onClick={gotoCheckoutHandler}>CHECKOUT</Button>
    </div>
  );
};
export default CardDropdown;
