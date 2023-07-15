import jwt from 'jsonwebtoken';
import createError from './error.js';
import { error } from 'console';

export const verifyToken = (req, res, next) => { 

    const jwtToken = req.cookies.access_token;

    if (!jwtToken) {
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(jwtToken, process.env.JWT, (error, client) => {
        if (error) return next(createError(403, "Token is not valid!"));
        
        //if token is valid
        req.client = client;
        next();
    });
}

export const verifyClient = (req, res, next) => { 
    verifyToken(req, res, () => {
        if (req.client.id === req.params.id || req.client.isAdmin) {
            next();   
        } else {
            if (error) return next(createError(403, "You are not authorized!"));
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.client.isAdmin) {
            next();
        } else {
            if (error) return next(createError(403, "You are not admin!"));
        }
    });
};

export default {
    verifyToken,
    verifyClient,
    verifyAdmin
}
