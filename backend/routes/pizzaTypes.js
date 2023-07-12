import express from 'express';

const pizzaTypeRouter = express.Router();

pizzaTypeRouter.get("/", (req, res) => {
    res.send("This is pizzatype router!")
});
 
export default pizzaTypeRouter;