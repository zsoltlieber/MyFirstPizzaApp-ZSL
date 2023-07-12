import express from 'express';

const ordersRouter = express.Router();

ordersRouter.get("/", (req, res) => {
    res.send("This is orders router!")
});


export default ordersRouter;