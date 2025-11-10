import { Request, Response } from 'express';
import { db } from '../db';
import { dbPromise } from '../db';
import { RowDataPacket } from 'mysql2';


export const getAllReviews = (_req: Request, res: Response) => {
  db.query('SELECT * FROM reviews', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

export const addReview = (req: Request, res: Response) => {
  const { user_id, cigar_id, rating, comment } = req.body;
  db.query(
    'INSERT INTO reviews (user_id, cigar_id, rating, comment) VALUES (?, ?, ?, ?)',
    [user_id, cigar_id, rating, comment],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: (result as any).insertId });
    }
  );
};

export const getReviewsByCigar = (req: Request, res: Response) => {
  const { cigarId } = req.params;
  db.query(
    'SELECT * FROM reviews WHERE cigar_id = ?',
    [cigarId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
};

export const getReviewById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  db.query('SELECT * FROM reviews WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    const rows = results as RowDataPacket[];
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json(rows[0]);
  });
};


export const updateReview = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { rating, comment } = req.body;

  db.query(
    'UPDATE reviews SET rating = ?, comment = ? WHERE id = ?',
    [rating, comment, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      const updateResult = result as RowDataPacket; // You can also use OkPacket, if preferred

      res.json({ message: 'Review updated successfully' });
    }
  );
};
export const deleteReview = async (req: Request, res: Response) => {
  const reviewId = req.params.id;

  try {
    const conn = await dbPromise; // connect to promise-based MySQL
    const [result]: any = await conn.query('DELETE FROM reviews WHERE id = ?', [reviewId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




