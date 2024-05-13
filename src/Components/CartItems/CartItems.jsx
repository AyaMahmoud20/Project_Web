import './CartItems.css';
import { ShopContext } from '../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import React, { useContext, useState, useEffect } from 'react';

const CartItems = () => {
  const {
    getTotalCartAmount,
    all_product,
    cartItems,
    removeFromCart,
    calculateShipping,
    calculateTax,
  } = useContext(ShopContext);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const openCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const fetchCoupons = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/coupons');
      if (!response.ok) {
        throw new Error('Failed to fetch coupons');
      }
      const data = await response.json();
      setCoupons(data);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  const applyPromoCode = () => {
    const coupon = coupons.find((c) => c.name === promoCode);
    if (coupon) {
      setDiscount(coupon.discount);
      alert(`Promo code applied! You get a discount of ${coupon.discount}%`);
    } else {
      setDiscount(0);
      alert('Invalid promo code');
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const calculateDiscountedTotal = () => {
    const subtotal = getTotalCartAmount();
    const discountedTotal = subtotal - (subtotal * discount) / 100;
    return discountedTotal;
  };

  return (
    <div className='cartitems-container'>
      <div className='cartitems'>
        <div className='cartitems-format-main'>
          <p>Products</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {all_product.map((e) => {
          if (cartItems[e.id] > 0) {
            return (
              <div key={e.id}>
                <div className='cartitems-format cartitems-format-main'>
                  <img src={e.image} alt='' className='carticon-product-icon' />
                  <p>{e.name}</p>
                  <p>${e.new_price}</p>
                  <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                  <p>${e.new_price * cartItems[e.id]}</p>
                  <img
                    className='cartitems-remove-icon'
                    src={remove_icon}
                    onClick={() => removeFromCart(e.id)}
                    alt=''
                  />
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
        <div className='cartitems-down'>
          <div className='cartitems-total'>
            <h1>Cart Totals</h1>
            <div>
              <div className='cartitems-total-item'>
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className='cartitems-total-item'>
                <p>Shipping Fee</p>
                <p>${calculateShipping()}</p>
              </div>
              <hr />
              <div className='cartitems-total-item'>
                <p>Tax</p>
                <p>${calculateTax()}</p>
              </div>
              <hr />
              <div className='cartitems-total-item'>
                <h3>Total</h3>
                <h3>${calculateDiscountedTotal()}</h3>
              </div>
            </div>
            <button onClick={openCheckout}>PROCEED TO CHECKOUT</button>
          </div>
          {isCheckoutOpen && (
            <div className='checkout-popup'>
              <p>Total Price: ${calculateDiscountedTotal()}</p>
              <select>
                <option value='visa'>Visa</option>
                <option value='fawry'>Fawry Cash</option>
                <option value='paypal'>Paypal</option>
              </select>
              <button>Confirm</button>
              <button onClick={closeCheckout}>Close</button>
            </div>
          )}
        </div>
      </div>
      <div className='cartitems-promocode'>
        <p>If you have a promocode, enter it here</p>
        <div className='cartitems-promobox'>
          <input
            type='text'
            placeholder='Promo code'
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <button onClick={applyPromoCode}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;


/*const CartItems = () => {
  const {
    getTotalCartAmount,
    updateCartItems,  // Ensure this function is defined in your ShopContext to update cart items
    calculateShipping,
    calculateTax,
  } = useContext(ShopContext);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState('123'); // Example user ID, replace with actual dynamic user ID if needed

  useEffect(() => {
    fetchCart();
    fetchCoupons();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }
      const cart = await response.json();
      setCartItems(cart.items); // Directly setting cart items in state
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const fetchCoupons = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/coupons');
      if (!response.ok) {
        throw new Error('Failed to fetch coupons');
      }
      const data = await response.json();
      setCoupons(data);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  const applyPromoCode = () => {
    const coupon = coupons.find((c) => c.name === promoCode);
    if (coupon) {
      setDiscount(coupon.discount);
      alert(`Promo code applied! You get a discount of ${coupon.discount}%`);
    } else {
      setDiscount(0);
      alert('Invalid promo code');
    }
  };

  const calculateDiscountedTotal = () => {
    const subtotal = getTotalCartAmount();
    const discountedTotal = subtotal - (subtotal * discount) / 100;
    return discountedTotal;
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${userId}/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId })
      });
      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }
      const updatedCart = await response.json();
      setCartItems(updatedCart.items); // Update cart items in the local state
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };
  
  const openCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <div className='cartitems-container'>
      <div className='cartitems'>
        <div className='cartitems-format-main'>
          <p>Products</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {cartItems.map((item) => (
          <div key={item.productId._id}>
            <div className='cartitems-format cartitems-format-main'>
              <img src={item.productId.image} alt='' className='carticon-product-icon' />
              <p>{item.productId.title}</p>
              <p>${item.productId.price}</p>
              <button className='cartitems-quantity'>{item.quantity}</button>
              <p>${item.productId.price * item.quantity}</p>
              <img
                className='cartitems-remove-icon'
                src={remove_icon}
                onClick={() => removeFromCart(item.productId._id)}
                alt=''
              />
            </div>
            <hr />
          </div>
        ))}
        <div className='cartitems-down'>
          <div className='cartitems-total'>
            <h1>Cart Totals</h1>
            <div>
              <div className='cartitems-total-item'>
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className='cartitems-total-item'>
                <p>Shipping Fee</p>
                <p>${calculateShipping()}</p>
              </div>
              <hr />
              <div className='cartitems-total-item'>
                <p>Tax</p>
                <p>${calculateTax()}</p>
              </div>
              <hr />
              <div className='cartitems-total-item'>
                <h3>Total</h3>
                <h3>${calculateDiscountedTotal()}</h3>
              </div>
            </div>
            <button onClick={openCheckout}>PROCEED TO CHECKOUT</button>
          </div>
          {isCheckoutOpen && (
            <div className='checkout-popup'>
              <p>Total Price: ${calculateDiscountedTotal()}</p>
              <select>
                <option value='visa'>Visa</option>
                <option value='fawry'>Fawry Cash</option>
                <option value='paypal'>Paypal</option>
              </select>
              <button>Confirm</button>
              <button onClick={closeCheckout}>Close</button>
            </div>
          )}
        </div>
      </div>
      <div className='cartitems-promocode'>
        <p>If you have a promocode, enter it here</p>
        <div className='cartitems-promobox'>
          <input
            type='text'
            placeholder='Promo code'
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <button onClick={applyPromoCode}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
*/