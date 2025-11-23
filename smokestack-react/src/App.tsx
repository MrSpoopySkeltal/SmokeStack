import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Admin from './pages/Admin';
import { CartProvider } from './context/CartContext'; 

const App: React.FC = () => {
  return (
    <Router>
      <CartProvider> 
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;

