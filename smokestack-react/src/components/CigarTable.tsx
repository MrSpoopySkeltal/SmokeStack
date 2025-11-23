import React from 'react';

interface Cigar {
  id: number;
  name: string;
  brand: string;
  strength: string;
  price: number;
}

interface Props {
  cigars: Cigar[];
  onEdit: (cigar: Cigar) => void;
  onDelete: (id: number) => void;
}

const CigarTable: React.FC<Props> = ({ cigars, onEdit, onDelete }) => {
  return (
    <table className="table table-bordered">
      <thead className="thead-dark">
        <tr>
          <th>Name</th>
          <th>Brand</th>
          <th>Strength</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {cigars.map((cigar) => (
          <tr key={cigar.id}>
            <td>{cigar.name}</td>
            <td>{cigar.brand}</td>
            <td>{cigar.strength}</td>
            <td>${typeof cigar.price === 'number' ? cigar.price.toFixed(2) : parseFloat(cigar.price).toFixed(2)}</td>

            <td>
              <button className="btn btn-warning btn-sm me-1" onClick={() => onEdit(cigar)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => onDelete(cigar.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CigarTable;

