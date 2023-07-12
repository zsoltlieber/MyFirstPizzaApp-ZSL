import express from 'express';

const allergensRouter = express.Router();

allergensRouter.get("/", (req, res) => {
    res.send("This is allergens router!")
});

export default allergensRouter;