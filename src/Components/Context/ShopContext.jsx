import all_product from "../Assets/all_product";
import React, { createContext, useState, useContext } from 'react';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
}

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [orders, setOrders] = useState([]);
  const [shippingCost, setShippingCost] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [userLocation, setUserLocation] = useState('USA'); 

  const addToCart = (itemId) => {
    setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1 }));
    console.log(cartItems);
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1 }));
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  }

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  }

  const calculateShipping = () => {
    let shippingCost = 0;
    const weightThresholds = [
      { threshold: 1, cost: 5 },
      { threshold: 5, cost: 10 },
      { threshold: 10, cost: 15 },
    ];

    const calculateWeight = () => {
      let totalWeight = 0;
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          let itemInfo = all_product.find((product) => product.id === Number(item));
          totalWeight += itemInfo.weight * cartItems[item];
        }
      }
      return totalWeight;
    };

    const totalWeight = calculateWeight();

    for (let i = 0; i < weightThresholds.length; i++) {
      if (totalWeight <= weightThresholds[i].threshold) {
        shippingCost = weightThresholds[i].cost;
        break;
      }
    }

    if (userLocation === 'USA') {
      shippingCost += 2;
    } else if (userLocation === 'Canada') {
      shippingCost += 5;
    } else if (userLocation === 'International') {
      shippingCost += 10;
    }

    setShippingCost(shippingCost);
    return shippingCost;
  };

  const calculateTax = () => {
    let taxAmount = 0;
    const taxRates = {
      USA: 0.08,
      Canada: 0.13,
      International: 0.20,
    };

    const subTotal = getTotalCartAmount();

    taxAmount = subTotal * taxRates[userLocation];

    setTaxAmount(taxAmount);
    return taxAmount;
  };

  const checkout = () => {
    const newOrder = {
      id: orders.length + 1,
      items: cartItems,
      total: getTotalCartAmount(),
      status: 'pending',
    };
    setOrders((prev) => [...prev, newOrder]);
    setCartItems(getDefaultCart());
  }

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) => prev.map((order) => {
      if (order.id === orderId) {
        return {...order, status };
      }
      return order;
    }));
  }

  const sendOrderConfirmation = (orderId) => {
    console.log(`Order confirmation sent for order ${orderId}`);
  }

  const issueRefund = (orderId) => {
    console.log(`Refund issued for order ${orderId}`);
  }

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    checkout,
    updateOrderStatus,
    sendOrderConfirmation,
    issueRefund,
    calculateShipping,
    calculateTax,
    shippingCost,
    taxAmount,
    orders,
    userLocation,
    setUserLocation,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children} {}
    </ShopContext.Provider>
  );
}

export default ShopContextProvider;