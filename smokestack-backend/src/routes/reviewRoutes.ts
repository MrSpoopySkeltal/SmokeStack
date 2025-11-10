import express from 'express';
import {
  getAllReviews,
  addReview,
  getReviewsByCigar,
  getReviewById,
  updateReview,
  deleteReview
} from '../controllers/reviewController';

const router = express.Router();

router.get('/', getAllReviews);
router.get('/cigar/:cigarId', getReviewsByCigar);
router.post('/', addReview);
router.get('/:id', getReviewById);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);


export default router;
