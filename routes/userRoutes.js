import express from 'express';
import {
  getAllUsers,
  getOneUser,
  createUser,
} from '../controllers/userControllers.js';
const userRouter = express.Router();

// userRouter -> domain/path -> http://localhost:8000/users
userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getOneUser).put().delete();

export default userRouter;
