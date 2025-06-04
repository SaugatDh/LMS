import express from 'express';
import cors from 'cors';
import {config} from 'dotenv';
// Importing necessary modules
import authRouter from '../routes/auth.route.js';
import userRouter from "../routes/user.route.js";
const app = express();
app.use(cors());
config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/auth', authRouter);
app.use("/api/v1/user",userRouter);
export default app;