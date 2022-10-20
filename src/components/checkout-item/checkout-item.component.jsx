import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./checkout-item.styles.scss";

const CheckOutItem = ({cartItem}) => {
    const {imageUrl, name, price, quantity} = cartItem;
    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);
    const addProductToCart = () => addItemToCart(cartItem);
    const removeProductFromCart = () => removeItemFromCart(cartItem);
    const clearProductFromCart = () => clearItemFromCart(cartItem);

  return (
    <div className="checkout-item-container">
    <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
    </div>
      
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="quantity">
            <span className="arrow" onClick={removeProductFromCart}>decrease</span>
            <span className="value">{quantity}</span>
            <span className="arrow" onClick={addProductToCart}>increase</span>
        </span>
        <span className="price">${price}</span>
        <span className="remove-button" onClick={clearProductFromCart}>
        x
        </span>
      </div>
    </div>
  );
};

export default CheckOutItem;
