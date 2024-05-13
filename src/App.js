import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Shop from "./Components/Pages/Shop";
import Women from "./Components/Women/Women"; 
import Categories from "./Components/Categories/Categories";
import Product from "./Components/Pages/Product";
import Cart from "./Components/Pages/Cart";
import Login from "./Components/Login/Login";
import Home from "./Components/Pages/Home";
import Profile from "./Components/Pages/Profile";
import Men  from "./Components/Men/Men";
import Kids from "./Components/Kids/Kids";
import RelatedProducts from "./Components/RelatedProducts/RelatedProducts";
import ProductDisplay from "./Components/ProductDisplay/ProductDisplay";
import Items from "./Components/Items/Items";
import DescriptionBox from "./Components/DescriptionBox/DescriptionBox";
import { ShopContext } from './Components/Context/ShopContext.jsx';
import CartItems from "./Components/CartItems/CartItems";
import BreadCrums from "./Components/BreadCrums/Breadcrum";
import Footer from "./Components/Footer/Footer";
import Register from "./Components/Register/Register";
import Reg from "./Components/Reg/Reg";

const MyContext = React.createContext();

function MyProvider(props) {
  const [someState, setSomeState] = React.useState();

  return (
    <MyContext.Provider value={{ someState, setSomeState }}>
      {props.children}
    </MyContext.Provider>
  );
}

function App() {
  return (
    <MyProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Frontend' element={<Home />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/women' element={<Women />} /> 
            <Route path='/men' element={<Men />} /> 
            <Route path='/kids' element={<Kids />} /> 


            <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
            </Route>
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path="/login " element={<Login />} />
            <Route path="/register " element={<Register />} />

            <Route path="/RelatedProducts " element={<RelatedProducts />} />
            <Route path="/Items " element={<Items />} />
            <Route path="/footer " element={<Footer />} />
            <Route path="/DescriptionBox " element={<DescriptionBox />} />
            <Route path="/context " element={<ShopContext />} />
            <Route path="/BreadCrums " element={<BreadCrums />} />
            <Route path ="/reg" element={<Reg />} />
 

             
          </Routes>
          <ProductDisplay />
          <Footer />
   
        </div>
      </Router>
    </MyProvider>
  );
}

export default App;