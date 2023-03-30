import 'dotenv/config';
import express from 'express';
import userRouter from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.use('/users', userRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));
