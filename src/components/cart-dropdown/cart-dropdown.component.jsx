import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss';

const CartDropdown = () => {    
    const {cartItems, setIsCartOpen} = useContext(CartContext);
    const closeCart = () => setIsCartOpen(false);

    return(
        <div className='cart-dropdown-container'>
            <div className='cart-icons'/>
            <div className='cart-items'>
                {cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)}
            </div>               
            <Link className="checkout-button" to="/checkout" onClick={closeCart}>
                <Button>GO TO CHECKOUT</Button>
            </Link>
            
        </div>
    )
}

export default CartDropdown;