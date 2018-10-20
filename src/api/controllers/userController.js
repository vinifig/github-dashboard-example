import { Router } from 'express';

const userController = Router();

userController.get('/', (req, res) => {
    res
        .status(200)
        .json({hello: 'world!'});
})

export default userController;