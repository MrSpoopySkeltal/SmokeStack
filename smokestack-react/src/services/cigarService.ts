import axios from 'axios';

const API_URL = 'http://localhost:3000/api/cigars';

export const getCigars = () => axios.get(API_URL);

export const createCigar = (cigar: {
  name: string;
  brand: string;
  strength: string;
  price: number;
}) => axios.post(API_URL, cigar);

export const updateCigar = (cigar: {
  id: number;
  name: string;
  brand: string;
  strength: string;
  price: number;
}) => axios.put(`${API_URL}/${cigar.id}`, cigar);

export const deleteCigar = (id: number) => axios.delete(`${API_URL}/${id}`);
