import { Request, Response } from 'express';
import { db } from '../db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// CREATE
export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;
  const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.query(query, [name, email], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    const insertResult = result as ResultSetHeader;
    res.status(201).json({ message: 'User created', id: insertResult.insertId });
  });
};

// READ ALL
export const getAllUsers = (req: Request, res: Response) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    const rows = results as RowDataPacket[];
    res.json(rows);
  });
};

// READ BY ID
export const getUserById = (req: Request, res: Response) => {
  const userId = req.params.id;
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    const rows = results as RowDataPacket[];
    if (rows.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(rows[0]);
  });
};

// UPDATE
export const updateUser = (req: Request, res: Response) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
  db.query(query, [name, email, userId], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'User updated' });
  });
};

// DELETE
export const deleteUser = (req: Request, res: Response) => {
  const userId = req.params.id;
  db.query('DELETE FROM users WHERE id = ?', [userId], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'User deleted' });
  });
};
