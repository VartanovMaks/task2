const rootRouter = require('express').Router();
const { loginController, logoutController } = require('../controller');
const { loginMiddleware, logoutMiddleware } = require('../middleware');

rootRouter.post('/login', loginMiddleware.checkLoginName, loginController.loginUser);
rootRouter.post('/logout', logoutMiddleware.verifyAccessToken, logoutController.logoutUser);
rootRouter.post('/refresh', (req, res) => res.json('post from refresh token page'));

module.exports = rootRouter;
