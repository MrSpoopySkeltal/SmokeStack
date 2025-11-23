import React, { useEffect, useState } from 'react';
import { getCigars } from '../services/cigarService';
import CigarList from '../components/CigarList';

interface Cigar {
  id: number;
  name: string;
  brand: string;
  strength: string;
  price: number;
}

const Shop: React.FC = () => {
  const [cigars, setCigars] = useState<Cigar[]>([]);

  useEffect(() => {
    getCigars()
      .then(res => setCigars(res.data))
      .catch(err => console.error('Failed to load cigars:', err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Cigar Shop</h2>
      <CigarList cigars={cigars} />
    </div>
  );
};

export default Shop;
