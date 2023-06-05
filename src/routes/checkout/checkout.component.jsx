import { useContext } from "react";
import { CartContext } from "../../context/shopcart.context";
import "./checkout.styles.scss";
import CheckoutItems from "../../components/checkout-items/checkout-items.component";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Products</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>

      {cartItems.map((cartItem) => (
        <CheckoutItems key={cartItem.id} cartItem={cartItem} />
      ))}
      <span className="total">Total : ${cartTotal}</span>
    </div>
  );
};
export default Checkout;
