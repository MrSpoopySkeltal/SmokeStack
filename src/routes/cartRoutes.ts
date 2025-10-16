import express from 'express';
import {
  getCartItems,
  addToCart,
  removeFromCart,
  updateCartItem,
} from '../controllers/cartController';

const router = express.Router();

router.put('/:id', updateCartItem); 
router.get('/:userId', getCartItems);         
router.post('/', addToCart);                 
router.delete('/:id', removeFromCart);      
router.get('/test', (req, res) => {
  res.send('Cart route is connected');
});

export default router;

