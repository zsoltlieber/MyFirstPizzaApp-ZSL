import express from 'express';
import {login, register} from '../controllers/authentication.js'

const authenticationRouter = express.Router();

authenticationRouter.post("/register", register );
authenticationRouter.post("/login", login);

export default authenticationRouter;