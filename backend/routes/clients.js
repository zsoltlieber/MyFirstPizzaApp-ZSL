import express from 'express';

const clientsRouter = express.Router();

clientsRouter.get("/", (req, res) => {
    res.send("This is client router!");
});

export default clientsRouter;