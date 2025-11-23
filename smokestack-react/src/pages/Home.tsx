import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="hero d-flex align-items-center justify-content-center text-center">
      <div className="text-white">
        <h1>Welcome to SmokeStack</h1>
        <p>Your one-stop shop for premium cigars.</p>
        <Link to="/shop" className="btn btn-shop">
          Shop Cigars
        </Link>
      </div>
    </div>
  );
};

export default Home;

