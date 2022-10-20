import { useContext } from "react";
import CheckOutItem from "../../components/checkout-item/checkout-item.component";
import { CartContext } from "../../contexts/cart.context";
import "./checkout.styles.scss";

const CheckOut = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-items-container">
        {cartItems.map((item) => (
          <CheckOutItem cartItem={item} key={item.id} />
        ))}        
      </div>
      <div className="total">
        <h1>Total: ${cartTotal}</h1>
      </div>
    </div>
  );
};

export default CheckOut;
