import React, { useState, useEffect } from 'react';


interface Cigar {
  id?: number;
  name: string;
  brand: string;
  strength: string;
  price: number;
}

interface Props {
  cigar?: Cigar;
  onSubmit: (data: Cigar) => void;
  onCancel: () => void;
}

const CigarForm: React.FC<Props> = ({ cigar, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Cigar>({
    name: '',
    brand: '',
    strength: '',
    price: 0,
  });

  useEffect(() => {
    if (cigar) {
      setFormData(cigar);
    }
  }, [cigar]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
      </div>

      <div className="mb-3">
        <label className="form-label">Brand</label>
        <input type="text" name="brand" value={formData.brand} onChange={handleChange} className="form-control" required />
      </div>

      <div className="mb-3">
        <label className="form-label">Strength</label>
        <select name="strength" value={formData.strength} onChange={handleChange} className="form-control" required>
          <option value="">Select Strength</option>
          <option value="Mild">Mild</option>
          <option value="Medium">Medium</option>
          <option value="Full">Full</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Price</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} className="form-control" required />
      </div>

      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-success me-2">Save</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default CigarForm;
