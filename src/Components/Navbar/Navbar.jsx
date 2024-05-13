import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

import Dropdown from '../Dropdown/Dropdown';
import Profile from '../Pages/Profile'; 
import Login from '../Login/Login';
import React, { useState, useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import cart_icon from '../Assets/cart_icon.png'
import CartItems from '../CartItems/CartItems';


const Navbar = () => {
  const [menu, setMenu] = useState("Home");
  const {getTotalCartItems} =useContext(ShopContext);


  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <p>Style Savvy</p>
      </div>
      <ul className='nav-menu'>
        <li onClick={() => setMenu("Home")}>
          <NavLink to='/' activeClassName='active-link'>Home</NavLink>
          {menu === "Home" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("Shop")}>
          <NavLink to='/shop' activeClassName='active-link'>Shop</NavLink>
          {menu === "Shop" ? <hr /> : null}
        </li>
      
        <li onClick={() => setMenu("Cart")}>
          <NavLink to='/cart' activeClassName='active-link'>Cart</NavLink>
          {menu === "Cart" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("Profile")}>
          <NavLink to='/profile' activeClassName='active-link'>Profile</NavLink>
          {menu === "Profile" ? <hr /> : null}
        </li>
        <div className='nav-login-cart'>
        <NavLink to='/login'><button>Logout</button></NavLink>
           
      </div>
        <li>
          <Dropdown /> 
        </li>
        <div className='nav-login-cart'>
          <Link to='/cart'><img src ={cart_icon} alt=''/></Link>
           <div className='nav-cart-count'>{getTotalCartItems()}</div>

          </div>
      </ul>
     
    </div>
  );
}

export default Navbar;
