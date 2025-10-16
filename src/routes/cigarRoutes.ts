import express from 'express';
import {
  getAllCigars,
  getCigarById,
  createCigar,
  updateCigar,
  deleteCigar
} from '../controllers/cigarController';

const router = express.Router();

router.get('/', getAllCigars);

router.get('/:id', getCigarById);

router.post('/', createCigar);

router.put('/:id', updateCigar);

router.delete('/:id', deleteCigar);

export default router;

