import express from 'express';
import dotenv from 'dotenv';
import cigarRoutes from './routes/cigarRoutes';
import userRoutes from './routes/userRoutes'; 
import cartRoutes from './routes/cartRoutes';
import reviewRoutes from './routes/reviewRoutes';
import cors from 'cors';

dotenv.config();
const app = express();
const port = 3000;
 
app.use(cors());
app.use(express.json());
app.use('/api/cigars', cigarRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/cart', cartRoutes);
app.use('/api/reviews', reviewRoutes);

app.listen(port, () => {
  console.log(`SmokeStack API running on http://localhost:${port}`);
});
