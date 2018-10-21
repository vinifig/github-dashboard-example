import { Router } from 'express';
import githubService from '../services/githubService';

const userController = Router();

userController.get('/:username', async (req, res) => {
    let { username } = req.params;
    try {
        let user = await githubService.getUserWithRepositories(username);
        let status = !!user ? 200 : 404;
        return res
            .status(status)
            .json(user);
    } catch (e) {
        return res
            .status(500)
            .json(e);
    }
})

userController.get('/:username/repositories', async (req, res) => {
    let { username } = req.params;
    try {
        let repos = await githubService.getUserRepositories(username);
        let hasRepositories = !!repos && repos.length !== 0;
        let status =  hasRepositories ? 200 : 404;
        return res
            .status(status)
            .json(repos);
    } catch (e) {
        return res
            .status(500)
            .json(e);
    }
})

export default userController;