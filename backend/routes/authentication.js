import express from 'express';

const authenticationRouter = express.Router();

authenticationRouter.get("/", (req, res) => {
   res.send("This is authentication endpoint!") 
});

export default authenticationRouter;