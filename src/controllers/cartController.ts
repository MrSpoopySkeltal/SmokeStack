import { Request, Response } from 'express';
import { db } from '../db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// GET /api/cart/:userId
export const getCartItems = (req: Request, res: Response) => {
  const userId = req.params.userId;
  const query = `
    SELECT cart.id, cigars.name, cigars.brand, cigars.price
    FROM cart
    JOIN cigars ON cart.cigar_id = cigars.id
    WHERE cart.user_id = ?
  `;
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    const rows = results as RowDataPacket[];
    res.json(rows);
  });
};

// POST /api/cart
export const addToCart = (req: Request, res: Response) => {
  const { user_id, cigar_id } = req.body;

  const query = `
    INSERT INTO cart (user_id, cigar_id, quantity)
    VALUES (?, ?, 1)
    ON DUPLICATE KEY UPDATE quantity = quantity + 1
  `;

  db.query(query, [user_id, cigar_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Cigar added to cart or quantity updated' });
  });
};

// DELETE /api/cart/:id
export const removeFromCart = (req: Request, res: Response) => {
  const cartItemId = req.params.id;
  db.query('DELETE FROM cart WHERE id = ?', [cartItemId], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Cigar removed from cart' });
  });
};
// PUT /api/cart/:id
export const updateCartItem = (req: Request, res: Response) => {
  const cartItemId = req.params.id;
  const { quantity } = req.body;

  const query = 'UPDATE cart SET quantity = ? WHERE id = ?';
  db.query(query, [quantity, cartItemId], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Cart item quantity updated' });
  });
};


