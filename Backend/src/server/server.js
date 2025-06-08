import express from 'express';
import cors from 'cors';
import {config} from 'dotenv';
import cookieParser from 'cookie-parser';
// Importing necessary modules
import authRouter from '../routes/auth.route.js';
import userRouter from "../routes/user.route.js";
import errorHandler from '../middlewares/errorHandler/errorHandler.middleware.js';

const app = express();
app.use(cors());
config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/v1/auth', authRouter);
app.use("/api/v1/user",userRouter);
app.use(errorHandler);
export default app;