import React from 'react';
import "./App.css";
import Home from './Component/Home';
import Cart from './Component/Cart';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Addcart from './Component/Addcart';


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Addcart" element={<Addcart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

