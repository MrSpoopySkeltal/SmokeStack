import express from 'express';
import {
  getCartItems,
  addToCart,
  removeFromCart,
  updateCartItem,
} from '../controllers/cartController';

const router = express.Router();

router.put('/:id', updateCartItem); // Update cart item quantity
router.get('/:userId', getCartItems);         // View user's cart
router.post('/', addToCart);                 // Add item to cart
router.delete('/:id', removeFromCart);       // Remove item from cart by cart item ID
router.get('/test', (req, res) => {
  res.send('Cart route is connected');
});

export default router;
