const rootRouter = require('express').Router();
const { loginController } = require('../controller');
const { loginMiddleware } = require('../middleware');

rootRouter.post('/login', loginMiddleware.checkLoginName, loginController.loginUser);
rootRouter.post('/logout', (req, res) => res.json('post from logout page'));
rootRouter.post('/refresh', (req, res) => res.json('post from refresh token page'));

module.exports = rootRouter;
