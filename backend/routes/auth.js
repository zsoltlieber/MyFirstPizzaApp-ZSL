import express from 'express';
import { login } from '../controllers/authentication.js';

const authenticationRouter = express.Router();

authenticationRouter.post("/login", login);

export default authenticationRouter;