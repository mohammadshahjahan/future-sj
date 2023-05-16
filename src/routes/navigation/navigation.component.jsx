import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { UserContext } from "../../context/user.context";
import { ReactComponent as FutsjLogo } from "../../assests/logo.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { CartContext } from "../../context/shopcart.context";

import "./navigation.styles.scss";
import ShopIcon from "../../components/shop-icon/shop-icon.component";
import CardDropdown from "../../components/card-dropdown/card-dropdown.component";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isOpen } = useContext(CartContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <FutsjLogo className="logo" />
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <ShopIcon />
        </div>
        {isOpen && <CardDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
