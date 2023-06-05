import "./shop-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assests/shopping-bag.svg";
import { useContext } from "react";
import { CartContext } from "../../context/shopcart.context";

const ShopIcon = () => {
  const { isOpen, setIsOpen, cartCount } = useContext(CartContext);
  const toggleCart = () => setIsOpen(!isOpen);
  return (
    <div className="cart-icon-container" onClick={toggleCart}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default ShopIcon;
