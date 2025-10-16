import { Request, Response } from 'express';
import { db } from '../db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// GET /api/cigars
export const getAllCigars = (req: Request, res: Response) => {
  db.query('SELECT * FROM cigars', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    const rows = results as RowDataPacket[];
    res.json(rows);
  });
};

// GET /api/cigars/:id
export const getCigarById = (req: Request, res: Response) => {
  const cigarId = req.params.id;
  db.query('SELECT * FROM cigars WHERE id = ?', [cigarId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    const rows = results as RowDataPacket[];
    if (rows.length === 0)
      return res.status(404).json({ message: 'Cigar not found' });
    res.json(rows[0]);
  });
};

// POST /api/cigars
export const createCigar = (req: Request, res: Response) => {
  const { name, brand, strength, price } = req.body;
  const query =
    'INSERT INTO cigars (name, brand, strength, price) VALUES (?, ?, ?, ?)';
  db.query(query, [name, brand, strength, price], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    const insertResult = result as ResultSetHeader;
    res.status(201).json({
      message: 'Cigar created',
      id: insertResult.insertId,
    });
  });
};

// PUT /api/cigars/:id
export const updateCigar = (req: Request, res: Response) => {
  const cigarId = req.params.id;
  const { name, brand, strength, price } = req.body;
  const query =
    'UPDATE cigars SET name = ?, brand = ?, strength = ?, price = ? WHERE id = ?';
  db.query(query, [name, brand, strength, price, cigarId], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Cigar updated' });
  });
};

// DELETE /api/cigars/:id
export const deleteCigar = (req: Request, res: Response) => {
  const cigarId = req.params.id;
  db.query('DELETE FROM cigars WHERE id = ?', [cigarId], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Cigar deleted' });
  });
};
