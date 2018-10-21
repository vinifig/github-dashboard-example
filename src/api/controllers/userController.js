import { Router } from 'express';

const userController = Router();

userController.get('/:username', (req, res) => {
    let { username } = req.params;
    return res.status(200).json({
        username
    })
})

export default userController;