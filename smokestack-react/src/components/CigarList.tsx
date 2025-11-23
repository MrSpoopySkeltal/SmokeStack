import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext'; // Adjust the path if needed

interface Cigar {
  id: number;
  name: string;
  brand: string;
  strength: string;
  price: number;
}

interface Props {
  cigars: Cigar[];
}

const CigarList: React.FC<Props> = ({ cigars }) => {
  const { addToCart } = useCart();
  const [selectedCigar, setSelectedCigar] = useState<Cigar | null>(null);
  const [quantityMap, setQuantityMap] = useState<{ [id: number]: number }>({});

  const handleQuantityChange = (id: number, value: number) => {
    setQuantityMap(prev => ({
      ...prev,
      [id]: value < 1 ? 1 : value,
    }));
  };

  const handleAddToCart = (cigar: Cigar) => {
    const quantity = quantityMap[cigar.id] || 1;
    addToCart({ ...cigar, quantity });
  };

  return (
    <>
      <div className="row">
        {cigars.map(cigar => (
          <div key={cigar.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{cigar.name}</h5>
                <p className="card-text"><strong>Brand:</strong> {cigar.brand}</p>
                <p className="card-text"><strong>Strength:</strong> {cigar.strength}</p>
                <p className="card-text"><strong>Price:</strong> ${Number(cigar.price).toFixed(2)}</p>
                
                <div className="d-flex align-items-center mb-2">
                  <label htmlFor={`qty-${cigar.id}`} className="me-2 mb-0">Qty:</label>
                  <input
                    type="number"
                    id={`qty-${cigar.id}`}
                    min={1}
                    value={quantityMap[cigar.id] || 1}
                    onChange={(e) => handleQuantityChange(cigar.id, parseInt(e.target.value))}
                    className="form-control"
                    style={{ width: '80px' }}
                  />
                </div>

                <button className="btn btn-primary me-2" onClick={() => handleAddToCart(cigar)}>
                  Add to Cart
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedCigar(cigar)}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={!!selectedCigar} onHide={() => setSelectedCigar(null)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCigar?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCigar && (
            <>
              <p><strong>Brand:</strong> {selectedCigar.brand}</p>
              <p><strong>Strength:</strong> {selectedCigar.strength}</p>
              <p><strong>Price:</strong> ${Number(selectedCigar.price).toFixed(2)}</p>
              <p><strong>ID:</strong> {selectedCigar.id}</p>
              {/* You can add more detailed fields here like description or image */}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedCigar(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CigarList;



