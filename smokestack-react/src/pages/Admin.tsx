import React, { useEffect, useState } from 'react';
import { getCigars, createCigar, updateCigar, deleteCigar } from '../services/cigarService';
import CigarTable from '../components/CigarTable';
import CigarForm from '../components/CigarForm';

import { Cigar } from '../types/Cigar';


const Admin: React.FC = () => {
  const [cigars, setCigars] = useState<Cigar[]>([]);
  const [editing, setEditing] = useState<Cigar | null>(null);
  const [showForm, setShowForm] = useState(false);

  const loadCigars = () => {
    getCigars()
      .then(res => setCigars(res.data))
      .catch(err => console.error('Failed to load cigars:', err));
  };

  useEffect(() => {
    loadCigars();
  }, []);

  const handleCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleSubmit = (data: Partial<Cigar>) => {
  const action = data.id ? updateCigar : createCigar;
  action(data as Cigar)
    .then(() => {
      setShowForm(false);
      setEditing(null);
      loadCigars();
    })
    .catch(err => console.error('Submit failed:', err));
};

  const handleEdit = (cigar: Cigar) => {
    setEditing(cigar);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this cigar?')) {
      deleteCigar(id)
        .then(loadCigars)
        .catch(err => console.error('Delete failed:', err));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Admin Panel</h2>
      {!showForm && (
        <>
          <button className="btn btn-primary mb-3" onClick={handleCreate}>
            Add New Cigar
          </button>
          <CigarTable cigars={cigars} onEdit={handleEdit} onDelete={handleDelete} />
        </>
      )}
      {showForm && (
        <CigarForm
          cigar={editing ?? undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
};

export default Admin;
