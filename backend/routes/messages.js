import express from 'express';

const messagesRouter = express.Router();

messagesRouter.get("/", (req, res) => {
    res.send("This is messages router!")
});

export default messagesRouter;