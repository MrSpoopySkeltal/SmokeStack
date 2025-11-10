import express from 'express';
import {
  getAllCigars,
  getCigarById,
  createCigar,
  updateCigar,
  deleteCigar
} from '../controllers/cigarController';

const router = express.Router();

// GET all cigars
router.get('/', getAllCigars);

// GET cigar by ID
router.get('/:id', getCigarById);

// POST new cigar
router.post('/', createCigar);

// PUT update cigar
router.put('/:id', updateCigar);

// DELETE cigar
router.delete('/:id', deleteCigar);

export default router;
