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
        const actualClientId = atob(req.cookies.access_token.split('.')[1]).split(",")[0].slice(7, -1);
        if (req.client.id === actualClientId || req.client.isAdmin) {
            next();
        } else {
            if (error) return next(createError(403, "You are not authorized!"));
        }
    });
};

//client for staff
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.client.isAdmin) {
            next();
        } else {
            if (error) return next(createError(403, "You are not admin!"));
        }
    });
};

//client for manager
export const verifyMainAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.client.isMainAdmin) {
            next();
        } else {
            if (error) return next(createError(403, "You are not main admin!"));
        }
    });
};

export default {
    verifyToken,
    verifyClient,
    verifyAdmin,
    verifyMainAdmin,
}
